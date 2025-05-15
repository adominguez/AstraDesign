import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { SelectColorSchema } from './schema';

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = await generateObject({
    model: openai('o4-mini'),
    schema: SelectColorSchema,
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente experto en marketing y diseño, tu labor es generar los mejores colores posibles en función de la descripción que te de el usuario.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });

  return result.toJsonResponse();
}