"use client"

import Link from "next/link"
import { ArrowLeft, MoreHorizontal, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProjectHeaderProps {
  project: {
    id: string
    name: string
    status: string
    type: string
  }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link href="/admin/projects">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Rocket className="h-6 w-6 text-indigo-400" />
            {project.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{project.created}</span>
          <span>•</span>
          <span>{project.type}</span>
          <span>•</span>
          <Badge
            variant="outline"
            className={
              project.status === "OK" ? "border-green-500 text-green-500" : "border-amber-500 text-amber-500"
            }
          >
            {project.status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9 border-slate-800 text-slate-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Más opciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-300">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="hover:bg-slate-900">
              <Link href={`/admin/projects/${project.slug}/edit`}>Editar proyecto</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-900">Duplicar proyecto</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-red-500 hover:bg-slate-900 hover:text-red-500">
              Eliminar proyecto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
