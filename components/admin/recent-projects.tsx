import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentProjects() {
  const projects = [
    {
      id: "PRJ-1234",
      name: "Estudio de Arquitectura Cosmos",
      owner: "María López",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ML",
      status: "Activo",
      pages: 4,
      date: "Hace 2 horas",
    },
    {
      id: "PRJ-1235",
      name: "Fotógrafo Estelar",
      owner: "Carlos Ruiz",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CR",
      status: "Activo",
      pages: 3,
      date: "Hace 5 horas",
    },
    {
      id: "PRJ-1236",
      name: "Coaching Galáctico",
      owner: "Ana Martínez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AM",
      status: "Pendiente",
      pages: 2,
      date: "Hace 1 día",
    },
    {
      id: "PRJ-1237",
      name: "Tienda Online Nebulosa",
      owner: "Pedro Sánchez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PS",
      status: "Activo",
      pages: 4,
      date: "Hace 2 días",
    },
  ]

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Proyectos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between border-b border-slate-800 pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={project.avatar || "/placeholder.svg"} alt={project.owner} />
                  <AvatarFallback className="bg-indigo-700">{project.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-xs text-slate-500">
                    {project.owner} · {project.id}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant="outline"
                  className={
                    project.status === "Activo" ? "border-green-500 text-green-500" : "border-amber-500 text-amber-500"
                  }
                >
                  {project.status}
                </Badge>
                <div className="text-sm text-slate-500">{project.pages} páginas</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
