export type Product = {
  id: string;
  name: string;
  nameMr?: string;
  category: Category;
  description: string;
  usage?: string;
  sizes: string[];
  badge?: string;
};

export type Category =
  | "Seaweed Extract"
  | "Humic & Fulvic"
  | "Amino & Protein"
  | "PGR"
  | "Microbial"
  | "Foliar Spray"
  | "Soil / Granules"
  | "Grape Specialty"
  | "Sugarcane Specialty";

export const CATEGORIES: Category[] = [
  "Seaweed Extract",
  "Humic & Fulvic",
  "Amino & Protein",
  "PGR",
  "Microbial",
  "Foliar Spray",
  "Soil / Granules",
  "Grape Specialty",
  "Sugarcane Specialty",
];

export const PRODUCTS: Product[] = [
  {
    id: "simplex",
    name: "Simplex",
    category: "Humic & Fulvic",
    description: "Potassium Humate 98% concentrated powder. Improves root development, soil structure and nutrient uptake efficiency.",
    sizes: ["1KG"],
  },
  {
    id: "dharti-gold",
    name: "Dharti Gold",
    nameMr: "धरती गोल्ड",
    category: "Soil / Granules",
    description: "Humic, Fulvic & Amino Acid Bentonite Granules. Improves soil fertility, water retention and nutrient availability across vegetables, onion, sugarcane and grapes.",
    sizes: ["25KG"],
    badge: "Best Seller",
  },
  {
    id: "dharati-ratn",
    name: "Dharati Ratn",
    category: "Soil / Granules",
    description: "General-purpose granular soil nutrition for cotton, sugarcane, onion, grapes and vegetables.",
    sizes: ["10KG Bag"],
  },
  {
    id: "prime-plus",
    name: "Prime Plus",
    category: "Foliar Spray",
    description: "Silicon 60% + Amino Acid 40% foliar formulation for every crop and every stage. Strengthens cell walls and improves stress tolerance.",
    sizes: ["100GM", "250GM", "500GM"],
  },
  {
    id: "can-master",
    name: "Can Master",
    category: "Grape Specialty",
    description: "Plant & fruit growth promoter recommended after April pruning for grape garbhdharna (fruit-set). High-quality catalyst for bunch formation.",
    usage: "80gm per acre in 200L water — apply on 35th & 45th day after pruning.",
    sizes: ["500ML"],
  },
  {
    id: "aprilia",
    name: "Aprilia",
    category: "Soil / Granules",
    description: "Mixed micronutrient soil-application granules for improved crop nutrition across vegetables.",
    usage: "3kg in 200L water per acre.",
    sizes: ["3KG"],
  },
  {
    id: "plant-bro",
    name: "Plant Bro",
    nameMr: "प्लांट ब्रो",
    category: "Foliar Spray",
    description: "100% organic liquid foliar that promotes greener foliage, stronger roots and improved soil friability.",
    usage: "5 Litres per acre.",
    sizes: ["5LTR"],
  },
  {
    id: "nano-gel",
    name: "Nano Gel",
    nameMr: "नॅनो जेल",
    category: "PGR",
    description: "Nano-gel technology promoting seed germination, flowering and enzyme activity for better fruit set.",
    usage: "500gm via drip per acre.",
    sizes: ["250GM", "500GM"],
  },
  {
    id: "shoot-out",
    name: "Shoot Out",
    category: "PGR",
    description: "Plant growth regulator supporting healthy shoot & flowering while addressing grape flea beetles and red-headed flea beetles.",
    sizes: ["500ML"],
  },
  {
    id: "psp-99",
    name: "PSP 99",
    category: "Foliar Spray",
    description: "Specialty foliar nutrition for vegetable crops supporting plant vigor and leaf health.",
    sizes: ["1KG"],
  },
  {
    id: "6-ba",
    name: "6-BA",
    category: "PGR",
    description: "6-Benzylaminopurine cytokinin (C₁₂H₁₁N₅, MW 225.26). Precision PGR for tissue development — small-dose lab/field use.",
    sizes: ["10ml x 5 Nos"],
  },
  {
    id: "lemore",
    name: "Lemore",
    category: "PGR",
    description: "Growth enhancer that increases chlorophyll, flower count, fruit-set %, yield, color and aroma. For all crop types.",
    usage: "Apply during flowering and after flowering.",
    sizes: ["250ML", "500ML", "1LTR"],
  },
  {
    id: "green-gold",
    name: "Green Gold",
    category: "Seaweed Extract",
    description: "Atlantic-seaweed extract produced via Bio-Active Induced Lacto-Fermentation Technology — unlocks maximum yield potential.",
    usage: "625–750ml per acre with adequate water.",
    sizes: ["1L"],
    badge: "Premium",
  },
  {
    id: "biotin",
    name: "Biotin",
    category: "Grape Specialty",
    description: "Specialty grape growth-stage product for fruit-setting support after pruning.",
    usage: "2ml/L on 35th day (with GA) and 2ml on 38th day after pruning.",
    sizes: ["1L"],
  },
  {
    id: "achieva-plus",
    name: "Achieva Plus",
    category: "Foliar Spray",
    description: "Organic plant growth promoter for vigorous vegetable growth through organic active ingredients.",
    sizes: ["50ML", "100ML"],
  },
  {
    id: "milan-sudo",
    name: "Milan Sudo",
    category: "Microbial",
    description: "Pseudomonas Fluorescens 0.5% WP — biological agent supporting plant health and suppressing soil-borne pathogens.",
    sizes: ["1L"],
  },
  {
    id: "milan-trycho",
    name: "Milan Trycho",
    category: "Microbial",
    description: "Trichoderma Viride bio-fungicide and natural root health enhancer.",
    sizes: ["1L"],
  },
  {
    id: "uptech-98",
    name: "Uptech 98",
    category: "Grape Specialty",
    description: "Draksha-salla cold-stress product (10–12°C) — addresses stalled growth, small berries, low pulp, poor uptake and low sugar.",
    usage: "5L per acre via drip, 3 times across 70 days from plot stage to harvest.",
    sizes: ["5L"],
  },
  {
    id: "quick-sugar",
    name: "Quick Sugar",
    category: "Grape Specialty",
    description: "Grape sugar-enhancement product to boost bunch sugar content.",
    usage: "1L per dose on 80th, 90th and 100th day after pruning.",
    sizes: ["1L"],
  },
  {
    id: "eg-long-40",
    name: "EG Long 40",
    category: "PGR",
    description: "Natural-source hormone mix that synthesizes proteins & amino acids — enhances flowering, fruit-set, size, color, luster, taste and shelf life.",
    usage: "Dilute 800ml in 200L water.",
    sizes: ["500ML", "1LTR", "5LTR"],
    badge: "Best Seller",
  },
  {
    id: "g2",
    name: "G2",
    category: "Sugarcane Specialty",
    description: "Sugarcane growth product for record yields at lower cost — more tillers, longer canes, broader leaves and darker internodes.",
    usage: "100ml in 15L water.",
    sizes: ["500ML", "1LTR"],
  },
  {
    id: "super-shot",
    name: "Super Shot",
    category: "Foliar Spray",
    description: "Silicone spreader-activator for better tank-mix performance of weedicides, insecticides, fungicides, PGRs and pesticides.",
    sizes: ["100ML"],
  },
  {
    id: "mg-gold",
    name: "MG Gold",
    category: "Amino & Protein",
    description: "Amino Acid 80% — concentrated formulation for plant nutrition, stress recovery and metabolic efficiency.",
    sizes: ["500GM"],
  },
  {
    id: "nova-gold",
    name: "Nova Gold",
    category: "Humic & Fulvic",
    description: "Fulvic Acid formulation — nutrient chelation and improved micronutrient uptake.",
    sizes: ["500GM"],
  },
  {
    id: "garba-gold",
    name: "Garba Gold",
    nameMr: "गर्भ गोल्ड",
    category: "Grape Specialty",
    description: "Maturity hormone from botanical blend & rain minerals — high-quality catalyst for bunch formation post April pruning.",
    usage: "500ML in 200L water on 55th & 65th day after pruning.",
    sizes: ["500ML"],
  },
  {
    id: "miracle-gro",
    name: "Miracle-Gro",
    category: "Seaweed Extract",
    description: "Seaweed extract + humic/fulvic acid + amino acids + vitamins. For grapes, tomato, okra, beans, brinjal, pomegranate and leafy greens.",
    sizes: ["50ML", "100ML"],
  },
  {
    id: "bio-magic",
    name: "Bio Magic",
    category: "Soil / Granules",
    description: "Organic Carbon product — enriches soil organic carbon for improved biology, structure and long-term fertility.",
    sizes: ["1L"],
  },
];
