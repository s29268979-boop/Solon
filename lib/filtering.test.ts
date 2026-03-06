import { describe, it, expect } from "vitest";
import {
  getDaysSincePublished,
  validateLocation,
  checkExperienceCorrelation,
  checkAgeMatch,
  checkGenderMatch,
  filterOffersBySpecificCriteria,
  filterOffersByMapLocation,
  calculateDistance,
} from "./filtering";
import { JobOffer, SearchCriteria } from "@/types";

describe("Filtering Functions", () => {
  describe("getDaysSincePublished", () => {
    it("should calculate days correctly", () => {
      const now = new Date();
      const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);
      const days = getDaysSincePublished(fiveDaysAgo);
      expect(days).toBe(5);
    });

    it("should return 0 for today", () => {
      const now = new Date();
      const days = getDaysSincePublished(now);
      expect(days).toBe(0);
    });
  });

  describe("validateLocation", () => {
    it("should validate exact location match", () => {
      const result = validateLocation("Madrid", "Madrid", "España", "Madrid", "Madrid", "España");
      expect(result.isValid).toBe(true);
      expect(result.exactMatch).toBe(true);
    });

    it("should reject partial location match", () => {
      const result = validateLocation("Madrid", "Madrid", "España", "Barcelona", "Madrid", "España");
      expect(result.isValid).toBe(false);
    });

    it("should be case insensitive", () => {
      const result = validateLocation("madrid", "MADRID", "españa", "MADRID", "madrid", "ESPAÑA");
      expect(result.isValid).toBe(true);
    });

    it("should handle whitespace", () => {
      const result = validateLocation(" Madrid ", " Madrid ", " España ", "Madrid", "Madrid", "España");
      expect(result.isValid).toBe(true);
    });
  });

  describe("checkExperienceCorrelation", () => {
    it("should find direct match", () => {
      const required = ["React", "JavaScript"];
      const user = ["React", "Python"];
      expect(checkExperienceCorrelation(required, user)).toBe(true);
    });

    it("should find partial match", () => {
      const required = ["React Native"];
      const user = ["React"];
      expect(checkExperienceCorrelation(required, user)).toBe(true);
    });

    it("should return false for no match", () => {
      const required = ["React"];
      const user = ["Python", "Java"];
      expect(checkExperienceCorrelation(required, user)).toBe(false);
    });

    it("should return true for empty required", () => {
      const required: string[] = [];
      const user = ["Python"];
      expect(checkExperienceCorrelation(required, user)).toBe(true);
    });

    it("should return false for empty user experience", () => {
      const required = ["React"];
      const user: string[] = [];
      expect(checkExperienceCorrelation(required, user)).toBe(false);
    });
  });

  describe("checkAgeMatch", () => {
    it("should accept age within range", () => {
      expect(checkAgeMatch(30, { min: 25, max: 40 })).toBe(true);
    });

    it("should reject age below minimum", () => {
      expect(checkAgeMatch(20, { min: 25, max: 40 })).toBe(false);
    });

    it("should reject age above maximum", () => {
      expect(checkAgeMatch(45, { min: 25, max: 40 })).toBe(false);
    });

    it("should return true for no age requirement", () => {
      expect(checkAgeMatch(30, undefined)).toBe(true);
    });

    it("should handle only minimum age", () => {
      expect(checkAgeMatch(30, { min: 25 })).toBe(true);
      expect(checkAgeMatch(20, { min: 25 })).toBe(false);
    });

    it("should handle only maximum age", () => {
      expect(checkAgeMatch(30, { max: 40 })).toBe(true);
      expect(checkAgeMatch(45, { max: 40 })).toBe(false);
    });
  });

  describe("checkGenderMatch", () => {
    it("should match exact gender", () => {
      expect(checkGenderMatch("Hombre", "Hombre")).toBe(true);
      expect(checkGenderMatch("Mujer", "Mujer")).toBe(true);
    });

    it("should reject non-matching gender", () => {
      expect(checkGenderMatch("Hombre", "Mujer")).toBe(false);
    });

    it("should accept any gender for Ambos", () => {
      expect(checkGenderMatch("Hombre", "Ambos")).toBe(true);
      expect(checkGenderMatch("Mujer", "Ambos")).toBe(true);
    });

    it("should return true for no gender requirement", () => {
      expect(checkGenderMatch("Hombre", undefined)).toBe(true);
    });

    it("should be case insensitive", () => {
      expect(checkGenderMatch("hombre", "HOMBRE")).toBe(true);
    });
  });

  describe("calculateDistance", () => {
    it("should calculate distance between two points", () => {
      // Madrid to Barcelona (approximately 560 km)
      const distance = calculateDistance(40.4168, -3.7038, 41.3851, 2.1734);
      expect(distance).toBeGreaterThan(500);
      expect(distance).toBeLessThan(600);
    });

    it("should return 0 for same point", () => {
      const distance = calculateDistance(40.4168, -3.7038, 40.4168, -3.7038);
      expect(distance).toBe(0);
    });
  });

  describe("filterOffersBySpecificCriteria", () => {
    const mockOffer: JobOffer = {
      id: "1",
      title: "Developer",
      company: "Tech Co",
      description: "A tech job",
      location: {
        city: "Madrid",
        state: "Madrid",
        country: "España",
      },
      publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      requiredAge: { min: 25, max: 45 },
      requiredGender: "Ambos",
      requiredExperience: ["React", "JavaScript"],
    };

    it("should filter by date (3 weeks threshold)", () => {
      const oldOffer: JobOffer = {
        ...mockOffer,
        publishedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      };

      const criteria: SearchCriteria = {
        age: 30,
        gender: "Hombre",
        experience: ["React"],
        city: "Madrid",
        state: "Madrid",
        country: "España",
      };

      const result = filterOffersBySpecificCriteria([oldOffer], criteria);
      expect(result.totalCount).toBe(0);
    });

    it("should filter by location", () => {
      const criteria: SearchCriteria = {
        age: 30,
        gender: "Hombre",
        experience: ["React"],
        city: "Barcelona",
        state: "Cataluña",
        country: "España",
      };

      const result = filterOffersBySpecificCriteria([mockOffer], criteria);
      expect(result.totalCount).toBe(0);
    });

    it("should filter by age", () => {
      const criteria: SearchCriteria = {
        age: 50,
        gender: "Hombre",
        experience: ["React"],
        city: "Madrid",
        state: "Madrid",
        country: "España",
      };

      const result = filterOffersBySpecificCriteria([mockOffer], criteria);
      expect(result.totalCount).toBe(0);
    });

    it("should filter by experience", () => {
      const criteria: SearchCriteria = {
        age: 30,
        gender: "Hombre",
        experience: ["Python"],
        city: "Madrid",
        state: "Madrid",
        country: "España",
      };

      const result = filterOffersBySpecificCriteria([mockOffer], criteria);
      expect(result.totalCount).toBe(0);
    });

    it("should return matching offers", () => {
      const criteria: SearchCriteria = {
        age: 30,
        gender: "Hombre",
        experience: ["React"],
        city: "Madrid",
        state: "Madrid",
        country: "España",
      };

      const result = filterOffersBySpecificCriteria([mockOffer], criteria);
      expect(result.totalCount).toBe(1);
      expect(result.offers[0].id).toBe("1");
    });
  });

  describe("filterOffersByMapLocation", () => {
    const mockOffer: JobOffer = {
      id: "1",
      title: "Developer",
      company: "Tech Co",
      description: "A tech job",
      location: {
        city: "Madrid",
        state: "Madrid",
        country: "España",
        latitude: 40.4168,
        longitude: -3.7038,
      },
      publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      requiredExperience: ["React"],
    };

    it("should filter by date", () => {
      const oldOffer: JobOffer = {
        ...mockOffer,
        publishedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };

      const result = filterOffersByMapLocation([oldOffer], 40.4168, -3.7038, 50);
      expect(result.totalCount).toBe(0);
    });

    it("should filter by distance", () => {
      const result = filterOffersByMapLocation([mockOffer], 40.4168, -3.7038, 10); // 10 km radius
      expect(result.totalCount).toBe(1);
    });

    it("should exclude offers outside radius", () => {
      const farOffer: JobOffer = {
        ...mockOffer,
        location: {
          ...mockOffer.location,
          latitude: 41.3851, // Barcelona
          longitude: 2.1734,
        },
      };

      const result = filterOffersByMapLocation([farOffer], 40.4168, -3.7038, 50); // 50 km radius
      expect(result.totalCount).toBe(0);
    });
  });
});
