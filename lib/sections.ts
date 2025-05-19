// @ts-nocheck

import { turso } from "@/lib/turso"
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { type ProjectExtended } from "@/types/projects"
import { Page } from "@/types/pages"
import { PageSectionsSchema } from "@/app/api/generate-sections/schema"
import { getProjectForSections } from "./projects";

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

const getGeneratedImagesByProjectId = async (projectId: string) => {
  const result = await turso.execute(
    `SELECT * FROM generated_images WHERE project_id = ?`,
    [projectId]
  );
  if (result.rows.length === 0) {
    return [];
  }
  return result.rows.map((row: any) => ({
    id: row.id,
    pageId: row.page_id,
    projectId: row.project_id,
    sectionId: row.section_id,
    assetFolder: row.asset_folder,
    format: row.format,
    width: row.width,
    height: row.height,
    publicId: row.public_id,
    url: row.url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

const getSectionsByProjectId = async (projectId: string) => {
  const result = await turso.execute(
    `SELECT * FROM sections WHERE project_id = ?`,
    [projectId]
  );
  if (result.rows.length === 0) {
    return [];
  }

  const images = await getGeneratedImagesByProjectId(projectId);
  
  return result.rows.map((row: any) => ({
    id: row.id,
    pageId: row.page_id,
    projectId: row.project_id,
    title: row.title,
    description: row.description,
    sectionType: row.section_type,
    sectionOrder: row.section_order,
    images: images.filter((image: any) => image.sectionId === row.id),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

const getSectionById = async (id: string, userId: string) => {
  if (!id) {
    throw { message: 'El ID de la sección es obligatorio', status: 400 };
  }

  const result = await turso.execute(
    `SELECT * FROM sections WHERE id = ? AND user_id = ?`,
    [id, userId]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

const generateImageForSection = async (sectionId: string, userId: string) => {

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  // Obtenemos la sección por ID
  const section = await getSectionById(sectionId, userId);
  const { section_type: sectionType, description: sectionDescription } = section || {};

  if (!section) {
    throw { message: 'No se ha encontrado la sección', status: 404 };
  }

  const { project_id, page_id } = section;
  // Obtenemos el proyecto por ID
  const project = await getProjectForSections(project_id, userId);
  
  if (!project) {
    throw { message: 'No se ha encontrado el proyecto', status: 404 };
  }

  const { projectDesign, name, description, projectType, keywords, buyerPersona } = project;
  const { primaryColor, secondaryColor, tertiaryColor, accentColor, textColor } = projectDesign || {};
  const { typography } = projectDesign || {};
  const colors = [primaryColor, secondaryColor, tertiaryColor, accentColor, textColor].filter(color => color);
  const { demographics, work, problems, solutions, barriers } = buyerPersona || {};

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
- Evita a toda costa las faltas de ortografía en los textos.
- Usa un estilo visual limpio, moderno y atractivo, evitando el uso de imágenes de baja calidad o poco profesionales.
- De entre las keywords que te proporciona el usuario, selecciona sólo las más relevantes y que mejor definan la sección, añádelas en los textos, puedes usar también palabras long tail.

### Información del usuario:

Proyecto: ${name}
Descripción: ${description}
Tipo de web: ${projectType}
Keywords: ${keywords.map(keyword => keyword.keyword).join(', ')}
Colores: ${projectDesign ? colors.map(color => color).join(', ') : 'Puedes usar los colores que mejor convengan a la sección'}
Tipografía: ${projectDesign ? typography : 'Puedes usar la tipografía que mejor le vaya a la sección'}
Sección: ${sectionType}
Descripción: ${sectionDescription}

Buyer persona:

${demographics ? demographics : 'Puedes usar la información que mejor convenga a la sección'}
Trabajo: ${work ? work : 'Puedes usar la información que mejor convenga a la sección'}
Problemas: ${problems ? problems : 'Puedes usar la información que mejor convenga a la sección'}
Soluciones: ${solutions ? solutions : 'Puedes usar la información que mejor convenga a la sección'}
Barreras: ${barriers ? barriers : 'Puedes usar la información que mejor convenga a la sección'}
        `,
        n: 1,
        size: '1536x1024'
      })
    });

    if (!response.ok) {
      throw { message: 'Error al generar la imagen', status: response.status };
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error generando imagen:', error);
    throw { message: 'Error generando imagen', status: 500 };
  }
}

const insertNewSectionImage = async ({imageData, sectionId, projectId, pageId}) => {
  if (!imageData || !sectionId) {
    throw { message: 'La imagen y el ID de la sección son obligatorios', status: 400 };
  }

  const { 
    asset_folder: assetFolder, 
    secure_url: url, width, height, format, 
    public_id: publicId } = imageData;

  await turso.execute(
    `INSERT INTO generated_images (section_id, page_id, project_id, asset_folder, format, width, height, public_id, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [sectionId, pageId, projectId, assetFolder, format, width, height, publicId, url]
  );
  return { success: true };
}

const deleteGeneratedImagesByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw { message: 'El ID del proyecto es obligatorio', status: 400 };
  }
  await turso.execute(
    `DELETE FROM generated_images WHERE project_id = ?`,
    [projectId]
  );
  return { success: true };
}

const deleteSectionsByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw { message: 'El ID del proyecto es obligatorio', status: 400 };
  }

  await deleteGeneratedImagesByProjectId(projectId);

  await turso.execute(
    `DELETE FROM sections WHERE project_id = ?`,
    [projectId]
  );
  return { success: true };
}

export { generateSections, insertSections, getSectionsByProjectId, updateSectionStatus, generateImageForSection, insertNewSectionImage, deleteGeneratedImagesByProjectId, deleteSectionsByProjectId };