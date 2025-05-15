import { deleteProject } from '@/lib/projects';
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
  try {
    const { projectId, slug } = await req.json();
    const user = await currentUser();

    if (!user) {
      // Lanzar un error si no hay usuario autenticado
      throw { message: 'El usuario no está autenticado', status: 401 };
    }

    if (!projectId) {
      throw { message: 'El ID del proyecto es obligatorio', status: 400 };
    }

    const userId = user.id;

    // Eliminar el proyecto de la base de datos y de Cloudinary
    await deleteProject(projectId, userId, slug);

    return new Response(JSON.stringify({ message: 'Project deleted successfully' }), { status: 200 });
  
  } catch (error) {
    // Si el error tiene un status, lo usamos, de lo contrario, usamos 500
    const status = (error as any).status || 500;
    const message = (error as any).message || 'Internal Server Error';

    console.error('Error in DELETE /api/delete-project:', message);

    return new Response(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}