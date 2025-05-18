import { currentUser } from "@clerk/nextjs/server";
import { insertNewSectionImage } from '@/lib/sections';
import { updatePageStatus } from '@/lib/pages';
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { generateImageForSection } from "@/lib/sections";

export async function POST(req: Request) {
  try {

    if (!req.body) {
      // Lanzar un error si no hay cuerpo en la solicitud con el status 400
      throw { message: 'No hay cuerpo en la solicitud', status: 400 };
    }

    // Obtenemos los datos del body
    const { section } = await req.json();

    const { id: sectionId, projectId, pageId} = section;
    
    // Obtenemos el usuario actual
    const user = await currentUser();

    if (!user) {
      // Lanzar un error si no hay usuario autenticado
      throw { message: 'User not authenticated', status: 401 };
    }
    const userId = user.id;

    // Generamos la imagen para la sección
    const image = await generateImageForSection(sectionId, userId);

    if (!image) {
      // Lanzar un error si no se pudo generar la imagen
      throw { message: 'No se pudo generar la imagen', status: 500 };
    }

    const image_base64 = image.data[0].b64_json;
    const image_bytes = Buffer.from(image_base64, "base64");

    const imageData = await uploadImageToCloudinary(image_bytes, {
      folder: `${userId}/sections/${sectionId}`,
      public_id: `${userId}-${sectionId}-${Date.now()}`,
      overwrite: true,
      resource_type: 'image',
    }, sectionId);

    await insertNewSectionImage({imageData, sectionId, projectId, pageId});


    return new Response(JSON.stringify({
      message: 'Secciones generadas y guardadas correctamente',
      // pageId,
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