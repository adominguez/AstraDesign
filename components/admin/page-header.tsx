"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, FileText, MoreHorizontal, Settings } from "lucide-react"
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

interface PageHeaderProps {
  projectId: string
  pageId: string
}

export function PageHeader({ projectId, pageId }: PageHeaderProps) {
  // En una implementación real, estos datos vendrían de una API o base de datos
  const [page] = useState({
    id: pageId,
    name: "Servicios",
    type: "services",
    status: "Borrador",
    projectName: "Estudio de Arquitectura Cosmos",
  })

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link href={`/admin/projects/${projectId}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-400" />
            {page.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span>{page.projectName}</span>
          <span>•</span>
          <span>Página {page.type}</span>
          <span>•</span>
          <Badge
            variant="outline"
            className={
              page.status === "Publicada" ? "border-green-500 text-green-500" : "border-amber-500 text-amber-500"
            }
          >
            {page.status}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="border-slate-800 text-slate-400 hover:text-white">
          <Eye className="mr-2 h-4 w-4" />
          Vista Previa
        </Button>
        <Button variant="outline" size="sm" className="border-slate-800 text-slate-400 hover:text-white">
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
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
            <DropdownMenuItem className="hover:bg-slate-900">Duplicar página</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-900">Exportar HTML</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-900">Cambiar estado</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="text-red-500 hover:bg-slate-900 hover:text-red-500">
              Eliminar página
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
