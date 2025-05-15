import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { currentUser } from "@clerk/nextjs/server";
import { insertNewProject, insertNewImages, insertKeywords, updateProjectStatus } from '@/lib/projects';
import { createSlug } from '@/lib/utils';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configuration cloudinary
cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

// Función auxiliar para convertir un File a un Buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

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
      const imageUrls = await Promise.all(
        images.map(async (image: File) => {
          const buffer = await fileToBuffer(image); // Convierte el archivo a Buffer
      
          // Usa una promesa explícita para manejar el stream
          return new Promise<{ url: string; width: number; height: number; format: string; assetFolder: string; publicId: string; }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: `projects/${projectId}-${slug}`,
                public_id: `${userId}-${slug}-${Date.now()}`,
                overwrite: true,
                resource_type: 'image',
              },
              (error, result) => {
                if (error) {
                  throw {
                    message: 'Error uploading image',
                    status: 500,
                    projectId: projectId,
                  }
                } else {
                  // Resuelve la promesa con la URL de la imagen 
                  resolve({
                    url: result?.secure_url || '' as string,
                    width: result?.width || 0,
                    height: result?.height || 0,
                    format: result?.format || '',
                    assetFolder: result?.asset_folder || '',
                    publicId: result?.public_id || '',
                  });
                }
              }
            );
      
            // Crea un stream legible desde el buffer y conéctalo al stream de subida
            Readable.from(buffer).pipe(uploadStream);
          });
        })
      );

      // Guardamos las URLs de las imágenes en la base de datos
      await insertNewImages({
        projectId, // Asegúrate de obtener el ID del proyecto creado
        imageUrls
      });
    }

    // Actualizamos el estado del proyecto a "completado"
    await updateProjectStatus({ projectId, status: 'OK' });

    return new Response(JSON.stringify({ form }), {
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