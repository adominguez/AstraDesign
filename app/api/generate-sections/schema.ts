import { z } from 'zod';

// Esquema de cada sección, con descripciones en cada campo
export const SectionSchema = z.object({
  title: z.string().describe("Título visible y legible de la sección"),
  description: z.string().describe("Explicación detallada de la función UX/SEO de esta sección, añade los textos que deberían de aparecer las secciones, CTA...,"),
  sectionType: z.string().describe("Tipo de sección, como 'hero', 'features', 'testimonials', etc."),
});

export const PageSectionsSchema = z.object({
  sections: z.array(SectionSchema).describe("Array de secciones que sean necesarias para el buen funcionamiento de la página. Enfócate en la experiencia de usuario y SEO, de entre todas las keywords centrate en las más relevantes. Y ten en cuenta que toda las secciones deben de tener un hilo conductor entre ellas y ser coherentes. Ten mucho cuidado con las comillas, caracteres especiales..."),
})
