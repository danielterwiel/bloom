/**
 * FlowerCompany interface representing a flower industry company.
 */
export interface FlowerCompany {
  id: string;
  name: string;
  category: string;
  specialty: string[];
  founded: number;
  employees: string;
  businessType: string;
  annualRevenue: string;
  headquarters: string;
  country: string;
  certifications: string[];
  description: string;
  website: string;
  imageUrl: string;
}

/**
 * Available company categories in the flower industry.
 */
export const CATEGORIES: string[] = [
  "Florist",
  "Nursery",
  "Wholesale",
  "Grower",
  "Importer/Exporter",
  "Garden Center",
  "Landscaping",
  "Event Florist",
  "Online Retailer",
  "Supplier",
];

/**
 * Available flower specialties.
 */
export const SPECIALTIES: string[] = [
  "Roses",
  "Tulips",
  "Orchids",
  "Lilies",
  "Sunflowers",
  "Carnations",
  "Chrysanthemums",
  "Hydrangeas",
  "Peonies",
  "Daisies",
  "Succulents",
  "Tropical Plants",
  "Native Plants",
  "Cut Flowers",
  "Potted Plants",
  "Dried Flowers",
  "Wedding Flowers",
  "Funeral Arrangements",
  "Corporate Events",
  "Seasonal Arrangements",
];

/**
 * Employee count ranges.
 */
export const EMPLOYEE_RANGES: string[] = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

/**
 * Annual revenue ranges.
 */
export const REVENUE_RANGES: string[] = [
  "Under $100K",
  "$100K-$500K",
  "$500K-$1M",
  "$1M-$5M",
  "$5M-$10M",
  "$10M-$50M",
  "$50M+",
];

/**
 * Business type classifications.
 */
export const BUSINESS_TYPES: string[] = ["B2B", "B2C", "Both"];

/**
 * Industry certifications.
 */
export const CERTIFICATIONS: string[] = [
  "Organic Certified",
  "Fair Trade",
  "Rainforest Alliance",
  "Veriflora",
  "MPS",
  "GlobalG.A.P.",
  "USDA Organic",
  "Carbon Neutral",
  "FSC Certified",
  "ISO 14001",
];

/**
 * Countries where flower companies operate.
 */
export const COUNTRIES: string[] = [
  "United States",
  "Netherlands",
  "Colombia",
  "Ecuador",
  "Kenya",
  "Ethiopia",
  "Japan",
  "Germany",
  "United Kingdom",
  "France",
  "Italy",
  "Spain",
  "Australia",
  "Canada",
  "Mexico",
  "Brazil",
  "China",
  "India",
  "Thailand",
  "South Africa",
];
