"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Copy,
  Edit,
  Eye,
  Grid3x3,
  ImageIcon,
  LayoutGrid,
  Layers,
  MessageSquare,
  MoveVertical,
  PlusCircle,
  Sparkles,
  Trash2,
} from "lucide-react"
import { SectionForm } from "./section-form"
import { SectionTemplateCard } from "./section-template-card"

interface SectionEditorProps {
  projectId: string
  pageId: string
}

// Tipos de secciones disponibles
const sectionTypes = [
  { id: "hero", name: "Hero", icon: Layers },
  { id: "features", name: "Características", icon: Grid3x3 },
  { id: "about", name: "Sobre Nosotros", icon: MessageSquare },
  { id: "services", name: "Servicios", icon: LayoutGrid },
  { id: "gallery", name: "Galería", icon: ImageIcon },
  { id: "testimonials", name: "Testimonios", icon: MessageSquare },
  { id: "contact", name: "Contacto", icon: MessageSquare },
  { id: "cta", name: "Llamada a la Acción", icon: Sparkles },
]

// Plantillas predefinidas para cada tipo de sección
const sectionTemplates = {
  hero: [
    { id: "hero-1", name: "Hero con imagen", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "hero-2", name: "Hero con video", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "hero-3", name: "Hero con fondo de color", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  features: [
    { id: "features-1", name: "Características en grid", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "features-2", name: "Características con iconos", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  about: [
    { id: "about-1", name: "Sobre nosotros con imagen", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "about-2", name: "Historia de la empresa", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  services: [
    { id: "services-1", name: "Servicios en cards", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "services-2", name: "Servicios con precios", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  gallery: [
    { id: "gallery-1", name: "Galería en grid", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "gallery-2", name: "Galería con lightbox", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  testimonials: [
    { id: "testimonials-1", name: "Testimonios en slider", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "testimonials-2", name: "Testimonios con avatar", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  contact: [
    { id: "contact-1", name: "Formulario de contacto", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "contact-2", name: "Contacto con mapa", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
  cta: [
    { id: "cta-1", name: "CTA simple", thumbnail: "/placeholder.svg?height=100&width=200" },
    { id: "cta-2", name: "CTA con imagen", thumbnail: "/placeholder.svg?height=100&width=200" },
  ],
}

export function SectionEditor({ projectId, pageId }: SectionEditorProps) {
  const [selectedSectionType, setSelectedSectionType] = useState("hero")
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false)
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false)
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)

  // En una implementación real, estos datos vendrían de una API o base de datos
  const [sections, setSections] = useState([
    {
      id: "section-1",
      name: "Hero Principal",
      type: "hero",
      template: "hero-1",
      content: {
        title: "Diseños arquitectónicos innovadores y sostenibles",
        subtitle: "Transformamos espacios con creatividad y funcionalidad",
        description:
          "Somos un estudio de arquitectura especializado en diseños modernos y sostenibles. Creamos espacios que inspiran y perduran en el tiempo.",
        ctaText: "Conoce nuestros proyectos",
        ctaUrl: "#proyectos",
        image: "/placeholder.svg?height=400&width=600",
        backgroundColor: "#1a1a2e",
      },
    },
    {
      id: "section-2",
      name: "Nuestros Servicios",
      type: "services",
      template: "services-1",
      content: {
        title: "Servicios Profesionales",
        description: "Ofrecemos soluciones arquitectónicas completas para todo tipo de proyectos.",
        services: [
          {
            title: "Diseño Arquitectónico",
            description: "Creamos diseños únicos adaptados a tus necesidades y preferencias.",
            icon: "penTool",
          },
          {
            title: "Planificación Urbana",
            description: "Desarrollamos proyectos urbanos sostenibles y funcionales.",
            icon: "map",
          },
          {
            title: "Interiorismo",
            description: "Diseñamos espacios interiores que maximizan la funcionalidad y estética.",
            icon: "home",
          },
        ],
      },
    },
  ])

  // Plan gratuito: máximo 5 secciones por página
  const maxSections = 5
  const sectionsUsed = sections.length
  const percentUsed = (sectionsUsed / maxSections) * 100

  const handleAddSection = (templateId: string) => {
    // Simulación de añadir una nueva sección
    const templateType = selectedSectionType
    const newSection = {
      id: `section-${sections.length + 1}`,
      name: `Nueva sección ${sectionTypes.find((type) => type.id === templateType)?.name}`,
      type: templateType,
      template: templateId,
      content: {
        title: "Título de la sección",
        description: "Descripción de la sección",
      },
    }

    setSections([...sections, newSection])
    setIsAddSectionDialogOpen(false)
  }

  const handleEditSection = (sectionId: string) => {
    setEditingSectionId(sectionId)
    setIsEditSectionDialogOpen(true)
  }

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  const handleDuplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find((section) => section.id === sectionId)
    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: `section-${sections.length + 1}`,
        name: `${sectionToDuplicate.name} (copia)`,
      }
      setSections([...sections, duplicatedSection])
    }
  }

  const handleMoveSection = (sectionId: string, direction: "up" | "down") => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId)
    if (sectionIndex === -1) return

    const newSections = [...sections]

    if (direction === "up" && sectionIndex > 0) {
      // Intercambiar con la sección anterior
      ;[newSections[sectionIndex - 1], newSections[sectionIndex]] = [
        newSections[sectionIndex],
        newSections[sectionIndex - 1],
      ]
    } else if (direction === "down" && sectionIndex < sections.length - 1) {
      // Intercambiar con la sección siguiente
      ;[newSections[sectionIndex], newSections[sectionIndex + 1]] = [
        newSections[sectionIndex + 1],
        newSections[sectionIndex],
      ]
    }

    setSections(newSections)
  }

  const onDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return
    }

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Secciones de la Página</h2>
        <Dialog open={isAddSectionDialogOpen} onOpenChange={setIsAddSectionDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700" disabled={sectionsUsed >= maxSections}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Sección
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Añadir Nueva Sección</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Tabs defaultValue="hero" onValueChange={setSelectedSectionType} value={selectedSectionType}>
                <TabsList className="bg-slate-950 border border-slate-800 mb-4 flex flex-wrap h-auto p-1">
                  {sectionTypes.map((type) => (
                    <TabsTrigger
                      key={type.id}
                      value={type.id}
                      className="data-[state=active]:bg-slate-800 flex items-center gap-2 py-2"
                    >
                      <type.icon className="h-4 w-4" />
                      {type.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {sectionTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id} className="mt-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {sectionTemplates[type.id as keyof typeof sectionTemplates].map((template) => (
                        <SectionTemplateCard
                          key={template.id}
                          template={template}
                          onClick={() => handleAddSection(template.id)}
                        />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sections.length === 0 ? (
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-slate-700 mb-4" />
            <h3 className="text-lg font-medium">No hay secciones creadas</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md">
              Añade secciones para comenzar a diseñar tu página. Puedes elegir entre diferentes tipos de secciones y
              personalizarlas.
            </p>
            <Button
              className="mt-6 bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setIsAddSectionDialogOpen(true)}
              disabled={sectionsUsed >= maxSections}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Añadir Primera Sección
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} className="group">
                        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm relative">
                          <div
                            {...provided.dragHandleProps}
                            className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoveVertical className="h-5 w-5 text-slate-600" />
                          </div>
                          <CardHeader className="pb-2 pl-10">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg flex items-center gap-2">{section.name}</CardTitle>
                                <CardDescription>
                                  {sectionTypes.find((type) => type.id === section.type)?.name} - Template:{" "}
                                  {section.template}
                                </CardDescription>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-400 hover:text-white"
                                  onClick={() => handleMoveSection(section.id, "up")}
                                  disabled={index === 0}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                  <span className="sr-only">Mover arriba</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-400 hover:text-white"
                                  onClick={() => handleMoveSection(section.id, "down")}
                                  disabled={index === sections.length - 1}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                  <span className="sr-only">Mover abajo</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-400 hover:text-white"
                                  onClick={() => handleEditSection(section.id)}
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Editar</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-400 hover:text-white"
                                  onClick={() => handleDuplicateSection(section.id)}
                                  disabled={sectionsUsed >= maxSections}
                                >
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Duplicar</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-slate-400 hover:text-red-400"
                                  onClick={() => handleDeleteSection(section.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Eliminar</span>
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-slate-950 border border-slate-800 rounded-md p-4 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-24 h-16 bg-slate-900 rounded-md overflow-hidden">
                                  <img
                                    src={section.content.image || "/placeholder.svg?height=64&width=96"}
                                    alt={section.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{section.content.title}</h4>
                                  <p className="text-sm text-slate-400 line-clamp-1">{section.content.description}</p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-800 text-slate-400 hover:text-white"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Vista Previa
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Secciones utilizadas</span>
          <span className="font-medium">
            {sectionsUsed} de {maxSections}
          </span>
        </div>
        <Progress value={percentUsed} className="h-2 bg-slate-800">
          <div
            className={`h-full ${percentUsed >= 75 ? "bg-amber-600" : "bg-indigo-600"}`}
            style={{ width: `${percentUsed}%` }}
          />
        </Progress>
        <p className="text-xs text-slate-500">
          {sectionsUsed >= maxSections
            ? "Has alcanzado el límite de secciones del plan gratuito. Actualiza a un plan premium para crear más secciones."
            : `Puedes crear ${maxSections - sectionsUsed} sección${
                maxSections - sectionsUsed !== 1 ? "es" : ""
              } más con tu plan actual.`}
        </p>
      </div>

      <Dialog open={isEditSectionDialogOpen} onOpenChange={setIsEditSectionDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Editar Sección</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-120px)]">
            {editingSectionId && (
              <SectionForm
                section={sections.find((section) => section.id === editingSectionId)!}
                onSave={(updatedSection) => {
                  setSections(sections.map((section) => (section.id === editingSectionId ? updatedSection : section)))
                  setIsEditSectionDialogOpen(false)
                }}
                onCancel={() => setIsEditSectionDialogOpen(false)}
              />
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
