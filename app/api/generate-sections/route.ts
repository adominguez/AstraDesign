import { currentUser } from "@clerk/nextjs/server";
import { getProjectForSections } from '@/lib/projects';
import { generateSections, insertSections } from '@/lib/sections';
import { updatePageStatus } from '@/lib/pages';
import { ProjectExtended } from "@/types/projects";

export async function POST(req: Request) {
  try {

    if (!req.body) {
      // Lanzar un error si no hay cuerpo en la solicitud con el status 400
      throw { message: 'No hay cuerpo en la solicitud', status: 400 };
    }

    // Obtenemos los datos del body
    const { page } = await req.json();

    const { id: pageId, projectId } = page;

    if (!pageId || !projectId) {
      // Lanzar un error si no hay ID de página
      throw { message: 'El ID de la página es obligatorio', status: 400 };
    }
    
    // Obtenemos el usuario actual
    const user = await currentUser();

    if (!user) {
      // Lanzar un error si no hay usuario autenticado
      throw { message: 'User not authenticated', status: 401 };
    }
    const userId = user.id;

    // Obtenemos el proyecto para generar las secciones
    const project = await getProjectForSections(projectId, userId) as unknown as ProjectExtended;
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
      message: 'Secciones generadas y guardadas correctamente',
      pageId,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {

    // Si el error tiene un status, lo usamos, de lo contrario, usamos 500
    const status = (error as any).status || 500;
    const message = (error as any).message || 'Internal Server Error';
    const pageId = (error as any).pageId || null;

    console.error('Error in POST /api/generate-sections:', message);

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