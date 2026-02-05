import type { FlowerCompany } from "./types";

/**
 * Filter interface for applying all filters at once.
 */
export interface CompanyFilters {
  text?: string;
  categories?: string[];
  specialties?: string[];
  foundedMin?: number;
  foundedMax?: number;
  employees?: string[];
  businessTypes?: string[];
  revenues?: string[];
  countries?: string[];
  certifications?: string[];
}

/**
 * Filter companies by text search (matches name or description).
 * Case-insensitive partial matching.
 */
export function filterByText(companies: FlowerCompany[], query: string): FlowerCompany[] {
  if (!query.trim()) return companies;

  const lowerQuery = query.toLowerCase().trim();
  return companies.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) || c.description.toLowerCase().includes(lowerQuery),
  );
}

/**
 * Filter companies by category.
 * Returns companies matching ANY of the provided categories (OR logic).
 */
export function filterByCategory(
  companies: FlowerCompany[],
  categories: string[],
): FlowerCompany[] {
  if (categories.length === 0) return companies;

  const categorySet = new Set(categories);
  return companies.filter((c) => categorySet.has(c.category));
}

/**
 * Filter companies by specialty.
 * Returns companies that have ANY of the provided specialties (OR logic).
 */
export function filterBySpecialty(
  companies: FlowerCompany[],
  specialties: string[],
): FlowerCompany[] {
  if (specialties.length === 0) return companies;

  const specialtySet = new Set(specialties);
  return companies.filter((c) => c.specialty.some((s) => specialtySet.has(s)));
}

/**
 * Filter companies by founded year range.
 * Inclusive of both min and max values.
 */
export function filterByFoundedRange(
  companies: FlowerCompany[],
  min: number,
  max: number,
): FlowerCompany[] {
  return companies.filter((c) => c.founded >= min && c.founded <= max);
}

/**
 * Filter companies by employee range.
 * Returns companies matching ANY of the provided ranges (OR logic).
 */
export function filterByEmployees(companies: FlowerCompany[], ranges: string[]): FlowerCompany[] {
  if (ranges.length === 0) return companies;

  const rangeSet = new Set(ranges);
  return companies.filter((c) => rangeSet.has(c.employees));
}

/**
 * Filter companies by business type.
 * Returns companies matching ANY of the provided types (OR logic).
 */
export function filterByBusinessType(companies: FlowerCompany[], types: string[]): FlowerCompany[] {
  if (types.length === 0) return companies;

  const typeSet = new Set(types);
  return companies.filter((c) => typeSet.has(c.businessType));
}

/**
 * Filter companies by annual revenue range.
 * Returns companies matching ANY of the provided ranges (OR logic).
 */
export function filterByRevenue(companies: FlowerCompany[], ranges: string[]): FlowerCompany[] {
  if (ranges.length === 0) return companies;

  const rangeSet = new Set(ranges);
  return companies.filter((c) => rangeSet.has(c.annualRevenue));
}

/**
 * Filter companies by country.
 * Returns companies matching ANY of the provided countries (OR logic).
 */
export function filterByCountry(companies: FlowerCompany[], countries: string[]): FlowerCompany[] {
  if (countries.length === 0) return companies;

  const countrySet = new Set(countries);
  return companies.filter((c) => countrySet.has(c.country));
}

/**
 * Filter companies by certifications.
 * Returns companies that have ANY of the provided certifications (OR logic).
 */
export function filterByCertifications(
  companies: FlowerCompany[],
  certs: string[],
): FlowerCompany[] {
  if (certs.length === 0) return companies;

  const certSet = new Set(certs);
  return companies.filter((c) => c.certifications.some((cert) => certSet.has(cert)));
}

/**
 * Apply all filters at once.
 * Multiple filters are combined with AND logic.
 * Within each filter, multiple values use OR logic.
 */
export function applyAllFilters(
  companies: FlowerCompany[],
  filters: CompanyFilters,
): FlowerCompany[] {
  let result = companies;

  if (filters.text) {
    result = filterByText(result, filters.text);
  }

  if (filters.categories && filters.categories.length > 0) {
    result = filterByCategory(result, filters.categories);
  }

  if (filters.specialties && filters.specialties.length > 0) {
    result = filterBySpecialty(result, filters.specialties);
  }

  if (filters.foundedMin !== undefined && filters.foundedMax !== undefined) {
    result = filterByFoundedRange(result, filters.foundedMin, filters.foundedMax);
  }

  if (filters.employees && filters.employees.length > 0) {
    result = filterByEmployees(result, filters.employees);
  }

  if (filters.businessTypes && filters.businessTypes.length > 0) {
    result = filterByBusinessType(result, filters.businessTypes);
  }

  if (filters.revenues && filters.revenues.length > 0) {
    result = filterByRevenue(result, filters.revenues);
  }

  if (filters.countries && filters.countries.length > 0) {
    result = filterByCountry(result, filters.countries);
  }

  if (filters.certifications && filters.certifications.length > 0) {
    result = filterByCertifications(result, filters.certifications);
  }

  return result;
}
