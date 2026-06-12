// src/data/projects.ts
// Static project data — images served from Firebase Storage paths

export interface Project {
  id: string;
  title: string;
  category: "Residential" | "Commercial" | "Interior" | "Cultural";
  location: string;
  year: number;
  description: string;
  coverImage: string; // Firebase Storage path OR fallback URL
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "obsidian-residence",
    title: "Obsidian Residence",
    category: "Residential",
    location: "Malibu, CA",
    year: 2024,
    description:
      "A clifftop sanctuary where black volcanic stone meets floor-to-ceiling glass, dissolving the boundary between architecture and horizon.",
    coverImage: "projects/obsidian-residence/cover.jpg",
    featured: true,
  },
  {
    id: "meridian-tower",
    title: "Meridian Tower",
    category: "Commercial",
    location: "Chicago, IL",
    year: 2023,
    description:
      "A 42-story mixed-use tower whose faceted glass skin shifts from gold to amber across the day, becoming a living sundial in the skyline.",
    coverImage: "projects/meridian-tower/cover.jpg",
    featured: true,
  },
  {
    id: "aurora-pavilion",
    title: "Aurora Cultural Pavilion",
    category: "Cultural",
    location: "Oslo, Norway",
    year: 2023,
    description:
      "Inspired by the northern lights, this public pavilion uses parametric steel ribs and dichroic glass to cast shifting prismatic light.",
    coverImage: "projects/aurora-pavilion/cover.jpg",
    featured: true,
  },
  {
    id: "cedar-loft",
    title: "Cedar Loft",
    category: "Interior",
    location: "Brooklyn, NY",
    year: 2022,
    description:
      "A former industrial warehouse transformed into a warm, tactile living space through exposed cedar, blackened steel, and raw concrete.",
    coverImage: "projects/cedar-loft/cover.jpg",
    featured: false,
  },
  {
    id: "solstice-villa",
    title: "Solstice Villa",
    category: "Residential",
    location: "Tuscany, Italy",
    year: 2022,
    description:
      "Carved into a hillside vineyard, this villa channels traditional Italian masonry through a contemporary minimal lens.",
    coverImage: "projects/solstice-villa/cover.jpg",
    featured: false,
  },
  {
    id: "axiom-headquarters",
    title: "Axiom Headquarters",
    category: "Commercial",
    location: "Austin, TX",
    year: 2021,
    description:
      "A low-profile campus that prioritizes biophilic design — living walls, skylights, and a central courtyard forest at its core.",
    coverImage: "projects/axiom-headquarters/cover.jpg",
    featured: false,
  },
];
