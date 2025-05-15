import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { currentUser } from "@clerk/nextjs/server";
import { insertNewProject, insertNewImages, insertKeywords, updateProjectStatus } from '@/lib/projects';
import { createSlug } from '@/lib/utils';
import { uploadImagesToCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {

    if (!req.body) {
      // Lanzar un error si no hay cuerpo en la solicitud con el status 400
      throw { message: 'No body in request', status: 400 };
    }

    // Obtenemos los datos del formulario
    const form = await req.formData();
    const name = form.get('name')?.toString() ?? '';
    const description = form.get('description')?.toString() ?? '';
    const projectType = form.get('projectType')?.toString() ?? '';
    const keywords = form.getAll('keywords') as string[];
    const primaryColor = form.get('primaryColor')?.toString() ?? '';
    const secondaryColor = form.get('secondaryColor')?.toString() ?? '';
    const tertiaryColor = form.get('tertiaryColor')?.toString() ?? '';
    const accentColor = form.get('accentColor')?.toString() ?? '';
    const textColor = form.get('textColor')?.toString() ?? '';
    const typography = form.get('typography')?.toString() ?? '';
    const images = form.getAll('images') as File[];
    
    // Obtenemos el usuario actual
    const user = await currentUser();

    if (!user) {
      // Lanzar un error si no hay usuario autenticado
      throw { message: 'User not authenticated', status: 401 };
    }
    const userId = user.id;
    const slug = createSlug(name);

    // Añadimos el proyecto a la base de datos
    const { insertedId } = await insertNewProject({
      name,
      slug,
      description,
      projectType,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      accentColor,
      textColor,
      typography,
      userId
    });

    const projectId = insertedId as string;

    if (!projectId) {
      // Lanzar un error si no se ha insertado el proyecto
      throw { message: 'Failed to insert project', status: 500 };
    }

    // Guardamos las palabras clave en la base de datos
    if (keywords && keywords.length > 0) {
      await insertKeywords({
        projectId,
        keywords: keywords.map((keyword: string) => keyword.toString())
      });
    }

    // Guardamos las imágenes en Cloudinary
    if (images && images.length > 0) {
      const imageUrls = await uploadImagesToCloudinary(
        images,
        {
          folder: `${userId}/projects/${projectId}-${slug}`,
          public_id: `${userId}-${slug}`,
          overwrite: true,
          resource_type: 'image',
        }, projectId
      );

      // Guardamos las URLs de las imágenes en la base de datos
      await insertNewImages({
        projectId, // Asegúrate de obtener el ID del proyecto creado
        imageUrls
      });
    }

    // Actualizamos el estado del proyecto a "completado"
    await updateProjectStatus({ projectId, status: 'OK' });

    return new Response(JSON.stringify({
      message: 'Project created successfully',
      projectId,
      slug,
      name,
      description,
      projectType,
      keywords,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      accentColor,
      textColor,
      typography
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {

    // Si el error tiene un status, lo usamos, de lo contrario, usamos 500
    const status = (error as any).status || 500;
    const message = (error as any).message || 'Internal Server Error';
    const projectId = (error as any).projectId || null;

    console.error('Error in POST /api/new-project:', message);

    // Actualizamos el status del proyecto a "error"
    if (projectId) {
      await updateProjectStatus({ projectId, status: 'ERROR', message: `${status}: ${message}` });
    }

    return new Response(JSON.stringify({ message }), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}