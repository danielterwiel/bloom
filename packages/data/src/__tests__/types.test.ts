import { describe, it, expect } from "vitest";
import type { FlowerCompany } from "../types";
import {
  CATEGORIES,
  SPECIALTIES,
  EMPLOYEE_RANGES,
  REVENUE_RANGES,
  BUSINESS_TYPES,
  CERTIFICATIONS,
  COUNTRIES,
} from "../types";

describe("FlowerCompany type", () => {
  it("should accept a valid FlowerCompany object", () => {
    const company: FlowerCompany = {
      id: "1",
      name: "Test Flowers Inc",
      category: "Florist",
      specialty: ["Roses", "Tulips"],
      founded: 2010,
      employees: "11-50",
      businessType: "B2C",
      annualRevenue: "$1M-$5M",
      headquarters: "New York, NY",
      country: "United States",
      certifications: ["Organic Certified"],
      description: "A test flower company.",
      website: "https://testflowers.com",
      imageUrl: "https://testflowers.com/image.jpg",
    };

    expect(company.id).toBe("1");
    expect(company.name).toBe("Test Flowers Inc");
    expect(company.category).toBe("Florist");
    expect(company.specialty).toEqual(["Roses", "Tulips"]);
    expect(company.founded).toBe(2010);
    expect(company.employees).toBe("11-50");
    expect(company.businessType).toBe("B2C");
    expect(company.annualRevenue).toBe("$1M-$5M");
    expect(company.headquarters).toBe("New York, NY");
    expect(company.country).toBe("United States");
    expect(company.certifications).toEqual(["Organic Certified"]);
    expect(company.description).toBe("A test flower company.");
    expect(company.website).toBe("https://testflowers.com");
    expect(company.imageUrl).toBe("https://testflowers.com/image.jpg");
  });

  it("should allow empty arrays for specialty and certifications", () => {
    const company: FlowerCompany = {
      id: "2",
      name: "Minimal Company",
      category: "Nursery",
      specialty: [],
      founded: 2020,
      employees: "1-10",
      businessType: "B2B",
      annualRevenue: "Under $100K",
      headquarters: "Amsterdam",
      country: "Netherlands",
      certifications: [],
      description: "A minimal company.",
      website: "https://minimal.com",
      imageUrl: "",
    };

    expect(company.specialty).toEqual([]);
    expect(company.certifications).toEqual([]);
  });
});

describe("CATEGORIES constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(CATEGORIES)).toBe(true);
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it("should contain expected categories", () => {
    expect(CATEGORIES).toContain("Florist");
    expect(CATEGORIES).toContain("Nursery");
    expect(CATEGORIES).toContain("Wholesale");
    expect(CATEGORIES).toContain("Grower");
  });

  it("should have 10 categories", () => {
    expect(CATEGORIES.length).toBe(10);
  });

  it("should contain only strings", () => {
    CATEGORIES.forEach((category) => {
      expect(typeof category).toBe("string");
    });
  });
});

describe("SPECIALTIES constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(SPECIALTIES)).toBe(true);
    expect(SPECIALTIES.length).toBeGreaterThan(0);
  });

  it("should contain expected specialties", () => {
    expect(SPECIALTIES).toContain("Roses");
    expect(SPECIALTIES).toContain("Tulips");
    expect(SPECIALTIES).toContain("Orchids");
    expect(SPECIALTIES).toContain("Wedding Flowers");
  });

  it("should have 20 specialties", () => {
    expect(SPECIALTIES.length).toBe(20);
  });

  it("should contain only strings", () => {
    SPECIALTIES.forEach((specialty) => {
      expect(typeof specialty).toBe("string");
    });
  });
});

describe("EMPLOYEE_RANGES constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(EMPLOYEE_RANGES)).toBe(true);
    expect(EMPLOYEE_RANGES.length).toBeGreaterThan(0);
  });

  it("should contain expected ranges", () => {
    expect(EMPLOYEE_RANGES).toContain("1-10");
    expect(EMPLOYEE_RANGES).toContain("11-50");
    expect(EMPLOYEE_RANGES).toContain("1000+");
  });

  it("should have 6 ranges", () => {
    expect(EMPLOYEE_RANGES.length).toBe(6);
  });

  it("should contain only strings", () => {
    EMPLOYEE_RANGES.forEach((range) => {
      expect(typeof range).toBe("string");
    });
  });
});

