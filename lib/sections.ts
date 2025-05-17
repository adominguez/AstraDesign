import { turso } from "@/lib/turso"
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { type ProjectExtended } from "@/types/projects"
import { Page } from "@/types/pages"
import { PageSectionsSchema } from "@/app/api/generate-sections/schema"
import { getProjectById } from "./projects";

const generateSections = async (project: ProjectExtended, page: Page) => {

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
        content: 'Eres un asistente experto en arquitectura de páginas web con enfoque en UX, usabilidad y SEO. Tienes que devolver una estructura JSON siguiendo el schema proporcionado de cómo debería de quedar la página web.'
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

const updateSectionStatus = async ({ sectionId, status, message }: { sectionId: string; status: string; message?: string; }) => {
  await turso.execute(
    `UPDATE sections SET status = ?, messageError = ? WHERE id = ?`,
    [status, message || null, sectionId]
  );
  return { success: true };
}

const insertSections = async ({projectId, pageId, userId, sections}: {projectId: string, pageId: string, userId: string, sections: any[]}) => {
  if (!projectId || !pageId) {
    throw { message: 'El ID del proyecto y de la página son obligatorios', status: 400 };
  }
  if (!sections.length) {
    throw { message: 'Es necesario proporcionar las secciones', status: 400, pageId };
  }

  // Construir la consulta SQL para múltiples inserciones
  const values = sections.map((_, idx) => `(?, ?, ?, ?, ?, ?, ?)`).join(', ');
  const sql = `
    INSERT INTO sections (page_id, project_id, user_id, title, description, section_type, section_order)
    VALUES ${values};
  `;

  // Construir los argumentos para la consulta
  const args = sections.flatMap((section, idx) => [
    pageId,
    projectId,
    userId,
    section.title,
    section.description,
    section.sectionType,
    idx,
  ]);

  // Ejecutar la consulta
  await turso.execute({ sql, args });
};

const getSectionsByProjectId = async (projectId: string) => {
  const result = await turso.execute(
    `SELECT * FROM sections WHERE project_id = ?`,
    [projectId]
  );
  if (result.rows.length === 0) {
    return [];
  }
  return result.rows.map((row: any) => ({
    id: row.id,
    pageId: row.page_id,
    projectId: row.project_id,
    title: row.title,
    description: row.description,
    sectionType: row.section_type,
    sectionOrder: row.section_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

const getSectionsById = async (id: string) => {
  if (!id) {
    throw { message: 'El ID de la sección es obligatorio', status: 400 };
  }

  const result = await turso.execute(
    `SELECT * FROM sections WHERE id = ?`,
    [id]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

const generateImageForSection = async (id: string) => {

  // Obtenemos la sección por ID
  const section = await getSectionsById(id);

  if (!section) {
    throw { message: 'No se ha encontrado la sección', status: 404 };
  }

  const { project_id, page_id } = section;
  // Obtenemos el proyecto por ID
  const project = await getProjectById(project_id, user_id);
  

}


export { generateSections, insertSections, getSectionsByProjectId, updateSectionStatus };