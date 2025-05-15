"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brush, Calendar, Edit, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProjectInfoProps {
  project: {
    id: string
    name: string
    description: string
    type: string
    status: string
    created: string
  }
}

export function ProjectInfo({ project = {} }: ProjectInfoProps) {
  // En una implementación real, estos datos vendrían de una API o base de datos
  const [projectData] = useState({
    name: "Estudio de Arquitectura Cosmos",
    description: "Sitio web para un estudio de arquitectura especializado en diseños modernos y sostenibles.",
    type: "Arquitectura",
    createdAt: "15/03/2025",
    updatedAt: "20/03/2025",
    owner: {
      name: "María López",
      email: "maria@ejemplo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ML",
    },
    buyerPersona:
      "Profesionales entre 30-45 años, con alto poder adquisitivo, interesados en diseño y arquitectura moderna, sostenibilidad y espacios funcionales. Buscan soluciones personalizadas y valoran la estética y calidad.",
    keywords: ["arquitectura", "diseño moderno", "sostenibilidad", "espacios funcionales", "proyectos personalizados"],
    colors: {
      primary: "#3B82F6",
      secondary: "#10B981",
      accent: "#8B5CF6",
    },
    typography: "sans",
  })

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Información del Proyecto</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Editar</span>
            </Button>
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
              <p className="text-sm">{project.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">Tipografía</h3>
              <p className="text-sm capitalize">{projectData.typography}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Propietario</h3>
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={projectData.owner.avatar || "/placeholder.svg"} alt={projectData.owner.name} />
                <AvatarFallback className="bg-indigo-700">{projectData.owner.initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">{projectData.owner.name}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">Fechas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>Creado: {project.created}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span>Actualizado: {projectData.updatedAt}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Buyer Persona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-indigo-400 mt-0.5" />
            <p className="text-sm">{projectData.buyerPersona}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Palabras Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {projectData.keywords.map((keyword, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800"
              >
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Paleta de Colores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border border-slate-700"
                  style={{ backgroundColor: projectData.colors.primary }}
                ></div>
                <span className="text-sm">Primario</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border border-slate-700"
                  style={{ backgroundColor: projectData.colors.secondary }}
                ></div>
                <span className="text-sm">Secundario</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full border border-slate-700"
                  style={{ backgroundColor: projectData.colors.accent }}
                ></div>
                <span className="text-sm">Acento</span>
              </div>
            </div>
            <div className="ml-auto">
              <Brush className="h-16 w-16 text-slate-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
