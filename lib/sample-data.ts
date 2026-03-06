import { JobOffer } from "@/types";

export const SAMPLE_JOB_OFFERS: JobOffer[] = [
  {
    id: "1",
    title: "Desarrollador React Native",
    company: "Tech Solutions Inc.",
    description:
      "Buscamos un desarrollador React Native con experiencia en aplicaciones móviles. Responsable de desarrollar y mantener aplicaciones de alto rendimiento.",
    location: {
      city: "Madrid",
      state: "Madrid",
      country: "España",
      latitude: 40.4168,
      longitude: -3.7038,
    },
    publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
    requiredAge: { min: 25, max: 45 },
    requiredGender: "Ambos",
    requiredExperience: ["React", "JavaScript", "Mobile Development"],
    salary: { min: 35000, max: 50000, currency: "EUR" },
    contactEmail: "jobs@techsolutions.com",
    applicationUrl: "https://techsolutions.com/apply",
  },
  {
    id: "2",
    title: "Diseñador UX/UI",
    company: "Creative Studio",
    description:
      "Diseñador UX/UI para proyectos web y móvil. Experiencia en diseño de interfaces intuitivas y atractivas.",
    location: {
      city: "Barcelona",
      state: "Cataluña",
      country: "España",
      latitude: 41.3851,
      longitude: 2.1734,
    },
    publishedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 días atrás
    requiredAge: { min: 23, max: 40 },
    requiredGender: "Mujer",
    requiredExperience: ["Figma", "UI Design", "User Research"],
    salary: { min: 28000, max: 40000, currency: "EUR" },
    contactEmail: "hr@creativestudio.com",
  },
  {
    id: "3",
    title: "Ingeniero Backend Python",
    company: "Data Systems Ltd.",
    description:
      "Ingeniero backend con experiencia en Python y bases de datos. Trabajarás en sistemas de procesamiento de datos a gran escala.",
    location: {
      city: "Valencia",
      state: "Valencia",
      country: "España",
      latitude: 39.4699,
      longitude: -0.3763,
    },
    publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    requiredAge: { min: 26, max: 50 },
    requiredGender: "Hombre",
    requiredExperience: ["Python", "PostgreSQL", "API Development"],
    salary: { min: 40000, max: 55000, currency: "EUR" },
    contactEmail: "careers@datasystems.com",
  },
  {
    id: "4",
    title: "Community Manager",
    company: "Social Media Agency",
    description:
      "Gestor de comunidades para redes sociales. Responsable de crear contenido y gestionar la interacción con seguidores.",
    location: {
      city: "Madrid",
      state: "Madrid",
      country: "España",
      latitude: 40.4168,
      longitude: -3.7038,
    },
    publishedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 días atrás
    requiredAge: undefined,
    requiredGender: "Ambos",
    requiredExperience: ["Social Media", "Content Creation", "Community Management"],
    salary: { min: 22000, max: 32000, currency: "EUR" },
  },
  {
    id: "5",
    title: "Especialista en Marketing Digital",
    company: "Digital Marketing Pro",
    description:
      "Especialista en marketing digital con experiencia en SEO, SEM y analytics. Trabajarás en campañas para clientes internacionales.",
    location: {
      city: "Madrid",
      state: "Madrid",
      country: "España",
      latitude: 40.4168,
      longitude: -3.7038,
    },
    publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
    requiredAge: { min: 24, max: 45 },
    requiredGender: "Ambos",
    requiredExperience: ["SEO", "SEM", "Google Analytics", "Marketing"],
    salary: { min: 30000, max: 45000, currency: "EUR" },
    contactEmail: "jobs@digitalmarketingpro.com",
  },
  {
    id: "6",
    title: "Desarrollador Full Stack",
    company: "Web Development Co.",
    description:
      "Desarrollador full stack con experiencia en React y Node.js. Trabajarás en proyectos desafiantes con tecnologías modernas.",
    location: {
      city: "Barcelona",
      state: "Cataluña",
      country: "España",
      latitude: 41.3851,
      longitude: 2.1734,
    },
    publishedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 días atrás
    requiredAge: { min: 25, max: 50 },
    requiredGender: "Ambos",
    requiredExperience: ["React", "Node.js", "JavaScript", "SQL"],
    salary: { min: 38000, max: 52000, currency: "EUR" },
  },
  {
    id: "7",
    title: "Analista de Datos",
    company: "Business Intelligence Corp.",
    description:
      "Analista de datos para transformar datos en insights. Experiencia con herramientas de BI y análisis estadístico.",
    location: {
      city: "Bilbao",
      state: "País Vasco",
      country: "España",
      latitude: 43.2627,
      longitude: -2.9253,
    },
    publishedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 días atrás
    requiredAge: { min: 25, max: 48 },
    requiredGender: "Ambos",
    requiredExperience: ["SQL", "Power BI", "Python", "Data Analysis"],
    salary: { min: 32000, max: 46000, currency: "EUR" },
  },
  {
    id: "8",
    title: "Gerente de Proyecto",
    company: "Project Management Solutions",
    description:
      "Gerente de proyecto experimentado para liderar equipos multidisciplinarios. Experiencia con metodologías ágiles.",
    location: {
      city: "Madrid",
      state: "Madrid",
      country: "España",
      latitude: 40.4168,
      longitude: -3.7038,
    },
    publishedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
    requiredAge: { min: 30, max: 55 },
    requiredGender: "Ambos",
    requiredExperience: ["Project Management", "Agile", "Leadership", "Scrum"],
    salary: { min: 45000, max: 65000, currency: "EUR" },
  },
  {
    id: "9",
    title: "Especialista en Ciberseguridad",
    company: "Security First Ltd.",
    description:
      "Especialista en ciberseguridad para proteger infraestructuras críticas. Experiencia en análisis de vulnerabilidades.",
    location: {
      city: "Valencia",
      state: "Valencia",
      country: "España",
      latitude: 39.4699,
      longitude: -0.3763,
    },
    publishedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 días atrás
    requiredAge: { min: 28, max: 50 },
    requiredGender: "Ambos",
    requiredExperience: ["Cybersecurity", "Penetration Testing", "Network Security"],
    salary: { min: 42000, max: 60000, currency: "EUR" },
  },
  {
    id: "10",
    title: "Abogada Corporativa",
    company: "Legal Associates",
    description:
      "Abogada para asesoramiento legal corporativo. Experiencia en derecho mercantil y contratos.",
    location: {
      city: "Madrid",
      state: "Madrid",
      country: "España",
      latitude: 40.4168,
      longitude: -3.7038,
    },
    publishedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 días atrás
    requiredAge: { min: 30, max: 55 },
    requiredGender: "Mujer",
    requiredExperience: ["Corporate Law", "Contracts", "Legal Advice"],
    salary: { min: 50000, max: 70000, currency: "EUR" },
    contactEmail: "careers@legalassociates.com",
  },
];
