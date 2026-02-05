import type { CompanyFilters } from "./filters";

/**
 * URL parameter key mapping for CompanyFilters.
 * Short keys keep URLs clean.
 */
const PARAM_KEYS = {
  text: "q",
  categories: "cat",
  specialties: "spec",
  certifications: "cert",
  countries: "country",
  employees: "emp",
  businessTypes: "biz",
  revenues: "rev",
  foundedMin: "fmin",
  foundedMax: "fmax",
} as const;

/**
 * Serialize CompanyFilters to a URLSearchParams string.
 * Omits default/empty values for clean URLs.
 */
export function serializeFilters(filters: CompanyFilters): string {
  const params = new URLSearchParams();

  if (filters.text) {
    params.set(PARAM_KEYS.text, filters.text);
  }

  if (filters.categories && filters.categories.length > 0) {
    params.set(PARAM_KEYS.categories, filters.categories.join(","));
  }

  if (filters.specialties && filters.specialties.length > 0) {
    params.set(PARAM_KEYS.specialties, filters.specialties.join(","));
  }

  if (filters.certifications && filters.certifications.length > 0) {
    params.set(PARAM_KEYS.certifications, filters.certifications.join(","));
  }

  if (filters.countries && filters.countries.length > 0) {
    params.set(PARAM_KEYS.countries, filters.countries.join(","));
  }

  if (filters.employees && filters.employees.length > 0) {
    params.set(PARAM_KEYS.employees, filters.employees.join(","));
  }

  if (filters.businessTypes && filters.businessTypes.length > 0) {
    params.set(PARAM_KEYS.businessTypes, filters.businessTypes.join(","));
  }

  if (filters.revenues && filters.revenues.length > 0) {
    params.set(PARAM_KEYS.revenues, filters.revenues.join(","));
  }

  if (filters.foundedMin !== undefined) {
    params.set(PARAM_KEYS.foundedMin, String(filters.foundedMin));
  }

  if (filters.foundedMax !== undefined) {
    params.set(PARAM_KEYS.foundedMax, String(filters.foundedMax));
  }

  return params.toString();
}

/**
 * Deserialize a URLSearchParams string (or URLSearchParams object) into CompanyFilters.
 * Returns an empty object for empty/missing params.
 */
export function deserializeFilters(input: string | URLSearchParams): CompanyFilters {
  const params = typeof input === "string" ? new URLSearchParams(input) : input;
  const filters: CompanyFilters = {};

  const text = params.get(PARAM_KEYS.text);
  if (text) {
    filters.text = text;
  }

  const categories = params.get(PARAM_KEYS.categories);
  if (categories) {
    filters.categories = categories.split(",");
  }

  const specialties = params.get(PARAM_KEYS.specialties);
  if (specialties) {
    filters.specialties = specialties.split(",");
  }

  const certifications = params.get(PARAM_KEYS.certifications);
  if (certifications) {
    filters.certifications = certifications.split(",");
  }

  const countries = params.get(PARAM_KEYS.countries);
  if (countries) {
    filters.countries = countries.split(",");
  }

  const employees = params.get(PARAM_KEYS.employees);
  if (employees) {
    filters.employees = employees.split(",");
  }

  const businessTypes = params.get(PARAM_KEYS.businessTypes);
  if (businessTypes) {
    filters.businessTypes = businessTypes.split(",");
  }

  const revenues = params.get(PARAM_KEYS.revenues);
  if (revenues) {
    filters.revenues = revenues.split(",");
  }

  const foundedMin = params.get(PARAM_KEYS.foundedMin);
  if (foundedMin) {
    const parsed = Number(foundedMin);
    if (!Number.isNaN(parsed)) {
      filters.foundedMin = parsed;
    }
  }

  const foundedMax = params.get(PARAM_KEYS.foundedMax);
  if (foundedMax) {
    const parsed = Number(foundedMax);
    if (!Number.isNaN(parsed)) {
      filters.foundedMax = parsed;
    }
  }

  return filters;
}
