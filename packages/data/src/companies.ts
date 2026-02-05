import type { FlowerCompany } from "./types";
import {
  SPECIALTIES,
  EMPLOYEE_RANGES,
  REVENUE_RANGES,
  BUSINESS_TYPES,
  CERTIFICATIONS,
} from "./types";

/**
 * Seeded pseudo-random number generator (Mulberry32).
 * Produces deterministic results given the same seed.
 */
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pick a random item from an array using the provided random function.
 */
function pickRandom<T>(arr: readonly T[], random: () => number): T {
  return arr[Math.floor(random() * arr.length)]!;
}

/**
 * Pick multiple unique random items from an array.
 */
function pickMultipleRandom<T>(arr: readonly T[], count: number, random: () => number): T[] {
  const shuffled = [...arr].sort(() => random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Pick from a weighted distribution.
 * weights is an array of [item, weight] pairs.
 */
function pickWeighted<T>(weights: readonly [T, number][], random: () => number): T {
  const total = weights.reduce((sum, [, w]) => sum + w, 0);
  let r = random() * total;
  for (const [item, weight] of weights) {
    r -= weight;
    if (r <= 0) return item;
  }
  return weights[weights.length - 1]![0];
}

/**
 * Generate a year with a bell curve distribution centered around 2010.
 * Range: 1990-2024
 */
function generateFoundedYear(random: () => number): number {
  // Box-Muller transform for normal distribution
  const u1 = random();
  const u2 = random();
  const z = Math.sqrt(-2 * Math.log(u1 || 0.0001)) * Math.cos(2 * Math.PI * u2);

  // Mean: 2010, Standard deviation: 5 years
  const year = Math.round(2010 + z * 5);

  // Clamp to reasonable range
  return Math.max(1990, Math.min(2024, year));
}

// Company name prefixes
const NAME_PREFIXES = [
  "Bloom",
  "Flora",
  "Petal",
  "Garden",
  "Rose",
  "Lily",
  "Orchid",
  "Meadow",
  "Spring",
  "Botanical",
  "Green",
  "Verdant",
  "Floral",
  "Blossom",
  "Nature",
  "Evergreen",
  "Paradise",
  "Royal",
  "Golden",
  "Silver",
  "Valley",
  "Mountain",
  "Coastal",
  "Urban",
  "Classic",
  "Premier",
  "Elite",
  "Sunrise",
  "Sunset",
  "Crystal",
];

const NAME_SUFFIXES = [
  "Flowers",
  "Florist",
  "Gardens",
  "Nursery",
  "Blooms",
  "Botanics",
  "Florals",
  "Plants",
  "Greenery",
  "Growers",
  "Farm",
  "Co.",
  "Inc.",
  "LLC",
  "Group",
  "International",
  "Wholesale",
  "Supply",
  "Trading",
  "Imports",
];

const NAME_MIDDLE = [
  "",
  "& Sons",
  "& Co.",
  "Brothers",
  "Sisters",
  "Family",
  "Premium",
  "Artisan",
  "Heritage",
  "Modern",
];

// City names by country for headquarters
const CITIES_BY_COUNTRY: Record<string, string[]> = {
  "United States": [
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
    "San Francisco",
    "Seattle",
    "Denver",
    "Austin",
    "Boston",
    "Portland",
  ],
  Netherlands: ["Amsterdam", "Rotterdam", "Aalsmeer", "The Hague", "Utrecht", "Eindhoven"],
  Colombia: ["Bogotá", "Medellín", "Cali", "Rionegro", "Facatativá"],
  Ecuador: ["Quito", "Guayaquil", "Cayambe", "Latacunga", "Tabacundo"],
  Kenya: ["Nairobi", "Naivasha", "Nakuru", "Eldoret", "Thika"],
  Ethiopia: ["Addis Ababa", "Bahir Dar", "Hawassa", "Ziway"],
  Japan: ["Tokyo", "Osaka", "Nagoya", "Fukuoka", "Sapporo"],
  Germany: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Cologne"],
  "United Kingdom": ["London", "Manchester", "Birmingham", "Edinburgh", "Bristol"],
  France: ["Paris", "Lyon", "Nice", "Bordeaux", "Marseille"],
  Italy: ["Milan", "Rome", "Florence", "Bologna", "Turin"],
  Spain: ["Madrid", "Barcelona", "Valencia", "Seville", "Málaga"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Curitiba", "Belo Horizonte"],
  China: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou", "Kunming"],
  India: ["Mumbai", "Delhi", "Bangalore", "Pune", "Chennai"],
  Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Khon Kaen"],
  "South Africa": ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Port Elizabeth"],
};

// Description templates
const DESCRIPTION_TEMPLATES = [
  "A leading {category} specializing in {specialty}. Established in {year}, serving customers with quality {product}.",
  "Family-owned {category} since {year}. Known for exceptional {specialty} and personalized service.",
  "Premier {category} offering the finest {specialty}. {businessType} focused with {cert} certification.",
  "Your trusted source for {specialty}. Operating as a {category} since {year}.",
  "Dedicated to providing beautiful {specialty} to customers worldwide. A {category} committed to excellence.",
  "Innovative {category} bringing fresh {specialty} to the market since {year}.",
  "Award-winning {category} recognized for outstanding {specialty}. Proudly serving the {region} region.",
  "Sustainable {category} focused on eco-friendly {specialty} production and distribution.",
  "Boutique {category} crafting unique {specialty} arrangements since {year}.",
  "Industry-leading {category} with a passion for {specialty} and customer satisfaction.",
];

/**
 * Generate a company name.
 */
function generateCompanyName(random: () => number, index: number): string {
  const prefix = pickRandom(NAME_PREFIXES, random);
  const suffix = pickRandom(NAME_SUFFIXES, random);
  const middle = random() < 0.3 ? pickRandom(NAME_MIDDLE, random) : "";

  // Add index-based uniqueness to prevent duplicates
  const baseName = middle ? `${prefix} ${middle} ${suffix}` : `${prefix} ${suffix}`;

  // Every 100 companies, add a regional identifier for uniqueness
  if (index % 100 === 0 && index > 0) {
    const regions = ["East", "West", "North", "South", "Central", "Pacific", "Atlantic"];
    return `${pickRandom(regions, random)} ${baseName}`;
  }

  // Every 50 companies, add a number suffix
  if (index % 50 === 0 && index > 0) {
    return `${baseName} ${Math.floor(random() * 900) + 100}`;
  }

  return baseName;
}

/**
 * Generate a description for a company.
 */
function generateDescription(
  category: string,
  specialty: string[],
  founded: number,
  businessType: string,
  certifications: string[],
  country: string,
  random: () => number,
): string {
  const template = pickRandom(DESCRIPTION_TEMPLATES, random);

  return template
    .replace("{category}", category.toLowerCase())
    .replace("{specialty}", specialty[0] ?? "flowers")
    .replace("{year}", String(founded))
    .replace("{businessType}", businessType)
    .replace("{cert}", certifications[0] ?? "quality")
    .replace("{product}", specialty.length > 1 ? "flowers and plants" : "flowers")
    .replace("{region}", country);
}

/**
 * Generate a website URL from company name.
 */
function generateWebsite(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `https://www.${slug}.com`;
}

/**
 * Generate a placeholder image URL.
 */
function generateImageUrl(id: string): string {
  // Use a deterministic placeholder image service
  return `https://picsum.photos/seed/${id}/400/300`;
}

// Country weights (USA 40%, Netherlands 15%, Colombia 10%, others share remaining 35%)
const COUNTRY_WEIGHTS: [string, number][] = [
  ["United States", 40],
  ["Netherlands", 15],
  ["Colombia", 10],
  ["Ecuador", 5],
  ["Kenya", 4],
  ["Ethiopia", 2],
  ["Japan", 3],
  ["Germany", 3],
  ["United Kingdom", 3],
  ["France", 2],
  ["Italy", 2],
  ["Spain", 2],
  ["Australia", 2],
  ["Canada", 2],
  ["Mexico", 1],
  ["Brazil", 1],
  ["China", 1],
  ["India", 1],
  ["Thailand", 0.5],
  ["South Africa", 0.5],
];

// Category weights (weighted toward Florist, Nursery, Wholesale)
const CATEGORY_WEIGHTS: [string, number][] = [
  ["Florist", 25],
  ["Nursery", 20],
  ["Wholesale", 18],
  ["Grower", 10],
  ["Importer/Exporter", 7],
  ["Garden Center", 6],
  ["Landscaping", 5],
  ["Event Florist", 4],
  ["Online Retailer", 3],
  ["Supplier", 2],
];

/**
 * Generate a single flower company record.
 */
function generateCompany(random: () => number, index: number): FlowerCompany {
  const id = `fc-${String(index + 1).padStart(4, "0")}`;
  const name = generateCompanyName(random, index);
  const category = pickWeighted(CATEGORY_WEIGHTS, random);
  const founded = generateFoundedYear(random);
  const country = pickWeighted(COUNTRY_WEIGHTS, random);

  // 1-4 specialties
  const specialtyCount = Math.floor(random() * 4) + 1;
  const specialty = pickMultipleRandom(SPECIALTIES, specialtyCount, random);

  const employees = pickRandom(EMPLOYEE_RANGES, random);
  const businessType = pickRandom(BUSINESS_TYPES, random);
  const annualRevenue = pickRandom(REVENUE_RANGES, random);

  // Generate headquarters from country
  const cities = CITIES_BY_COUNTRY[country] ?? ["Capital City"];
  const headquarters = pickRandom(cities, random);

  // 60% have at least one certification
  let certifications: string[] = [];
  if (random() < 0.6) {
    const certCount = Math.floor(random() * 3) + 1;
    certifications = pickMultipleRandom(CERTIFICATIONS, certCount, random);
  }

  const description = generateDescription(
    category,
    specialty,
    founded,
    businessType,
    certifications,
    country,
    random,
  );

  const website = generateWebsite(name);
  const imageUrl = generateImageUrl(id);

  return {
    id,
    name,
    category,
    specialty,
    founded,
    employees,
    businessType,
    annualRevenue,
    headquarters,
    country,
    certifications,
    description,
    website,
    imageUrl,
  };
}

/**
 * Generate all 1000 flower company records.
 * Uses a fixed seed for deterministic generation.
 */
export function generateCompanies(seed: number = 42): FlowerCompany[] {
  const random = createSeededRandom(seed);
  const companies: FlowerCompany[] = [];

  for (let i = 0; i < 1000; i++) {
    companies.push(generateCompany(random, i));
  }

  return companies;
}

/**
 * Pre-generated company data with seed 42.
 * This ensures consistent data across all usages.
 */
export const companies: FlowerCompany[] = generateCompanies(42);
