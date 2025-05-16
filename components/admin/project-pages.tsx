import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { File } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ProjectExtended } from "@/types/projects"
import NewPageFormDialog from "./new-page-form-dialog"
import { type PageExtended } from "@/types/pages"
import PageCard from "@/components/admin/page-card"

interface ProjectPagesProps {
  project: ProjectExtended
}

export function ProjectPages({ project }: ProjectPagesProps) {

  const { pages } = project

  // Plan gratuito: máximo 4 páginas
  const maxPages = 4
  const pagesUsed = pages.length
  const percentUsed = (pagesUsed / maxPages) * 100

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Páginas del Proyecto</CardTitle>
          <CardDescription>Gestiona las páginas de tu sitio web</CardDescription>
        </div>
        <NewPageFormDialog projectId={project.id} pagesUsed={pagesUsed} maxPages={maxPages} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <File className="h-12 w-12 text-slate-700 mb-4" />
              <h3 className="text-lg font-medium">No hay páginas creadas</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-md">
                Crea tu primera página para comenzar a diseñar tu sitio web. Cada página puede tener hasta 5 secciones.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((page: PageExtended) => (
                <PageCard key={page.id} page={page} project={project} />
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Páginas utilizadas</span>
              <span className="font-medium">
                {pagesUsed} de {maxPages}
              </span>
            </div>
            <Progress value={percentUsed} className="h-2 bg-slate-800" />
            <p className="text-xs text-slate-500">
              {pagesUsed >= maxPages
                ? "Has alcanzado el límite de páginas del plan gratuito. Actualiza a un plan premium para crear más páginas."
                : `Puedes crear ${maxPages - pagesUsed} página${maxPages - pagesUsed !== 1 ? "s" : ""} más con tu plan actual.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
