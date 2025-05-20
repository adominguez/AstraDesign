import { currentUser } from "@clerk/nextjs/server";
import { getProjectsByUser } from "@/lib/projects"
import { ProjectsTable } from "@/components/admin/projects-table"
import { ProjectPages } from "@/components/admin/project-pages"

export default async function AdminDashboard() {

  const user = await currentUser();
  const userId = user?.id as string;

  const projects = await getProjectsByUser(userId);

  console.log(projects)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Panel de Control</h1>
      </div>
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold tracking-tight">Proyectos</h2>
        <ProjectsTable projects={projects} notShowToolbar />
      </div>
      {
        projects.length ? (
          <div className="grid gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Páginas</h2>
            {
              projects.map((project) => (
                <ProjectPages key={project.id} project={project} showProjectTitle />
              ))
            }
          </div>
        ) : null
      }
    </div>
  )
}
