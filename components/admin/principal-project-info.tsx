import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectExtended } from "@/types/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

interface PrincipalProjectInfoProps {
  project: ProjectExtended;
  className?: string;
}

export default function PrincipalProjectInfo({ project, className }: PrincipalProjectInfoProps) {
  return (
    <Card className={`${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Información del Proyecto</span>
            {/* <Link href={`/admin/projects/${project.slug}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white cursor-pointer">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
            </Link> */}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Descripción</h3>
            <p className="text-sm">{project.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Tipo</h3>
              <p className="text-sm">{project.projectType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Tipografía</h3>
              <p className="text-sm capitalize">{project.projectDesign.typography}</p>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}