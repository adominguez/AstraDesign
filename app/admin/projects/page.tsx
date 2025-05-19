import { ProjectsTable } from "@/components/admin/projects-table"
import { currentUser } from "@clerk/nextjs/server";
import { getProjectsByUser } from "@/lib/projects"

export default async function ProjectsPage() {

  const user = await currentUser();
  const userId = user?.id as string;

  const projects = await getProjectsByUser(userId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Proyectos</h1>
      </div>
      <ProjectsTable projects={projects} />
    </div>
  )
}
