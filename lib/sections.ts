import { turso } from "@/lib/turso"
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { type ProjectExtended } from "@/types/projects"
import { PageExtended } from "@/types/pages"
import { PageSectionsSchema } from "@/app/api/generate-section/schema"

const generateSections = async (project: ProjectExtended, page: PageExtended) => {

  if (!project) {
    throw { message: 'Es necesario proporcionar un proyecto', status: 400 }
  }
  if (!project.name || !project.userId) {
    throw { message: 'El nombre del proyecto, el slug y el ID del usuario son obligatorios', status: 400 }
  }
  if (!project.description || !project.projectType) {
    throw { message: 'La descripción y el tipo de proyecto son obligatorios', status: 400 }
  }
  if (!page) {
    throw { message: 'Es necesario proporcionar una página', status: 400 }
  }
  if (!page.title || !page.pageType) {
    throw { message: 'El nombre de la página, y el tipo de página son obligatorios', status: 400 }
  }

  const { name, description, projectType, userId, keywords, projectDesign, buyerPersona } = project;
  const { primaryColor, secondaryColor, tertiaryColor, accentColor, textColor, typography } = projectDesign;
  const {
    demographics,
    work,
    problems,
    solutions,
    barriers
  } = buyerPersona
  

  const prompt = `
- Nombre del proyecto: ${name}
- Tipo de proyecto: ${projectType}
- Descripción: ${description}
- keywords: ${keywords.map((keyword) => keyword.keyword).join(', ')}
- colors: [${primaryColor}, ${secondaryColor}, ${tertiaryColor}, ${accentColor}, ${textColor}]
- typography: ${typography}

- Datos del buyer persona:
- demographics: ${demographics}
- work: ${JSON.stringify(work)}
- problems: ${JSON.stringify(problems)}
- solutions: ${JSON.stringify(solutions)}
- barriers: ${JSON.stringify(barriers)}

Datos de la página:
- Nombre de la página: ${page.title}
- Tipo de página: ${page.pageType}
- Descripción de la página: ${page.description}

Instrucciones:
1. De entre las keywords selecciona sólo las más relevantes y que mejor definan la página, añádelas en los textos, puedes usar también palabras long tail.
2. Según el tipo de página y el contexto de proyecto, genera entre 4 y 6 secciones recomendadas.
3. Tienes que crear un prompt que pueda pasarle a una IA para generar una imagen de como debería de ser el diseño de la sección, las secciones deben de tener un hilo conductor entre ellas y ser coherentes, el prompt debe de incluir todo lo necesario, por ejemplo, textos, títulos, y cualquier otro elemento relevante.
`;

  const result = await generateObject({
    model: openai('o4-mini'),
    schema: PageSectionsSchema,
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente experto en arquitectura de páginas web con enfoque en UX, usabilidad y SEO. Además eres un experto en prompt engineer. Tienes que devolver una estructura JSON siguiendo el schema proporcionado de cómo debería de quedar la página web.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
  });

  if (!result) {
    throw { message: 'Error al generar la sección', status: 500 }
  }

  const sections = result.toJsonResponse();
  return await sections.json();
}


export { generateSections };