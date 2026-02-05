import { describe, it, expect } from "vitest";
import type { FlowerCompany } from "../types";
import {
  filterByText,
  filterByCategory,
  filterBySpecialty,
  filterByFoundedRange,
  filterByEmployees,
  filterByBusinessType,
  filterByRevenue,
  filterByCountry,
  filterByCertifications,
  applyAllFilters,
  type CompanyFilters,
} from "../filters";

// Sample test data
const sampleCompanies: FlowerCompany[] = [
  {
    id: "fc-0001",
    name: "Bloom Gardens",
    category: "Florist",
    specialty: ["Roses", "Tulips"],
    founded: 2010,
    employees: "11-50",
    businessType: "B2C",
    annualRevenue: "$1M-$5M",
    headquarters: "New York",
    country: "United States",
    certifications: ["Organic Certified", "Fair Trade"],
    description: "A leading florist specializing in roses.",
    website: "https://www.bloom-gardens.com",
    imageUrl: "https://picsum.photos/seed/fc-0001/400/300",
  },
  {
    id: "fc-0002",
    name: "Flora Wholesale",
    category: "Wholesale",
    specialty: ["Orchids", "Lilies"],
    founded: 2005,
    employees: "51-200",
    businessType: "B2B",
    annualRevenue: "$5M-$10M",
    headquarters: "Amsterdam",
    country: "Netherlands",
    certifications: ["MPS"],
    description: "Premium wholesale flower distributor.",
    website: "https://www.flora-wholesale.com",
    imageUrl: "https://picsum.photos/seed/fc-0002/400/300",
  },
  {
    id: "fc-0003",
    name: "Petal Nursery",
    category: "Nursery",
    specialty: ["Tulips", "Carnations"],
    founded: 2015,
    employees: "1-10",
    businessType: "Both",
    annualRevenue: "$100K-$500K",
    headquarters: "Bogotá",
    country: "Colombia",
    certifications: [],
    description: "Family-owned nursery with beautiful carnations.",
    website: "https://www.petal-nursery.com",
    imageUrl: "https://picsum.photos/seed/fc-0003/400/300",
  },
  {
    id: "fc-0004",
    name: "Garden Center Elite",
    category: "Garden Center",
    specialty: ["Succulents", "Native Plants"],
    founded: 2000,
    employees: "201-500",
    businessType: "B2C",
    annualRevenue: "$10M-$50M",
    headquarters: "Los Angeles",
    country: "United States",
    certifications: ["USDA Organic", "Carbon Neutral"],
    description: "Largest garden center in California.",
    website: "https://www.garden-center-elite.com",
    imageUrl: "https://picsum.photos/seed/fc-0004/400/300",
  },
  {
    id: "fc-0005",
    name: "Orchid Masters",
    category: "Grower",
    specialty: ["Orchids"],
    founded: 2010,
    employees: "11-50",
    businessType: "B2B",
    annualRevenue: "$1M-$5M",
    headquarters: "Bangkok",
    country: "Thailand",
    certifications: ["Rainforest Alliance"],
    description: "Expert orchid growers with rare varieties.",
    website: "https://www.orchid-masters.com",
    imageUrl: "https://picsum.photos/seed/fc-0005/400/300",
  },
];

describe("filterByText", () => {
  it("returns all companies when query is empty", () => {
    expect(filterByText(sampleCompanies, "")).toEqual(sampleCompanies);
    expect(filterByText(sampleCompanies, "   ")).toEqual(sampleCompanies);
  });

  it("filters by company name (case-insensitive)", () => {
    const result = filterByText(sampleCompanies, "bloom");
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Bloom Gardens");
  });

  it("filters by company name (partial match)", () => {
    const result = filterByText(sampleCompanies, "gar");
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toContain("Bloom Gardens");
    expect(result.map((c) => c.name)).toContain("Garden Center Elite");
  });

  it("filters by description", () => {
    const result = filterByText(sampleCompanies, "california");
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Garden Center Elite");
  });

  it("matches both name and description", () => {
    // "bloom" appears in name "Bloom Gardens"
    // "florist" appears in description "A leading florist specializing in roses."
    const resultByName = filterByText(sampleCompanies, "bloom");
    expect(resultByName).toHaveLength(1);
    expect(resultByName[0]?.name).toBe("Bloom Gardens");

    const resultByDesc = filterByText(sampleCompanies, "leading");
    expect(resultByDesc).toHaveLength(1);
    expect(resultByDesc[0]?.name).toBe("Bloom Gardens");
  });

  it("returns empty array when no matches", () => {
    const result = filterByText(sampleCompanies, "xyznonexistent");
    expect(result).toHaveLength(0);
  });
});

