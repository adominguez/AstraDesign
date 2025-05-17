export async function GET({ request }: { request: Request }) {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


  const colors = ['#264653', '#2a9d8f', '#e9c46a', { accent: '#f4a261', text: '#ffffff' }];

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: `
Eres un diseñador web experto especializado en crear diseños visuales atractivos, limpios, minimalistas y centrados en proporcionar una excelente experiencia de usuario (UX). Tu tarea es generar una imagen de la sección de un sitio web con la información proporcionada por el usuario.

Estas son las instrucciones que debes seguir:

### Instrucciones clave (debes seguirlas siempre):

- Muy importante, La imágen **debe ser completa, no pueden aparecer cortadas**, ocupando el ancho total de la pantalla cuando sean imágenes de portada (Hero o banners destacados).
- El ancho total del contenido principal debe ser **1024px centrado**, salvo en las imágenes de portada o banners destacados que deben ocupar el ancho completo de la pantalla, el ancho total de la imagen debe de ser 1536px.
- Evita sugerir imágenes verticales o recortadas.
- A menos que el usuario diga lo contrario, los textos deben de estar en español.
- Evita a toda costa las faltas de ortografía en los textos
- Usa un estilo visual limpio, moderno y atractivo, evitando el uso de imágenes de baja calidad o poco profesionales.
- De entre las keywords que te proporciona el usuario, selecciona sólo las más relevantes y que mejor definan la sección, añádelas en los textos, puedes usar también palabras long tail.

### Información del usuario:

Proyecto: 3DMakerForYou
Descripción: Tienda online que se dedica a la venta de productos personalizados impresos en 3D
Tipo de web: Tienda online
Palabras clave: tienda online impresión 3D, productos personalizados impresos en 3D, objetos decorativos personalizados 3D, impresión 3D a medida, diseño personalizado 3D, decoración personalizada, regalos únicos impresos en 3D
Colores: ${colors.map(color => color).join(', ')}
Tipografía: sans-serif
Sección: Hero
Descripción: Sección inicial que capta la atención y comunica de forma clara la propuesta de valor. Incluye un H1 con palabras clave como “tienda online impresión 3D” y “productos personalizados impresos en 3D” para potenciar el SEO y un CTA destacado para mejorar la conversión.

Buyer persona:

Marta Gómez, 29 años, Licenciada en Diseño de Interiores, Barcelona (España), ingresos brutos anuales aproximados: 35.000 €
Trabajo: Trabaja como diseñadora de interiores freelance, colabora con pequeños estudios y clientes particulares. Sus retos: ofrecer proyectos únicos, ajustarse a presupuestos reducidos y tiempos de entrega ajustados. Equilibra su agenda para compaginar visitas a obra con la gestión comercial y creativa. El trabajo freelance le da flexibilidad pero genera estrés por la irregularidad de ingresos.
Problemas: Sus clientes demandan elementos decorativos exclusivos y personalizados que encajen con el estilo de cada proyecto. Le cuesta encontrar materiales y proveedores rápidos que puedan producir piezas únicas a medida sin precios prohibitivos.
soluciones: Busca proveedores en línea especializados en personalización: explora marketplaces de diseño, pide recomendaciones en grupos de Facebook y lee reseñas en Google. Descubre la tienda online de impresión 3D al buscar «objetos decorativos personalizados 3D» y valora los casos de éxito y tiempos de entrega claros. Ante una propuesta comercial, pide muestras digitales, consulta plazos y compara precios antes de decidir.
Barreras: Duda sobre la calidad final del producto, el nivel de detalle y la resistencia de los materiales. Usa como excusa la incertidumbre en plazos de entrega o teme excederse en el presupuesto del cliente. También valora opciones tradicionales de artesanía local antes de invertir en impresión 3D.
        `,
        n: 1,
        size: '1536x1024'
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