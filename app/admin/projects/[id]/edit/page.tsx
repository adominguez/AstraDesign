import { NewProjectForm } from "@/components/admin/new-project-form"
import { getProjectBySlug } from "@/lib/projects";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link"

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default async function NewProjectPage({ params }: ProjectDetailPageProps) {
  const user = await currentUser();
  const userId = user?.id as string;

  const project = await getProjectBySlug(params.id, userId)

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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Editar {String(project.name)}</h1>
            <Link href={`/admin/projects/${params.id}`}>Volver a la página del proyecto</Link>
          </div>
          <NewProjectForm />
        </div>
      )}
    </>
  )
}
