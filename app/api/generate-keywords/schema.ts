import { z } from 'zod';


// Esquema de creación de palabras clave, un listado de palabras clave como máximo 10 palabras clave
// y un mínimo de 3 palabras clave.
// El listado de palabras clave no puede ser vacío y no puede contener palabras clave duplicadas.
// Las palabras clave deben ser cadenas de texto y no pueden contener caracteres especiales.
// Las palabras clave deben tener una longitud mínima de 3 caracteres y una longitud máxima de 20 caracteres.
// Las palabras clave no pueden contener espacios en blanco al principio o al final.
export const GenerateKeywordsSchema = z.object({
  keywords: z.array(z.string()).describe('Listado de palabras clave.'),
}).describe('Esquema para la generación de palabras clave.');
