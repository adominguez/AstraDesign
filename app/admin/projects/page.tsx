import { ProjectsTable } from "@/components/admin/projects-table"
import { currentUser } from "@clerk/nextjs/server";
import { getProjectsByUser } from "@/lib/projects"

export default async function ProjectsPage() {

  const user = await currentUser();
  const userId = user?.id as string;

  const result = await getProjectsByUser(userId);

  const projects = result.rows.map(({ id, name, project_type: type, status, pages = 0, slug, created_at: created }) => ({ id, name, type, status, pages, slug, created }))

  console.log('projects', projects)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Proyectos</h1>
      </div>
      <ProjectsTable projects={projects} />
    </div>
  )
}
