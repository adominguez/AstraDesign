"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Copy,
  Edit,
  Eye,
  File,
  FileText,
  Home,
  Info,
  Layers,
  Mail,
  MoreHorizontal,
  PlusCircle,
  ShoppingBag,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import AddButton from "@/components/ui/AddButton"

interface ProjectPagesProps {
  projectId: string
}

// Tipo de página con su icono correspondiente
const pageTypeIcons: Record<string, any> = {
  home: Home,
  about: Info,
  services: Layers,
  contact: Mail,
  products: ShoppingBag,
  blog: FileText,
  gallery: File,
  other: File,
}

export function ProjectPages({ projectId }: ProjectPagesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPageName, setNewPageName] = useState("")
  const [newPageType, setNewPageType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // En una implementación real, estos datos vendrían de una API o base de datos
  const [pages, setPages] = useState([
    {
      id: "page-1",
      name: "Inicio",
      type: "home",
      status: "Publicada",
      isHomePage: true,
      sections: 3,
      lastEdited: "Hace 2 días",
      views: 245,
    },
    {
      id: "page-2",
      name: "Servicios",
      type: "services",
      status: "Publicada",
      isHomePage: false,
      sections: 4,
      lastEdited: "Hace 3 días",
      views: 120,
    },
    {
      id: "page-3",
      name: "Sobre Nosotros",
      type: "about",
      status: "Borrador",
      isHomePage: false,
      sections: 2,
      lastEdited: "Hace 5 días",
      views: 0,
    },
  ])

  // Plan gratuito: máximo 4 páginas
  const maxPages = 4
  const pagesUsed = pages.length
  const percentUsed = (pagesUsed / maxPages) * 100

  const handleCreatePage = () => {
    if (!newPageName || !newPageType) return

    setIsSubmitting(true)

    // Simulación de creación de página
    setTimeout(() => {
      const newPage = {
        id: `page-${pages.length + 1}`,
        name: newPageName,
        type: newPageType,
        status: "Borrador",
        isHomePage: false,
        sections: 0,
        lastEdited: "Justo ahora",
        views: 0,
      }

      setPages([...pages, newPage])
      setNewPageName("")
      setNewPageType("")
      setIsSubmitting(false)
      setIsDialogOpen(false)
    }, 1000)
  }

  // Función para obtener el icono según el tipo de página
  const getPageIcon = (type: string) => {
    const IconComponent = pageTypeIcons[type] || File
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Páginas del Proyecto</CardTitle>
          <CardDescription>Gestiona las páginas de tu sitio web</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <AddButton disabled={pagesUsed >= maxPages}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Página
            </AddButton>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white">
            <DialogHeader>
              <DialogTitle>Crear Nueva Página</DialogTitle>
              <DialogDescription className="text-slate-400">
                Añade una nueva página a tu proyecto. Podrás personalizarla después.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="page-name" className="flex items-center gap-2">
                  Nombre de la Página
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300">
                        <p className="max-w-xs">Nombre que identificará a la página en el menú de navegación.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="page-name"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="Ej: Servicios, Contacto, Sobre Nosotros..."
                  className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="page-type" className="flex items-center gap-2">
                  Tipo de Página
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300">
                        <p className="max-w-xs">El tipo de página ayudará a la IA a generar contenido más relevante.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select onValueChange={setNewPageType}>
                  <SelectTrigger className="bg-slate-950 border-slate-800 focus:ring-indigo-600">
                    <SelectValue placeholder="Selecciona un tipo de página" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800">
                    <SelectItem value="home">Página de Inicio</SelectItem>
                    <SelectItem value="about">Sobre Nosotros</SelectItem>
                    <SelectItem value="services">Servicios</SelectItem>
                    <SelectItem value="products">Productos</SelectItem>
                    <SelectItem value="contact">Contacto</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="gallery">Galería</SelectItem>
                    <SelectItem value="other">Otra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2">
                  Orden de Navegación
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-slate-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300">
                        <p className="max-w-xs">Posición de la página en el menú de navegación.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select defaultValue="last">
                  <SelectTrigger className="bg-slate-950 border-slate-800 focus:ring-indigo-600">
                    <SelectValue placeholder="Selecciona la posición" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800">
                    <SelectItem value="first">Primera posición</SelectItem>
                    <SelectItem value="after-home">Después de Inicio</SelectItem>
                    <SelectItem value="last">Última posición</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreatePage}
                className="bg-indigo-600 hover:bg-indigo-700"
                disabled={!newPageName || !newPageType || isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear Página"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
              {pages.map((page) => (
                <Card key={page.id} className="bg-slate-950 border-slate-800 overflow-hidden">
                  <div className={`h-1 w-full ${page.status === "Publicada" ? "bg-green-600" : "bg-amber-600"}`}></div>
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-indigo-900/30 text-indigo-400">{getPageIcon(page.type)}</div>
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {page.name}
                            {page.isHomePage && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="border-indigo-500 text-indigo-500 text-xs">
                                      Principal
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300">
                                    <p>Esta es la página principal de tu sitio</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </CardTitle>
                          <CardDescription className="text-xs mt-1">
                            {page.type.charAt(0).toUpperCase() + page.type.slice(1)}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Opciones</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-300">
                          <DropdownMenuItem className="hover:bg-slate-900">
                            <Link
                              href={`/admin/projects/${projectId}/pages/${page.id}`}
                              className="flex items-center w-full"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-slate-900">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Vista previa</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-slate-900">
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicar</span>
                          </DropdownMenuItem>
                          {!page.isHomePage && (
                            <DropdownMenuItem className="hover:bg-slate-900">
                              <Home className="mr-2 h-4 w-4" />
                              <span>Establecer como principal</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator className="bg-slate-800" />
                          <DropdownMenuItem className="text-red-500 hover:bg-slate-900 hover:text-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5" />
                        <span>{page.sections} secciones</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{page.views} visitas</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-2">
                        <Badge
                          variant="outline"
                          className={
                            page.status === "Publicada"
                              ? "border-green-500 text-green-500"
                              : "border-amber-500 text-amber-500"
                          }
                        >
                          {page.status}
                        </Badge>
                        <span className="ml-1">• Editada {page.lastEdited}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Link href={`/admin/projects/${projectId}/pages/${page.id}`} className="w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Secciones
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
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
