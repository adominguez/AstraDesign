import { currentUser } from "@clerk/nextjs/server";
import { insertNewPage, updatePageStatus } from '@/lib/pages';
import { createSlug } from '@/lib/utils';
import { generateSections, insertSections } from '@/lib/sections';
import { getProjectForSections } from '@/lib/projects';

export async function POST(req: Request) {
  try {

    if (!req.body) {
      // Lanzar un error si no hay cuerpo en la solicitud con el status 400
      throw { message: 'No body in request', status: 400 };
    }

    // Obtenemos los datos del formulario
    const form = await req.formData();
    const title = form.get('title')?.toString() ?? '';
    const description = form.get('description')?.toString() ?? '';
    const pageType = form.get('pageType')?.toString() ?? '';
    const projectId = form.get('projectId')?.toString() ?? '';
    
    // Obtenemos el usuario actual
    const user = await currentUser();

    if (!user) {
      // Lanzar un error si no hay usuario autenticado
      throw { message: 'User not authenticated', status: 401 };
    }
    const userId = user.id;
    const slug = createSlug(title);

    // Añadimos la página a la base de datos
    const page = {
      userId,
      projectId, // Asignar el ID del proyecto si es necesario
      title,
      slug,
      description,
      pageType,
      status: 'OK'
    }
    const { pageId } = await insertNewPage(page);

    if (!pageId) {
      // Lanzar un error si no se ha insertado el proyecto
      throw { message: 'Fallo al insertar la página', status: 500 };
    }

    // Obtenemos el proyecto para generar las secciones
    const project = await getProjectForSections(projectId, userId);
    if (!project) {
      // Lanzar un error si no se ha encontrado el proyecto
      throw { message: 'Fallo al encontrar el proyecto', status: 500 };
    }

    // Generamos las secciones para la página
    const pageSections = await generateSections(project, page);


    if (!pageSections || !pageSections.sections) {
      // Lanzar un error si no se han generado las secciones
      throw { message: 'Fallo al generar las secciones', status: 500 };
    }

    // Guardamos las secciones en la base de datos
    await insertSections({projectId, pageId, userId, sections: pageSections.sections});

    // Actualizamos el estado del proyecto a "completado"
    await updatePageStatus({ pageId, status: 'OK' });

    return new Response(JSON.stringify({
      message: 'Page created successfully',
      pageId,
      slug,
      title,
      description,
      pageType,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {

    // Si el error tiene un status, lo usamos, de lo contrario, usamos 500
    const status = (error as any).status || 500;
    const message = (error as any).message || 'Internal Server Error';
    const pageId = (error as any).pageId || null;

    console.error('Error in POST /api/new-page:', message);

    // Actualizamos el status del proyecto a "error"
    if (pageId) {
      await updatePageStatus({ pageId, status: 'ERROR', message: `${status}: ${message}` });
    }

    return new Response(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}