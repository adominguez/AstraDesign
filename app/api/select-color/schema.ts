import { z } from 'zod';

export const SelectColorSchema = z.object({
  id: z.string().describe('ID del color.'),
  name: z.string().describe('Nombre del color.'),
  primary: z.string().describe('Color primario en formato hexadecimal.'),
  secondary: z.string().describe('Color secundario en formato hexadecimal.'),
  tertiary: z.string().describe('Color terciario en formato hexadecimal.'),
  accent: z.string().describe('Color de acento en formato hexadecimal.'),
  text: z.string().describe('Color de texto en formato hexadecimal.'),
}).describe('Esquema para la selección de colores.');