describe("filterByCategory", () => {
  it("returns all companies when categories is empty", () => {
    expect(filterByCategory(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single category", () => {
    const result = filterByCategory(sampleCompanies, ["Florist"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.category).toBe("Florist");
  });

  it("filters by multiple categories (OR logic)", () => {
    const result = filterByCategory(sampleCompanies, ["Florist", "Wholesale"]);
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.category)).toContain("Florist");
    expect(result.map((c) => c.category)).toContain("Wholesale");
  });

  it("returns empty when no categories match", () => {
    const result = filterByCategory(sampleCompanies, ["Event Florist"]);
    expect(result).toHaveLength(0);
  });
});

describe("filterBySpecialty", () => {
  it("returns all companies when specialties is empty", () => {
    expect(filterBySpecialty(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single specialty", () => {
    const result = filterBySpecialty(sampleCompanies, ["Roses"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Bloom Gardens");
  });

  it("filters by multiple specialties (OR logic)", () => {
    const result = filterBySpecialty(sampleCompanies, ["Tulips", "Orchids"]);
    expect(result).toHaveLength(4);
  });

  it("matches any specialty in company's list", () => {
    const result = filterBySpecialty(sampleCompanies, ["Carnations"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Petal Nursery");
  });
});

describe("filterByFoundedRange", () => {
  it("filters by year range (inclusive)", () => {
    const result = filterByFoundedRange(sampleCompanies, 2005, 2010);
    expect(result).toHaveLength(3);
    expect(result.every((c) => c.founded >= 2005 && c.founded <= 2010)).toBe(true);
  });

  it("filters with exact year match", () => {
    const result = filterByFoundedRange(sampleCompanies, 2010, 2010);
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.founded === 2010)).toBe(true);
  });

  it("returns empty when no companies in range", () => {
    const result = filterByFoundedRange(sampleCompanies, 2020, 2025);
    expect(result).toHaveLength(0);
  });

  it("returns all when range covers all years", () => {
    const result = filterByFoundedRange(sampleCompanies, 1990, 2030);
    expect(result).toEqual(sampleCompanies);
  });
});

describe("filterByEmployees", () => {
  it("returns all companies when ranges is empty", () => {
    expect(filterByEmployees(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single range", () => {
    const result = filterByEmployees(sampleCompanies, ["11-50"]);
    expect(result).toHaveLength(2);
  });

  it("filters by multiple ranges (OR logic)", () => {
    const result = filterByEmployees(sampleCompanies, ["1-10", "201-500"]);
    expect(result).toHaveLength(2);
  });
});

describe("filterByBusinessType", () => {
  it("returns all companies when types is empty", () => {
    expect(filterByBusinessType(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single type", () => {
    const result = filterByBusinessType(sampleCompanies, ["B2B"]);
    expect(result).toHaveLength(2);
  });

  it("filters by multiple types (OR logic)", () => {
    const result = filterByBusinessType(sampleCompanies, ["B2C", "Both"]);
    expect(result).toHaveLength(3);
  });
});

describe("filterByRevenue", () => {
  it("returns all companies when ranges is empty", () => {
    expect(filterByRevenue(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single range", () => {
    const result = filterByRevenue(sampleCompanies, ["$1M-$5M"]);
    expect(result).toHaveLength(2);
  });

  it("filters by multiple ranges (OR logic)", () => {
    const result = filterByRevenue(sampleCompanies, ["$5M-$10M", "$10M-$50M"]);
    expect(result).toHaveLength(2);
  });
});

describe("filterByCountry", () => {
  it("returns all companies when countries is empty", () => {
    expect(filterByCountry(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single country", () => {
    const result = filterByCountry(sampleCompanies, ["United States"]);
    expect(result).toHaveLength(2);
  });

  it("filters by multiple countries (OR logic)", () => {
    const result = filterByCountry(sampleCompanies, ["Netherlands", "Colombia"]);
    expect(result).toHaveLength(2);
  });

  it("returns empty when no countries match", () => {
    const result = filterByCountry(sampleCompanies, ["Japan"]);
    expect(result).toHaveLength(0);
  });
});

describe("filterByCertifications", () => {
  it("returns all companies when certifications is empty", () => {
    expect(filterByCertifications(sampleCompanies, [])).toEqual(sampleCompanies);
  });

  it("filters by single certification", () => {
    const result = filterByCertifications(sampleCompanies, ["Organic Certified"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Bloom Gardens");
  });

  it("filters by multiple certifications (OR logic)", () => {
    const result = filterByCertifications(sampleCompanies, ["MPS", "USDA Organic"]);
    expect(result).toHaveLength(2);
  });

  it("does not match companies without certifications", () => {
    const result = filterByCertifications(sampleCompanies, ["Fair Trade"]);
    expect(result).toHaveLength(1);
    expect(result[0]?.certifications).toContain("Fair Trade");
  });
});

describe("applyAllFilters", () => {
  it("returns all companies when no filters applied", () => {
    const result = applyAllFilters(sampleCompanies, {});
    expect(result).toEqual(sampleCompanies);
  });

  it("applies single filter", () => {
    const result = applyAllFilters(sampleCompanies, {
      categories: ["Florist"],
    });
    expect(result).toHaveLength(1);
  });

  it("combines multiple filters with AND logic", () => {
    const result = applyAllFilters(sampleCompanies, {
      countries: ["United States"],
      businessTypes: ["B2C"],
    });
    expect(result).toHaveLength(2);
    expect(result.every((c) => c.country === "United States" && c.businessType === "B2C")).toBe(
      true,
    );
  });

  it("combines text search with other filters", () => {
    const result = applyAllFilters(sampleCompanies, {
      text: "garden",
      countries: ["United States"],
    });
    expect(result).toHaveLength(2);
  });

  it("applies all filters together", () => {
    const filters: CompanyFilters = {
      text: "orchid",
      categories: ["Grower"],
      specialties: ["Orchids"],
      foundedMin: 2005,
      foundedMax: 2015,
      employees: ["11-50"],
      businessTypes: ["B2B"],
      revenues: ["$1M-$5M"],
      countries: ["Thailand"],
      certifications: ["Rainforest Alliance"],
    };
    const result = applyAllFilters(sampleCompanies, filters);
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Orchid Masters");
  });

  it("returns empty when filters have no intersection", () => {
    const result = applyAllFilters(sampleCompanies, {
      categories: ["Florist"],
      countries: ["Thailand"],
    });
    expect(result).toHaveLength(0);
  });

  it("ignores undefined or empty filter values", () => {
    const result = applyAllFilters(sampleCompanies, {
      text: undefined,
      categories: [],
      countries: ["United States"],
    });
    expect(result).toHaveLength(2);
  });
});
