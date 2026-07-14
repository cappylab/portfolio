export const techExperience: Record<string, { level: string; years: string }> = {
  "React": { level: "Intermediate", years: "2 years" },
  "Next.js": { level: "Intermediate", years: "2 years" },
  "TypeScript": { level: "Intermediate", years: "2 years" },
  "Tailwind CSS": { level: "Intermediate", years: "2 years" },
  "Node.js": { level: "Intermediate", years: "1+ year" },
  "Astro": { level: "Beginner", years: "1 year" },
  "Cloudflare Workers": { level: "Beginner", years: "1 year" },
  "PostgreSQL": { level: "Beginner", years: "1 year" },
  "Prisma": { level: "Beginner", years: "1 year" },
  "Git": { level: "Intermediate", years: "2 years" },
  "Vercel": { level: "Intermediate", years: "2 years" },
  "Figma": { level: "Beginner", years: "1 year" },
};

export const skills = Object.keys(techExperience);

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export const experience: Experience[] = [
  { role: "Building MyCar", company: "Personal Project", period: "2025 — 2026", desc: "Bilingual car marketplace with AI-powered recommendations." },
  { role: "Building Hey Nabi", company: "Personal Project", period: "2024 — 2025", desc: "Real-time lecture translation with 99% STT accuracy." },
  { role: "Started web development", company: "Self-taught", period: "2024", desc: "Learning React, TypeScript, and Next.js from the ground up." },
];

export type SocialLink =
  | {
      id: "email" | "github" | "linkedin";
      label: "Email" | "GitHub" | "LinkedIn";
      action: "link";
      href: string;
    }
  | {
      id: "discord";
      label: "Discord";
      action: "copy";
      value: "cappyeo";
    };

export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    action: "link",
    href: "mailto:jeonghamin1909@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    action: "link",
    href: "https://github.com/jhm1909",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    action: "link",
    href: "https://www.linkedin.com/in/ha-min-jeong-a3a904401",
  },
  { id: "discord", label: "Discord", action: "copy", value: "cappyeo" },
];

export const navLinks = [
  { key: "work", href: "/#work" },
  { key: "about", href: "/#about" },
  { key: "contact", href: "/#contact" },
  { key: "blog", href: "/blog" },
] as const;
