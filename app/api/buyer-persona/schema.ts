import { z } from 'zod';

// define a schema for the notifications
export const BuyerPersonaSchema = z.object({
  name: z.string().describe('Nombre identificativo del buyer persona'),
  demographics: z.string().describe('Nombre ficticio, edad aproximada, formación académica, ciudad o región, ingresos brutos anuales'),
  family: z.string().describe('Integrantes de la unidad familiar, principales actividades de ocio, responsabilidades principales en el hogar'),
  work: z.string().describe('Empresa o centro donde trabaja, puesto o cargo desempeñado, retos o desafíos en el ámbito laboral, cómo influye su trabajo en su vida personal y viceversa'),
  behaviors: z.string().describe('Relación con pareja, familia y amigos, expresiones y estilo de comunicación de su grupo social'),
  problems: z.string().describe('Dolor o problema que impulsa la búsqueda de una solución, cómo el producto o servicio aborda ese problema'),
  solutions: z.string().describe('Dónde busca soluciones (internet, recomendaciones, etc.), cómo acaba encontrando tu empresa o producto, reacción ante las propuestas comerciales'),
  barriers: z.string().describe('Barreras internas o externas para no comprar o contratar, excusas o alternativas que usa para posponer la compra'),
});

