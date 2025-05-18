import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { BuyerPersonaSchema } from './schema';

export async function POST(request: Request) {
  const { prompt }: { prompt: string } = await request.json();

  // const result = streamText({
  //   model: openai('gpt-4'),
  //   system: 'You are a helpful assistant.',
  //   prompt,
  // });

  // return result.toDataStreamResponse();

  const result = streamObject({
    model: openai('o4-mini'),
    schema: BuyerPersonaSchema,
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente experto en marketing y generación de buyer personas.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });

  return result.toTextStreamResponse();

}