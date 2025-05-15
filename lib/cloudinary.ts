import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
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

// Convertimos un listado de ficheros a un array de buffers
async function convertFilesToBuffers(files: File[]) {
  const buffers = await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer()
      return { buffer: Buffer.from(arrayBuffer), mimetype: file.type }
    })
  )
  return buffers
}

// Función para subir un listado de imágenes a Cloudinary
export const uploadImagesToCloudinary = async (images: File[], config: UploadApiOptions | undefined, projectId: string | undefined) => {
  if (!images || images.length === 0) {
    throw {
      message: 'El array de imágenes no puede estar vacío',
      status: 400,
    }
  }

  const buffers = await convertFilesToBuffers(images);

  return await Promise.all(
    buffers.map(async (bufferData) => {
      const buffer = bufferData.buffer; // Use the buffer from the converted data
  
      // Usa una promesa explícita para manejar el stream
      return new Promise<{ url: string; width: number; height: number; format: string; assetFolder: string; publicId: string; }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            ...config,
            public_id: `${config?.public_id}-${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              if (projectId) {
                throw {
                  message: 'Error uploading image',
                  status: 500,
                  projectId: projectId,
                }
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
}

// Función para eliminar un proyecto de Cloudinary
export const deleteProjectFromCloudinary = async (route: string) => {
  if (!route) {
    throw {
      message: 'La ruta del proyecto es obligatoria',
      status: 400,
    }
  }

  // Eliminar el proyecto de Cloudinary
  await cloudinary.api.delete_resources_by_prefix(route);
  await cloudinary.api.delete_folder(route);
}