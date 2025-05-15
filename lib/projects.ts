import { turso } from "@/lib/turso"
import { deleteProjectFromCloudinary } from "@/lib/cloudinary"

const insertNewProject = async (project: { name: any; slug: any; description: any; projectType: any; primaryColor: any; secondaryColor: any; tertiaryColor: any; accentColor: any; textColor: any; typography: any; userId: any; }) => {

  if (!project) {
    throw { message: 'Es necesario proporcionar un proyecto', status: 400 }
  }
  if (!project.name || !project.slug || !project.userId) {
    throw { message: 'El nombre del proyecto, el slug y el ID del usuario son obligatorios', status: 400 }
  }
  if (!project.description || !project.projectType) {
    throw { message: 'La descripción y el tipo de proyecto son obligatorios', status: 400 }
  }
  if (!project.primaryColor || !project.secondaryColor || !project.tertiaryColor || !project.accentColor || !project.textColor || !project.typography) {
    throw { message: 'Los colores y la tipografía del proyecto son obligatorios', status: 400 }
  }
  if (typeof project.name !== 'string' || typeof project.slug !== 'string' || typeof project.userId !== 'string') {
    throw { message: 'El nombre del proyecto, el slug y el ID del usuario deben ser cadenas', status: 400 }
  }
  if (typeof project.description !== 'string' || typeof project.projectType !== 'string') {
    throw { message: 'La descripción y el tipo de proyecto deben ser cadenas', status: 400 }
  }
  if (typeof project.primaryColor !== 'string' || typeof project.secondaryColor !== 'string' || typeof project.tertiaryColor !== 'string' || typeof project.accentColor !== 'string' || typeof project.textColor !== 'string' || typeof project.typography !== 'string') {
    throw { message: 'Los colores y la tipografía del proyecto deben ser cadenas', status: 400 }
  }
  if (project.name.length > 255 || project.slug.length > 255) {
    throw { message: 'El nombre del proyecto y el slug deben tener menos de 255 caracteres', status: 400 }
  }
  if (project.description.length > 1000) {
    throw { message: 'La descripción del proyecto debe tener menos de 1000 caracteres', status: 400 }
  }
  if (project.projectType.length > 255) {
    throw { message: 'El tipo de proyecto debe tener menos de 255 caracteres', status: 400 }
  }
  if (project.primaryColor.length > 7 || project.secondaryColor.length > 7 || project.tertiaryColor.length > 7 || project.accentColor.length > 7 || project.textColor.length > 7) {
    throw { message: 'Los colores del proyecto deben ser códigos hexadecimales válidos', status: 400 }
  }
  if (project.typography.length > 255) {
    throw { message: 'La tipografía del proyecto debe tener menos de 255 caracteres', status: 400 }
  }

  const { name, slug, description, projectType, primaryColor, secondaryColor, tertiaryColor, accentColor, textColor, typography, userId } = project;

  await turso.execute(
    `INSERT INTO projects (user_id, name, slug, description, project_type, primary_color, secondary_color, tertiary_color, accent_color, text_color, typography) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [userId, name, slug, description, projectType, primaryColor, secondaryColor, tertiaryColor, accentColor, textColor, typography]
  );

  // Obtén el ID del último registro insertado
  const result = await turso.execute(
    `SELECT id FROM projects WHERE user_id = ? AND name = ? AND slug = ?`,
    [userId, name, slug]
  );

  if (result.rows.length === 0) {
    throw {
      message: 'No se pudo recuperar el ID del proyecto insertado',
      status: 500,
    }
  }

  // Asumiendo que el ID es el primer campo del primer registro
  const insertedId = result.rows[0].id;
  return { insertedId };
}

const updateProjectStatus = async ({ projectId, status, message }: { projectId: string; status: string; message?: string; }) => {
  await turso.execute(
    `UPDATE projects SET status = ?, messageError = ? WHERE id = ?`,
    [status, message || null, projectId]
  );
  return { success: true };
}

const insertKeywords = async ({ projectId, keywords }: { projectId: string; keywords: string[]; }) => {
  if (!projectId || !keywords) {
    throw {
      message: 'El ID del proyecto y las palabras clave son obligatorios',
      status: 400,
      projectId,
    }
  }
  if (!Array.isArray(keywords)) {
    throw {
      message: 'Las palabras clave deben ser un array',
      status: 400,
      projectId,
    }
  }
  if (keywords.length === 0) {
    throw {
      message: 'El array de palabras clave no puede estar vacío',
      status: 400,
      projectId,
    }
  }
  // Añadir una nueva fila por cada palabra clave
  for (const keyword of keywords) {
    await turso.execute(
      `INSERT INTO keywords (project_id, keyword) VALUES (?, ?)`,
      [projectId, keyword]
    );
  }
}

const getProjectById = async (projectId: string, userId: string) => {
  if (!projectId) {
    throw {
      message: 'El ID del proyecto es obligatorio',
      status: 400,
      projectId,
    }
  }
  if (!userId) {
    throw {
      message: 'El ID del usuario es obligatorio',
      status: 400,
      projectId,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM projects WHERE id = ? AND user_id = ?`,
    [projectId, userId]
  );

  return result;
}

const getImagesByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw {
      message: 'El ID del proyecto es obligatorio',
      status: 400,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM images WHERE project_id = ?`,
    [projectId]
  );

  return result;
}

const getKeywordsByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw {
      message: 'El ID del proyecto es obligatorio',
      status: 400,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM keywords WHERE project_id = ?`,
    [projectId]
  );

  return result;
}

const getProjectBySlug = async (slug: string, userId: string) => {
  if (!slug) {
    return null;
  }
  if (!userId) {
    throw {
      message: 'El ID del usuario es obligatorio',
      status: 400,
      slug,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM projects WHERE slug = ? AND user_id = ?`,
    [slug, userId]
  );
  if (result.rows.length === 0) {
    return null
  }
  if (result.rows.length > 0) {
    const { id, name, slug, description, project_type: type, status, created_at: created } = result.rows[0]
    if (id) {
      const images = await getImagesByProjectId(id as string);
      const keywords = await getKeywordsByProjectId(id as string);
      const { rows: imagesRows } = images;
      const { rows: keywordsRows } = keywords;
      const imagesData = imagesRows.map(({ id, asset_folder, format, height, public_id, url, width }) => ({ id, assetFolder: asset_folder, format, height, publicId: public_id, url, width }));
      const keywordsData = keywordsRows.map(({ id, keyword }) => ({ id, keyword }));
      const projectData = {
        id,
        name,
        description,
        type,
        status,
        created,
        slug,
        images: imagesData,
        keywords: keywordsData,
      }
      return projectData;
    }
  }
  return null;
}

const getProjectsByUser = async (userId: string) => {
  if (!userId) {
    throw {
      message: 'El ID del usuario es obligatorio',
      status: 400,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM projects WHERE user_id = ?`,
    [userId]
  );

  return result;
}

const getAllProjects = async () => {
  const result = await turso.execute(
    `SELECT * FROM projects`
  );

  return result;
}

const insertNewImages = async (images: { projectId: any; imageUrls: any; }) => {
  const { projectId, imageUrls } = images;
  if (!projectId || !imageUrls) {
    throw {
      message: 'El ID del proyecto y las URLs de las imágenes son obligatorias',
      status: 400,
      projectId,
    }
  }
  if (!Array.isArray(imageUrls)) {
    throw {
      message: 'Las URLs de las imágenes deben ser un array',
      status: 400,
      projectId,
    }
  }
  if (imageUrls.length === 0) {
    throw {
      message: 'El array de URLs de imágenes no puede estar vacío',
      status: 400,
      projectId,
    }
  }

  // Añadir una nueva fila por cada URL de imagen
  for (const image of imageUrls) {
    const { assetFolder, format, height, publicId, url, width } = image;
    await turso.execute(
      `INSERT INTO images (project_id, asset_folder, format, height, public_id, url, width) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [projectId, assetFolder, format, height, publicId, url, width]
    );
  }

  return { success: true };
}

const deleteProject = async (projectId: string, userId: string, slug: string) => {
  if (!projectId || !userId || !slug) {
    throw {
      message: 'El ID del proyecto, el ID del usuario y el slug son obligatorios',
      status: 400,
    }
  }

  // Obtener las imágenes asociadas al proyecto
  const images = await getImagesByProjectId(projectId);
  const { rows: imagesRows } = images;

  if (imagesRows.length > 0) {
    // Eliminar las imágenes asociadas al proyecto
    await turso.execute(
      `DELETE FROM images WHERE project_id = ?`,
      [projectId]
    );
    
    // Eliminar el proyecto de Cloudinary
    await deleteProjectFromCloudinary(`${userId}/projects/${projectId}-${slug}`);
  }

  // Eliminar las palabras clave asociadas al proyecto
  await turso.execute(
    `DELETE FROM keywords WHERE project_id = ?`,
    [projectId]
  );

  // Eliminar el proyecto de la base de datos
  await turso.execute(
    `DELETE FROM projects WHERE id = ?`,
    [projectId]
  );
}


export { insertNewProject, getProjectsByUser, deleteProject, getProjectBySlug, getProjectById, insertNewImages, insertKeywords, updateProjectStatus };