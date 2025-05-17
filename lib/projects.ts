import { turso } from "@/lib/turso"
import { deleteProjectFromCloudinary } from "@/lib/cloudinary"
import { type ProjectDesign, type Project } from "@/types/projects"
import { getPagesByProjectId } from "@/lib/pages"
import { getSectionsByProjectId } from "@/lib/sections"

const insertNewProject = async (project: Project) => {

  if (!project) {
    throw { message: 'Es necesario proporcionar un proyecto', status: 400 }
  }
  if (!project.name || !project.slug || !project.userId) {
    throw { message: 'El nombre del proyecto, el slug y el ID del usuario son obligatorios', status: 400 }
  }
  if (!project.description || !project.projectType) {
    throw { message: 'La descripción y el tipo de proyecto son obligatorios', status: 400 }
  }
  if (typeof project.name !== 'string' || typeof project.slug !== 'string' || typeof project.userId !== 'string') {
    throw { message: 'El nombre del proyecto, el slug y el ID del usuario deben ser cadenas', status: 400 }
  }
  if (typeof project.description !== 'string' || typeof project.projectType !== 'string') {
    throw { message: 'La descripción y el tipo de proyecto deben ser cadenas', status: 400 }
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

  const { name, slug, description, projectType, userId, status } = project;

  await turso.execute(
    `INSERT INTO projects (user_id, name, slug, description, project_type, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, name, slug, description, projectType, status]
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

const insertProjectDesign = async ({ projectId, projectDesign }: { projectId: string; projectDesign: ProjectDesign; }) => {
  if (!projectId || !projectDesign) {
    throw {
      message: 'El ID del proyecto y el diseño son obligatorios',
      status: 400,
      projectId,
    }
  }
  const { primaryColor, secondaryColor, tertiaryColor, accentColor, textColor, typography } = projectDesign;

  await turso.execute(
    `INSERT INTO projects_design (project_id, primary_color, secondary_color, tertiary_color, accent_color, text_color, typography) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [projectId, primaryColor, secondaryColor, tertiaryColor, accentColor, textColor, typography]
  );
  
  return { success: true, projectId, projectDesign };
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

const getBuyerPersonaByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw {
      message: 'El ID del proyecto es obligatorio',
      status: 400,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM buyer_personas WHERE project_id = ?`,
    [projectId]
  );

  return result;
}

const getProjectDesignByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw {
      message: 'El ID del proyecto es obligatorio',
      status: 400,
    }
  }
  const result = await turso.execute(
    `SELECT * FROM projects_design WHERE project_id = ?`,
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
    const { id, name, slug, description, project_type: projectType, status, created_at: created } = result.rows[0]
    if (id) {
      const images = await getImagesByProjectId(id as string);
      const keywords = await getKeywordsByProjectId(id as string);
      const buyerPersona = await getBuyerPersonaByProjectId(id as string);
      const projectDesign = await getProjectDesignByProjectId(id as string);
      const sections = await getSectionsByProjectId(id as string);
      const pages = await getPagesByProjectId(id as string);
      const { rows: projectDesignRows } = projectDesign;
      const { rows: imagesRows } = images;
      const { rows: keywordsRows } = keywords;
      const { rows: buyerPersonaRows } = buyerPersona;
      const imagesData = imagesRows.map(({ id, asset_folder, format, height, public_id, url, width }) => ({ id, assetFolder: asset_folder, format, height, publicId: public_id, url, width }));
      const keywordsData = keywordsRows.map(({ id, keyword }) => ({ id, keyword }));
      const projectData = {
        userId,
        id,
        name,
        description,
        projectType,
        status,
        created,
        slug,
        images: imagesData,
        keywords: keywordsData,
        buyerPersona: buyerPersonaRows.length > 0 ? buyerPersonaRows[0] : null,
        pages: pages.map((page) => ({
          ...page,
          sections: sections.filter((section) => section.pageId === page.id).sort((a, b) => a.sectionOrder - b.sectionOrder)
        })),
        projectDesign: projectDesignRows.length > 0 ? {
          primaryColor: projectDesignRows[0].primary_color,
          secondaryColor: projectDesignRows[0].secondary_color,
          tertiaryColor: projectDesignRows[0].tertiary_color,
          accentColor: projectDesignRows[0].accent_color,
          textColor: projectDesignRows[0].text_color,
          typography: projectDesignRows[0].typography
        } : null
      }
      return projectData;
    }
  }
  return null;
}

const getProjectForSections = async (projectId: string, userId: string) => {
  if (!projectId || !userId) {
    throw {
      message: 'El ID del usuario y el proyecto son obligatorios',
      status: 400,
    }
  }

  const result = await turso.execute(
    `SELECT * FROM projects WHERE id = ? AND user_id = ?`,
    [projectId, userId]
  );

  if (result.rows.length === 0) {
    return null
  }

  if (result.rows.length > 0) {
    const { id, name, slug, description, project_type: projectType, status, created_at: created } = result.rows[0]
    if (id) {
      const images = await getImagesByProjectId(id as string);
      const keywords = await getKeywordsByProjectId(id as string);
      const buyerPersona = await getBuyerPersonaByProjectId(id as string);
      const projectDesign = await getProjectDesignByProjectId(id as string);
      const pages = await getPagesByProjectId(id as string);
      const { rows: projectDesignRows } = projectDesign;
      const { rows: imagesRows } = images;
      const { rows: keywordsRows } = keywords;
      const { rows: buyerPersonaRows } = buyerPersona;
      const imagesData = imagesRows.map(({ id, asset_folder, format, height, public_id, url, width }) => ({ id, assetFolder: asset_folder, format, height, publicId: public_id, url, width }));
      const keywordsData = keywordsRows.map(({ id, keyword }) => ({ id, keyword }));
      const projectData = {
        userId,
        id,
        name,
        description,
        projectType,
        status,
        created,
        slug,
        images: imagesData,
        keywords: keywordsData,
        buyerPersona: buyerPersonaRows.length > 0 ? buyerPersonaRows[0] : null,
        pages,
        projectDesign: projectDesignRows.length > 0 ? {
          primaryColor: projectDesignRows[0].primary_color,
          secondaryColor: projectDesignRows[0].secondary_color,
          tertiaryColor: projectDesignRows[0].tertiary_color,
          accentColor: projectDesignRows[0].accent_color,
          textColor: projectDesignRows[0].text_color,
          typography: projectDesignRows[0].typography
        } : null
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


export { insertNewProject, getProjectForSections, getProjectsByUser, deleteProject, getProjectBySlug, getProjectById, insertNewImages, insertKeywords, updateProjectStatus, insertProjectDesign };