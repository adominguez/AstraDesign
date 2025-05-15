export async function GET({ request }: { request: Request }) {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const prompt = `Diseña una imagen tipo hero para la página principal de un estudio de arquitectura moderno. La composición debe parecer una maqueta realista de una página web, incluyendo un encabezado H1 en español que diga 'Diseñamos espacios que inspiran', un subtítulo H2 que diga 'Arquitectura contemporánea con visión humana', y un botón de llamada a la acción con el texto 'Solicita tu proyecto'. El fondo debe mostrar una vivienda de líneas minimalistas y materiales elegantes como hormigón y cristal, con iluminación suave y ambiente profesional. Diseño limpio, elegante y realista, con disposición horizontal pensada para una landing page.`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generando imagen:', error);
    return new Response(JSON.stringify({ error: 'Error generando imagen' }), {
      status: 500
    });
  }
}



import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { SelectColorSchema } from '@/app/api/select-color/schema';

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