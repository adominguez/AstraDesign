import { ProjectHeader } from "@/components/admin/project-header"
import { ProjectInfo } from "@/components/admin/project-info"
import { ProjectPages } from "@/components/admin/project-pages"
import { getProjectBySlug } from "@/lib/projects"
import { ProjectExtended } from "@/types/projects";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

interface ProjectDetailPageProps {
  params: {
    id: string
  },
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const projectId = params.id
  const user = await currentUser();
  const userId = user?.id as string;

  const project = await getProjectBySlug(projectId, userId) as unknown as ProjectExtended;

  return (
    <>
      {!project ? (
        <div className="text-center mt-40">
          <h1 className="text-2xl font-bold">Proyecto no encontrado</h1>
          <p className="text-gray-500">El proyecto al que estás intentando acceder no existe o no tienes permiso para verlo.</p>
          <p className="text-gray-500">Verifica que el enlace sea correcto o vuelve a la página de proyectos.</p>
          <Link href="/admin/projects">Volver a la página de proyectos</Link>
        </div>
      ) : (
        <div className="space-y-6">
          <ProjectHeader project={project} />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-3">
              <ProjectInfo project={project} />
            </div>
            <div className="md:col-span-3">
              <ProjectPages project={project} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
