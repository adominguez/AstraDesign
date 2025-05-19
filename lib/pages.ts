import { turso } from "@/lib/turso"
import { type Page } from "@/types/pages"
import { deleteSectionsByProjectId } from "@/lib/sections"

const insertNewPage = async (page: Page) => {
  const { userId, projectId, title, description, slug, pageType, status } = page

  if (!projectId) {
    throw { message: 'Es necesario proporcionar un proyecto', status: 400 }
  }
  if (!title || !slug || !userId) {
    throw { message: 'El nombre de la página, el slug y el ID del usuario son obligatorios', status: 400 }
  }
  if (!description || !pageType) {
    throw { message: 'La descripción y el tipo de página son obligatorios', status: 400 }
  }

  await turso.execute(
    `INSERT INTO pages (user_id, project_id, title, description, slug, page_type, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, projectId, title, description, slug, pageType, status]
  );

  // Obtén el ID del último registro insertado
  const result = await turso.execute(
    `SELECT id FROM pages WHERE user_id = ? AND title = ? AND slug = ?`,
    [userId, title, slug]
  );

  if (result.rows.length === 0) {
    throw {
      message: 'No se pudo recuperar el ID del proyecto insertado',
      status: 500,
    }
  }
  // Asumiendo que el ID es el primer campo del primer registro
  const pageId = result.rows[0].id;
  return { pageId };
}

const updatePageStatus = async ({ pageId, status, message }: { pageId: string; status: string; message?: string; }) => {
  await turso.execute(
    `UPDATE pages SET status = ?, messageError = ? WHERE id = ?`,
    [status, message || null, pageId]
  );
  return { success: true };
}

const getPagesByProjectId = async (projectId: string) => {
  const result = await turso.execute(
    `SELECT * FROM pages WHERE project_id = ?`,
    [projectId]
  );
  if (result.rows.length === 0) {
    return [];
  }
  return result.rows.map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    projectId: row.project_id,
    title: row.title,
    description: row.description,
    slug: row.slug,
    pageType: row.page_type,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

const getPageById = async (id: string) => {
  if (!id) {
    throw { message: 'El ID de la página es obligatorio', status: 400 };
  }
  const result = await turso.execute(
    `SELECT * FROM pages WHERE id = ?`,
    [id]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
}

const getPagesByUserId = async (userId: string) => {
  if (!userId) {
    throw { message: 'El ID del usuario es obligatorio', status: 400 };
  }

  const result = await turso.execute(
    `SELECT * FROM pages WHERE user_id = ?`,
    [userId]
  );
  if (result.rows.length === 0) {
    return [];
  }
  return result.rows.map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    projectId: row.project_id,
    title: row.title,
    description: row.description,
    slug: row.slug,
    pageType: row.page_type,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

const deletePagesByProjectId = async (projectId: string) => {
  if (!projectId) {
    throw { message: 'El ID del proyecto es obligatorio', status: 400 };
  }

  // Eliminar las páginas asociadas al proyecto
  await deleteSectionsByProjectId(projectId);

  await turso.execute(
    `DELETE FROM pages WHERE project_id = ?`,
    [projectId]
  );
  return { success: true };
}

export { insertNewPage, getPagesByUserId, getPagesByProjectId, updatePageStatus, getPageById, deletePagesByProjectId };