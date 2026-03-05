// Tipos para la aplicación Solón

export type Gender = "Hombre" | "Mujer" | "Ambos";

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
  publishedDate: Date;
  requiredAge?: {
    min?: number;
    max?: number;
  };
  requiredGender?: Gender;
  requiredExperience: string[];
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
  applicationUrl?: string;
}

export interface SearchCriteria {
  age: number;
  gender: Gender;
  experience: string[];
  city: string;
  state: string;
  country: string;
}

export interface MapSearchFilters {
  latitude: number;
  longitude: number;
  radiusKm?: number;
}

export interface FilteredResults {
  offers: JobOffer[];
  totalCount: number;
  appliedFilters: {
    dateFilter: boolean;
    ageFilter: boolean;
    genderFilter: boolean;
    experienceFilter: boolean;
    locationFilter: boolean;
  };
}

export interface LocationValidation {
  isValid: boolean;
  exactMatch: boolean;
  city: string;
  state: string;
  country: string;
}