describe("REVENUE_RANGES constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(REVENUE_RANGES)).toBe(true);
    expect(REVENUE_RANGES.length).toBeGreaterThan(0);
  });

  it("should contain expected ranges", () => {
    expect(REVENUE_RANGES).toContain("Under $100K");
    expect(REVENUE_RANGES).toContain("$1M-$5M");
    expect(REVENUE_RANGES).toContain("$50M+");
  });

  it("should have 7 ranges", () => {
    expect(REVENUE_RANGES.length).toBe(7);
  });

  it("should contain only strings", () => {
    REVENUE_RANGES.forEach((range) => {
      expect(typeof range).toBe("string");
    });
  });
});

describe("BUSINESS_TYPES constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(BUSINESS_TYPES)).toBe(true);
    expect(BUSINESS_TYPES.length).toBeGreaterThan(0);
  });

  it("should contain expected types", () => {
    expect(BUSINESS_TYPES).toContain("B2B");
    expect(BUSINESS_TYPES).toContain("B2C");
    expect(BUSINESS_TYPES).toContain("Both");
  });

  it("should have exactly 3 business types", () => {
    expect(BUSINESS_TYPES.length).toBe(3);
  });

  it("should contain only strings", () => {
    BUSINESS_TYPES.forEach((type) => {
      expect(typeof type).toBe("string");
    });
  });
});

describe("CERTIFICATIONS constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(CERTIFICATIONS)).toBe(true);
    expect(CERTIFICATIONS.length).toBeGreaterThan(0);
  });

  it("should contain expected certifications", () => {
    expect(CERTIFICATIONS).toContain("Organic Certified");
    expect(CERTIFICATIONS).toContain("Fair Trade");
    expect(CERTIFICATIONS).toContain("USDA Organic");
  });

  it("should have 10 certifications", () => {
    expect(CERTIFICATIONS.length).toBe(10);
  });

  it("should contain only strings", () => {
    CERTIFICATIONS.forEach((cert) => {
      expect(typeof cert).toBe("string");
    });
  });
});

describe("COUNTRIES constant", () => {
  it("should be a non-empty array", () => {
    expect(Array.isArray(COUNTRIES)).toBe(true);
    expect(COUNTRIES.length).toBeGreaterThan(0);
  });

  it("should contain expected countries", () => {
    expect(COUNTRIES).toContain("United States");
    expect(COUNTRIES).toContain("Netherlands");
    expect(COUNTRIES).toContain("Colombia");
    expect(COUNTRIES).toContain("Ecuador");
    expect(COUNTRIES).toContain("Kenya");
  });

  it("should have 20 countries", () => {
    expect(COUNTRIES.length).toBe(20);
  });

  it("should contain only strings", () => {
    COUNTRIES.forEach((country) => {
      expect(typeof country).toBe("string");
    });
  });
});

describe("All constants are unique", () => {
  it("CATEGORIES should have no duplicates", () => {
    const unique = new Set(CATEGORIES);
    expect(unique.size).toBe(CATEGORIES.length);
  });

  it("SPECIALTIES should have no duplicates", () => {
    const unique = new Set(SPECIALTIES);
    expect(unique.size).toBe(SPECIALTIES.length);
  });

  it("EMPLOYEE_RANGES should have no duplicates", () => {
    const unique = new Set(EMPLOYEE_RANGES);
    expect(unique.size).toBe(EMPLOYEE_RANGES.length);
  });

  it("REVENUE_RANGES should have no duplicates", () => {
    const unique = new Set(REVENUE_RANGES);
    expect(unique.size).toBe(REVENUE_RANGES.length);
  });

  it("BUSINESS_TYPES should have no duplicates", () => {
    const unique = new Set(BUSINESS_TYPES);
    expect(unique.size).toBe(BUSINESS_TYPES.length);
  });

  it("CERTIFICATIONS should have no duplicates", () => {
    const unique = new Set(CERTIFICATIONS);
    expect(unique.size).toBe(CERTIFICATIONS.length);
  });

  it("COUNTRIES should have no duplicates", () => {
    const unique = new Set(COUNTRIES);
    expect(unique.size).toBe(COUNTRIES.length);
  });
});
