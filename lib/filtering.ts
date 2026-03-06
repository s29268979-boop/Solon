import { JobOffer, SearchCriteria, FilteredResults, LocationValidation } from "@/types";

const WEEKS_THRESHOLD = 3;
const DAYS_THRESHOLD = WEEKS_THRESHOLD * 7;

/**
 * Calcula los días desde la publicación de una oferta
 */
export function getDaysSincePublished(publishedDate: Date): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Valida que la ubicación sea exacta (ciudad + estado + país)
 */
export function validateLocation(
  offerCity: string,
  offerState: string,
  offerCountry: string,
  searchCity: string,
  searchState: string,
  searchCountry: string
): LocationValidation {
  const cityMatch = offerCity.toLowerCase().trim() === searchCity.toLowerCase().trim();
  const stateMatch = offerState.toLowerCase().trim() === searchState.toLowerCase().trim();
  const countryMatch = offerCountry.toLowerCase().trim() === searchCountry.toLowerCase().trim();

  const isValid = cityMatch && stateMatch && countryMatch;

  return {
    isValid,
    exactMatch: isValid,
    city: offerCity,
    state: offerState,
    country: offerCountry,
  };
}

/**
 * Verifica si la experiencia requerida correlaciona con la del usuario
 */
export function checkExperienceCorrelation(
  requiredExperience: string[],
  userExperience: string[]
): boolean {
  if (requiredExperience.length === 0) return true;
  if (userExperience.length === 0) return false;

  // Buscar al menos una coincidencia directa
  const hasDirectMatch = requiredExperience.some((req) =>
    userExperience.some(
      (user) =>
        user.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(user.toLowerCase())
    )
  );

  return hasDirectMatch;
}

/**
 * Verifica si la edad del usuario está dentro del rango requerido
 */
export function checkAgeMatch(
  userAge: number,
  requiredAge?: { min?: number; max?: number }
): boolean {
  if (!requiredAge) return true;

  const { min, max } = requiredAge;

  if (min !== undefined && userAge < min) return false;
  if (max !== undefined && userAge > max) return false;

  return true;
}

/**
 * Verifica si el género del usuario coincide con el requerido
 */
export function checkGenderMatch(
  userGender: string,
  requiredGender?: string
): boolean {
  if (!requiredGender || requiredGender === "Ambos") return true;

  return userGender.toLowerCase() === requiredGender.toLowerCase();
}

/**
 * Filtra ofertas según criterios específicos del usuario
 */
export function filterOffersBySpecificCriteria(
  offers: JobOffer[],
  criteria: SearchCriteria
): FilteredResults {
  const filteredOffers = offers.filter((offer) => {
    // 1. Filtro de fecha: máximo 3 semanas
    const daysSincePublished = getDaysSincePublished(offer.publishedDate);
    if (daysSincePublished > DAYS_THRESHOLD) return false;

    // 2. Validación estricta de ubicación
    const locationValidation = validateLocation(
      offer.location.city,
      offer.location.state,
      offer.location.country,
      criteria.city,
      criteria.state,
      criteria.country
    );
    if (!locationValidation.isValid) return false;

    // 3. Filtro de género
    if (offer.requiredGender) {
      if (!checkGenderMatch(criteria.gender, offer.requiredGender)) return false;
    }

    // 4. Filtro de edad
    if (offer.requiredAge) {
      if (!checkAgeMatch(criteria.age, offer.requiredAge)) return false;
    }

    // 5. Filtro de experiencia
    if (!checkExperienceCorrelation(offer.requiredExperience, criteria.experience)) {
      return false;
    }

    return true;
  });

  return {
    offers: filteredOffers,
    totalCount: filteredOffers.length,
    appliedFilters: {
      dateFilter: true,
      ageFilter: !!offers.some((o) => o.requiredAge),
      genderFilter: !!offers.some((o) => o.requiredGender),
      experienceFilter: true,
      locationFilter: true,
    },
  };
}

/**
 * Filtra ofertas por ubicación y fecha (búsqueda por mapa)
 */
export function filterOffersByMapLocation(
  offers: JobOffer[],
  latitude: number,
  longitude: number,
  radiusKm: number = 50
): FilteredResults {
  const filteredOffers = offers.filter((offer) => {
    // 1. Filtro de fecha: máximo 3 semanas
    const daysSincePublished = getDaysSincePublished(offer.publishedDate);
    if (daysSincePublished > DAYS_THRESHOLD) return false;

    // 2. Filtro de ubicación por radio (si hay coordenadas)
    if (offer.location.latitude && offer.location.longitude) {
      const distance = calculateDistance(
        latitude,
        longitude,
        offer.location.latitude,
        offer.location.longitude
      );
      if (distance > radiusKm) return false;
    }

    return true;
  });

  return {
    offers: filteredOffers,
    totalCount: filteredOffers.length,
    appliedFilters: {
      dateFilter: true,
      ageFilter: false,
      genderFilter: false,
      experienceFilter: false,
      locationFilter: true,
    },
  };
}

/**
 * Calcula la distancia entre dos puntos geográficos (Fórmula de Haversine)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
