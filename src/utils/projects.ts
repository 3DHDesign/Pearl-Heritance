// src/utils/projects.ts

export type ProjectCategory =
  | "Residential Buildings"
  | "Tourist Amenities & Eco-Friendly Buildings"
  | "Commercial & Other Buildings"
  | "Interiors";

export type CategoryCard = {
  key: ProjectCategory;
  label: string;
  title: string;
  cover: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  cover: string;
  description: string;
  images: string[];
  tags?: string[];
};

export const CATEGORIES: CategoryCard[] = [
  {
    key: "Residential Buildings",
    label: "RESIDENTIAL",
    title: "Residential Buildings",
    cover:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1400&q=80",
  },
  {
    key: "Tourist Amenities & Eco-Friendly Buildings",
    label: "TOURISM & ECO",
    title: "Tourist Amenities & Eco-Friendly Buildings",
    cover:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    key: "Commercial & Other Buildings",
    label: "COMMERCIAL",
    title: "Commercial & Other Buildings",
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
  },
  {
    key: "Interiors",
    label: "INTERIORS",
    title: "Interiors",
    cover:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1400&q=80",
  },
];

export const PROJECTS: Project[] = [
  // =========================
  // Residential Buildings
  // =========================
  {
    id: "res-kensington-house",
    title: "Kensington Residence",
    category: "Residential Buildings",
    location: "Colombo, Sri Lanka",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    description:
      "A modern residential concept built around daylight, cross-ventilation, and clean geometry. Zoning and circulation were optimized for daily routines and privacy.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Daylight", "Ventilation", "Modern planning"],
  },
  {
    id: "res-lakeside-villa",
    title: "Lakeside Villa",
    category: "Residential Buildings",
    location: "Kandy, Sri Lanka",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    description:
      "A calm villa concept with strong indoor–outdoor connections, large openings, and warm material tones. Built for family life and relaxed weekends.",
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Indoor-outdoor", "Warm tones", "Family"],
  },
  {
    id: "res-courtyard-home",
    title: "Courtyard Home",
    category: "Residential Buildings",
    location: "Galle, Sri Lanka",
    year: "2022",
    cover:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
    description:
      "A compact residential plan centered around a courtyard to improve airflow and natural lighting while maintaining privacy from the street.",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Courtyard", "Privacy", "Airflow"],
  },

  // =========================
  // Tourist Amenities & Eco-Friendly Buildings
  // =========================
  {
    id: "eco-hillside-retreat",
    title: "Hillside Eco Retreat",
    category: "Tourist Amenities & Eco-Friendly Buildings",
    location: "Nuwara Eliya, Sri Lanka",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80",
    description:
      "Eco-focused tourist amenity designed with passive cooling strategies, minimal footprint planning, and landscape-sensitive material selection.",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Passive cooling", "Landscape", "Sustainable"],
  },
  {
    id: "eco-riverside-cabins",
    title: "Riverside Cabins",
    category: "Tourist Amenities & Eco-Friendly Buildings",
    location: "Kitulgala, Sri Lanka",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80",
    description:
      "A cabin cluster layout designed for nature immersion, with walkable circulation, controlled lighting, and materials chosen for low maintenance.",
    images: [
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Cabins", "Nature immersion", "Low impact"],
  },
  {
    id: "eco-coastal-amenities",
    title: "Coastal Tourist Amenities",
    category: "Tourist Amenities & Eco-Friendly Buildings",
    location: "Mirissa, Sri Lanka",
    year: "2022",
    cover:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
    description:
      "A coastal amenity concept with shaded rest zones, durable finishes, and weather-resistant detailing for long-term performance.",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Shading", "Weather resistant", "Tourism"],
  },

  // =========================
  // Commercial & Other Buildings
  // =========================
  {
    id: "com-urban-office",
    title: "Urban Office Block",
    category: "Commercial & Other Buildings",
    location: "Dubai, UAE",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    description:
      "Commercial architecture focused on efficient floor plates, clean façade rhythm, and durable material systems suitable for high traffic environments.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Façade system", "Efficiency", "Commercial"],
  },
  {
    id: "com-retail-complex",
    title: "Retail Complex",
    category: "Commercial & Other Buildings",
    location: "Colombo, Sri Lanka",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80",
    description:
      "A retail-focused design with clear wayfinding, strong frontage, and practical service circulation. Built for everyday customer comfort.",
    images: [
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Wayfinding", "Frontage", "High traffic"],
  },
  {
    id: "com-warehouse-admin",
    title: "Warehouse & Admin Facility",
    category: "Commercial & Other Buildings",
    location: "Katunayake, Sri Lanka",
    year: "2022",
    cover:
      "https://images.unsplash.com/photo-1581092334505-6666c4b3a8ab?auto=format&fit=crop&w=1600&q=80",
    description:
      "An industrial facility concept combining warehouse efficiency with a clean administration block and controlled entry logistics.",
    images: [
      "https://images.unsplash.com/photo-1581092334505-6666c4b3a8ab?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Industrial", "Logistics", "Efficiency"],
  },

  // =========================
  // Interiors
  // =========================
  {
    id: "int-modern-lounge",
    title: "Modern Lounge Interior",
    category: "Interiors",
    location: "Colombo, Sri Lanka",
    year: "2022",
    cover:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    description:
      "Interior transformation with layered lighting, refined textures, and practical storage. The mood stays calm while keeping a premium finish.",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Lighting", "Textures", "Storage"],
  },
  {
    id: "int-minimal-kitchen",
    title: "Minimal Kitchen Upgrade",
    category: "Interiors",
    location: "Negombo, Sri Lanka",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1600&q=80",
    description:
      "A clean kitchen refresh with improved workflow, concealed storage, and simple finishes for an uncluttered modern feel.",
    images: [
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Workflow", "Storage", "Minimal"],
  },
  {
    id: "int-office-interior",
    title: "Office Interior Refresh",
    category: "Interiors",
    location: "Dubai, UAE",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    description:
      "An office interior with improved lighting, calm finishes, and a layout designed for productivity and comfort.",
    images: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2000&q=80",
    ],
    tags: ["Productivity", "Lighting", "Comfort"],
  },
];
