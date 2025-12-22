
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { JobOpportunity } from '../types';

interface JobMapProps {
  jobs: JobOpportunity[];
  center: { lat: number, lng: number };
}

const JobMap: React.FC<JobMapProps> = ({ jobs, center }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([center.lat, center.lng], 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Limpiar marcadores existentes
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Icono personalizado dorado
    const goldIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #c5a059; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px #c5a059;"></div>`,
      iconSize: [15, 15],
      iconAnchor: [7, 7]
    });

    jobs.forEach(job => {
      if (job.coords) {
        const marker = L.marker([job.coords.lat, job.coords.lng], { icon: goldIcon }).addTo(mapRef.current!);
        marker.bindPopup(`
          <div style="font-family: 'Inter', sans-serif;">
            <b style="color: #c5a059; font-size: 14px;">${job.companyName}</b><br/>
            <p style="font-size: 11px; margin: 4px 0;">${job.address}</p>
            <span style="font-size: 10px; color: #ff4444; font-weight: bold; text-transform: uppercase;">${job.urgency}</span><br/>
            <a href="https://www.google.com/maps/search/${encodeURIComponent(job.address)}" target="_blank" style="color: #c5a059; font-size: 10px; text-decoration: underline;">Ir en Google Maps</a>
          </div>
        `);
      }
    });

    return () => {
      // No destruimos el mapa para evitar parpadeos en cambios rápidos de tab, 
      // pero podríamos si fuera necesario.
    };
  }, [jobs, center]);

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden relative shadow-2xl shadow-gold/10">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      <div className="absolute top-4 right-4 z-[1000] glass-card px-3 py-1.5 rounded-full text-[10px] gold-text font-bold uppercase tracking-widest border-gold/40">
        <i className="fa-solid fa-satellite mr-2"></i> Vista de Patrón Geográfico
      </div>
    </div>
  );
};

export default JobMap;
