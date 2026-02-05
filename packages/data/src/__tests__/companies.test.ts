import { describe, it, expect } from "vitest";
import { companies, generateCompanies } from "../companies";
import {
  CATEGORIES,
  SPECIALTIES,
  EMPLOYEE_RANGES,
  REVENUE_RANGES,
  BUSINESS_TYPES,
  CERTIFICATIONS,
  COUNTRIES,
} from "../types";

describe("companies", () => {
  describe("count", () => {
    it("should have exactly 1000 records", () => {
      expect(companies).toHaveLength(1000);
    });
  });

  describe("deterministic generation", () => {
    it("should produce the same results with the same seed", () => {
      const companies1 = generateCompanies(42);
      const companies2 = generateCompanies(42);

      expect(companies1).toEqual(companies2);
    });

    it("should produce different results with different seeds", () => {
      const companies1 = generateCompanies(42);
      const companies2 = generateCompanies(123);

      expect(companies1[0]?.name).not.toEqual(companies2[0]?.name);
    });

    it("pre-generated companies should match seed 42", () => {
      const freshGenerated = generateCompanies(42);
      expect(companies).toEqual(freshGenerated);
    });
  });

  describe("field validation", () => {
    it("all records should have a valid id", () => {
      companies.forEach((company, index) => {
        expect(company.id).toMatch(/^fc-\d{4}$/);
        expect(company.id).toBe(`fc-${String(index + 1).padStart(4, "0")}`);
      });
    });

    it("all records should have a non-empty name", () => {
      companies.forEach((company) => {
        expect(company.name).toBeTruthy();
        expect(typeof company.name).toBe("string");
        expect(company.name.length).toBeGreaterThan(0);
      });
    });

    it("all records should have a valid category", () => {
      companies.forEach((company) => {
        expect(CATEGORIES).toContain(company.category);
      });
    });

    it("all records should have at least one specialty", () => {
      companies.forEach((company) => {
        expect(Array.isArray(company.specialty)).toBe(true);
        expect(company.specialty.length).toBeGreaterThanOrEqual(1);
        expect(company.specialty.length).toBeLessThanOrEqual(4);
        company.specialty.forEach((s) => {
          expect(SPECIALTIES).toContain(s);
        });
      });
    });

    it("all records should have a valid founded year", () => {
      companies.forEach((company) => {
        expect(company.founded).toBeGreaterThanOrEqual(1990);
        expect(company.founded).toBeLessThanOrEqual(2024);
        expect(Number.isInteger(company.founded)).toBe(true);
      });
    });

    it("all records should have a valid employee range", () => {
      companies.forEach((company) => {
        expect(EMPLOYEE_RANGES).toContain(company.employees);
      });
    });

    it("all records should have a valid business type", () => {
      companies.forEach((company) => {
        expect(BUSINESS_TYPES).toContain(company.businessType);
      });
    });

    it("all records should have a valid annual revenue", () => {
      companies.forEach((company) => {
        expect(REVENUE_RANGES).toContain(company.annualRevenue);
      });
    });

    it("all records should have a valid country", () => {
      companies.forEach((company) => {
        expect(COUNTRIES).toContain(company.country);
      });
    });

    it("all records should have a non-empty headquarters", () => {
      companies.forEach((company) => {
        expect(company.headquarters).toBeTruthy();
        expect(typeof company.headquarters).toBe("string");
      });
    });

    it("all records should have valid certifications array", () => {
      companies.forEach((company) => {
        expect(Array.isArray(company.certifications)).toBe(true);
        company.certifications.forEach((cert) => {
          expect(CERTIFICATIONS).toContain(cert);
        });
      });
    });

    it("all records should have a non-empty description", () => {
      companies.forEach((company) => {
        expect(company.description).toBeTruthy();
        expect(typeof company.description).toBe("string");
        expect(company.description.length).toBeGreaterThan(10);
      });
    });

    it("all records should have a valid website URL", () => {
      companies.forEach((company) => {
        expect(company.website).toMatch(/^https:\/\/www\..+\.com$/);
      });
    });

    it("all records should have a valid image URL", () => {
      companies.forEach((company) => {
        expect(company.imageUrl).toMatch(/^https:\/\/picsum\.photos\/seed\/fc-\d{4}\/400\/300$/);
      });
    });
  });

  describe("distribution - country", () => {
    it("USA should be approximately 40% of records", () => {
      const usaCount = companies.filter((c) => c.country === "United States").length;
      const percentage = (usaCount / 1000) * 100;
      // Allow 5% tolerance
      expect(percentage).toBeGreaterThan(35);
      expect(percentage).toBeLessThan(45);
    });

    it("Netherlands should be approximately 15% of records", () => {
      const count = companies.filter((c) => c.country === "Netherlands").length;
      const percentage = (count / 1000) * 100;
      // Allow 5% tolerance
      expect(percentage).toBeGreaterThan(10);
      expect(percentage).toBeLessThan(20);
    });

    it("Colombia should be approximately 10% of records", () => {
      const count = companies.filter((c) => c.country === "Colombia").length;
      const percentage = (count / 1000) * 100;
      // Allow 5% tolerance
      expect(percentage).toBeGreaterThan(5);
      expect(percentage).toBeLessThan(15);
    });
  });

  describe("distribution - category", () => {
    it("Florist, Nursery, and Wholesale should be the most common", () => {
      const floristCount = companies.filter((c) => c.category === "Florist").length;
      const nurseryCount = companies.filter((c) => c.category === "Nursery").length;
      const wholesaleCount = companies.filter((c) => c.category === "Wholesale").length;
      const topThreeTotal = floristCount + nurseryCount + wholesaleCount;

      // Top 3 should be more than 50% of all records
      expect(topThreeTotal).toBeGreaterThan(500);
    });

    it("all categories should have at least some representation", () => {
      CATEGORIES.forEach((category) => {
        const count = companies.filter((c) => c.category === category).length;
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  describe("distribution - founded year", () => {
    it("most companies should be founded between 2000 and 2020", () => {
      const inRange = companies.filter((c) => c.founded >= 2000 && c.founded <= 2020).length;
      const percentage = (inRange / 1000) * 100;
      // Should be at least 70% in this range (bell curve centered on 2010)
      expect(percentage).toBeGreaterThan(70);
    });

    it("founded years should follow a bell curve around 2010", () => {
      const years = companies.map((c) => c.founded);
      const sum = years.reduce((a, b) => a + b, 0);
      const mean = sum / years.length;

      // Mean should be close to 2010
      expect(mean).toBeGreaterThan(2007);
      expect(mean).toBeLessThan(2013);
    });
  });

  describe("distribution - certifications", () => {
    it("approximately 60% should have at least one certification", () => {
      const withCerts = companies.filter((c) => c.certifications.length > 0).length;
      const percentage = (withCerts / 1000) * 100;
      // Allow 10% tolerance
      expect(percentage).toBeGreaterThan(50);
      expect(percentage).toBeLessThan(70);
    });

    it("no company should have more than 3 certifications", () => {
      companies.forEach((company) => {
        expect(company.certifications.length).toBeLessThanOrEqual(3);
      });
    });
  });

  describe("uniqueness", () => {
    it("all IDs should be unique", () => {
      const ids = companies.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(1000);
    });
  });
});
