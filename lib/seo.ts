import type { Metadata } from 'next';

export const createMetadata = (title: string, description: string): Metadata => ({
  title,
  description,
});

// Dans les page ajouter ça pour définir le SEO
// import { createMetadata } from "@/lib/seo";

// export const metadata = createMetadata(
//   "Calculateur d’allure",
//   "Calcule ton allure de course à pied facilement."
// );
