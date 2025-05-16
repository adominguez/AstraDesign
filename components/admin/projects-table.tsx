"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, PlusCircle, Search, Layers, Eye } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import AddButton from "../ui/AddButton"
import StatusBadge from "./status-badge"


export function ProjectsTable({ projects = [] }: { projects: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteProject = (projectId: string, slug: string) => {
    fetch("/api/delete-project", {
      method: "DELETE",
      body: JSON.stringify({ projectId, slug: slug }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Proyecto eliminado correctamente")
        window.location.reload()
      }
    }).catch((error) => {
      console.error("Error al eliminar el proyecto:", error)
      alert("Error al eliminar el proyecto")
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Buscar proyectos..."
            className="w-full bg-slate-900 border-slate-800 pl-8 text-sm text-slate-400 focus-visible:ring-indigo-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/admin/projects/new">
          <AddButton>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </AddButton>
        </Link>
      </div>
      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-900/50 border border-slate-800 rounded-lg backdrop-blur-sm">
          <Layers className="h-12 w-12 text-slate-700 mb-4" />
          <h3 className="text-lg font-medium">No se encontraron proyectos</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            No hay proyectos que coincidan con tu búsqueda. Intenta con otros términos o crea un nuevo proyecto.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
              <div className={`h-1 w-full ${project.status === "OK" ? "bg-green-600" : project.status === "CREATING" ? "bg-amber-600" : "bg-red-600"}`} />
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <Link href={`/admin/projects/${project.slug}`} className="hover:text-indigo-400 transition-colors">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-1">{new Date(project.created).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}</CardDescription>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-300">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-800" />
                      <Link href={`/admin/projects/${project.slug}`}>
                        <DropdownMenuItem className="hover:bg-slate-900">Ver detalles</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="hover:bg-slate-900">Editar proyecto</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-800" />
                      <DropdownMenuItem className="text-red-500 hover:bg-slate-900 hover:text-red-500" onClick={() => handleDeleteProject(project.id, project.slug)}>
                        Eliminar proyecto
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="pb-4">
                  <p className="text-xs text-slate-500">Tipo</p>
                  <p>{project.type}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-slate-500">Páginas</p>
                    <p>{project.pages}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Estado</p>
                    <StatusBadge status={project.status} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/admin/projects/${project.slug}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Proyecto
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          {/* Card para añadir nuevo proyecto */}
          <Link href="/admin/projects/new" className="h-full">
            <Card className="bg-slate-900/30 border-slate-800 border-dashed backdrop-blur-sm overflow-hidden h-full flex flex-col items-center justify-center p-6 hover:bg-slate-900/50 hover:border-indigo-600/50 transition-all cursor-pointer group">
              <div className="rounded-full bg-slate-800/50 p-4 mb-4 group-hover:bg-indigo-600/20">
                <PlusCircle className="h-10 w-10 text-slate-400 group-hover:text-indigo-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-300 group-hover:text-white">Nuevo Proyecto</h3>
              <p className="text-sm text-slate-500 text-center mt-2 group-hover:text-slate-400">
                Crea un nuevo proyecto
              </p>
            </Card>
          </Link>
        </div>
      )}
    </div>
  )
}
