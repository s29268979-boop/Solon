
import { GoogleGenAI } from "@google/genai";
import { UserProfile, JobOpportunity, InvestmentStrategy } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSolonResponse = async (profile: UserProfile, currentTime: Date) => {
  // El tool 'googleMaps' solo es compatible con la serie 2.5
  const modelName = 'gemini-2.5-flash';
  
  const systemInstruction = `
    Eres Sólon, un arquitecto de destinos financieros. Tu misión es proporcionar una hoja de ruta de inversión para capitales mínimos ($10, $20, $50, $100).

    IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido dentro de bloques de código markdown.
    
    ESTRUCTURA DE RESPUESTA REQUERIDA (JSON):
    {
      "profileJobs": [
        {
          "companyName": "Nombre Empresa",
          "address": "Dirección Real",
          "contactInfo": "Teléfono o Email Directo",
          "applicationMethod": "Presencial" | "Oficial",
          "urgency": "Alta" | "Media",
          "requirements": ["Req 1", "Req 2"]
        }
      ],
      "nearbyJobs": [
        {
          "companyName": "Negocio Cercano",
          "coords": {"lat": 0, "lng": 0},
          "address": "Dirección",
          "applicationMethod": "Presencial"
        }
      ],
      "investment": {
        "initialCapital": 10,
        "methodology": "Breve descripción de la filosofía de crecimiento para capital bajo",
        "sectors": [
          {
            "sector": "Criptoactivos",
            "icon": "fa-brands fa-bitcoin",
            "tips": [
              {"title": "DCA en Activos Base", "advice": "Explicación breve..."},
              {"title": "Validación de Red", "advice": "..."},
              {"title": "Custodia Segura", "advice": "..."},
              {"title": "Micro-Ahorro Programado", "advice": "..."}
            ]
          },
          { "sector": "Índices", "icon": "fa-solid fa-chart-pie", "tips": [
              {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}
          ]},
          { "sector": "Divisas", "icon": "fa-solid fa-comments-dollar", "tips": [
              {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}
          ]},
          { "sector": "Materias Primas", "icon": "fa-solid fa-gem", "tips": [
              {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}, {"title": "...", "advice": "..."}
          ]}
        ]
      }
    }

    REGLAS ESTRICTAS:
    1. JOBS: Identifica lugares físicos reales en ${profile.location}. Da información de contacto directo.
    2. INVERSIÓN: Genera EXACTAMENTE 4 categorías con 4 consejos cada una.
    3. NO incluyas texto fuera del JSON.
  `;

  const prompt = `
    Analiza el mercado para la ubicación: ${profile.location}, ${profile.country}.
    Habilidades del usuario: ${profile.skills}.
    Proporciona 4 vacantes directas reales y una estrategia de inversión integral de 4 pilares.
  `;

  try {
    const config: any = {
      systemInstruction: systemInstruction,
      tools: [{ googleSearch: {} }, { googleMaps: {} }],
      temperature: 0.3,
    };

    // Añadir toolConfig si hay coordenadas disponibles
    if (profile.coordinates) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: profile.coordinates.latitude,
            longitude: profile.coordinates.longitude
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: config,
    });

    const text = response.text || '';
    
    // Extracción manual de JSON ya que responseMimeType: "application/json" no se puede usar con googleMaps
    let parsed: any = {};
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("Error al parsear la respuesta de Sólon:", e);
      throw new Error("La sincronización de patrones falló. Intenta de nuevo.");
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      profileJobs: parsed.profileJobs || [],
      nearbyJobs: parsed.nearbyJobs || [],
      investment: parsed.investment || null,
      text: "Sincronización completa.",
      sources: groundingChunks.map((chunk: any) => chunk.web?.uri || chunk.maps?.uri).filter(Boolean)
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
