import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { GenerateKeywordsSchema } from './schema';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: openai('o4-mini'),
    schema: GenerateKeywordsSchema,
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente experto en SEO, tu labor es generar un listado de palabras clave en función de la descripción que te de el usuario. Como mínimo 3 palabras clave y como máximo 10 palabras clave. Deben de estar ordenadas por orden de relevancia.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });

  return result.toJsonResponse();
}