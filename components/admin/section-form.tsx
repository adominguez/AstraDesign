"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ColorPicker } from "./color-picker"
import { ImageUploader } from "./image-uploader"
import { AIPromptGenerator } from "./ai-prompt-generator"
import { CTAEditor } from "./cta-editor"
import { Code, ImageIcon, Layout, Palette, Sparkles, Type } from "lucide-react"

interface SectionFormProps {
  section: any // En una implementación real, esto tendría un tipo más específico
  onSave: (section: any) => void
  onCancel: () => void
}

export function SectionForm({ section, onSave, onCancel }: SectionFormProps) {
  const [editedSection, setEditedSection] = useState({ ...section })
  const [activeTab, setActiveTab] = useState("content")

  const handleContentChange = (field: string, value: any) => {
    setEditedSection({
      ...editedSection,
      content: {
        ...editedSection.content,
        [field]: value,
      },
    })
  }

  const handleBasicInfoChange = (field: string, value: any) => {
    setEditedSection({
      ...editedSection,
      [field]: value,
    })
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="section-name">Nombre de la Sección</Label>
          <Input
            id="section-name"
            value={editedSection.name}
            onChange={(e) => handleBasicInfoChange("name", e.target.value)}
            className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-950 border border-slate-800 mb-4">
          <TabsTrigger value="content" className="data-[state=active]:bg-slate-800 flex items-center gap-2">
            <Type className="h-4 w-4" />
            Contenido
          </TabsTrigger>
          <TabsTrigger value="design" className="data-[state=active]:bg-slate-800 flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Diseño
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-slate-800 flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Multimedia
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-slate-800 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            IA
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:bg-slate-800 flex items-center gap-2">
            <Code className="h-4 w-4" />
            Avanzado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="section-title">Título</Label>
              <Input
                id="section-title"
                value={editedSection.content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="section-subtitle">Subtítulo</Label>
              <Input
                id="section-subtitle"
                value={editedSection.content.subtitle || ""}
                onChange={(e) => handleContentChange("subtitle", e.target.value)}
                className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="section-description">Descripción</Label>
              <Textarea
                id="section-description"
                value={editedSection.content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                className="min-h-[120px] bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
              />
            </div>

            <Separator className="bg-slate-800 my-2" />

            <CTAEditor
              cta={{
                text: editedSection.content.ctaText || "",
                url: editedSection.content.ctaUrl || "",
              }}
              onChange={(cta) => {
                handleContentChange("ctaText", cta.text)
                handleContentChange("ctaUrl", cta.url)
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Plantilla</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className={`border-slate-800 text-slate-400 hover:text-white justify-start ${
                    editedSection.template === "hero-1" ? "border-indigo-600 bg-slate-800" : ""
                  }`}
                  onClick={() => handleBasicInfoChange("template", "hero-1")}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Diseño 1
                </Button>
                <Button
                  variant="outline"
                  className={`border-slate-800 text-slate-400 hover:text-white justify-start ${
                    editedSection.template === "hero-2" ? "border-indigo-600 bg-slate-800" : ""
                  }`}
                  onClick={() => handleBasicInfoChange("template", "hero-2")}
                >
                  <Layout className="mr-2 h-4 w-4" />
                  Diseño 2
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Color de Fondo</Label>
              <ColorPicker
                color={editedSection.content.backgroundColor || "#1a1a2e"}
                onChange={(color) => handleContentChange("backgroundColor", color)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Color de Texto</Label>
              <ColorPicker
                color={editedSection.content.textColor || "#ffffff"}
                onChange={(color) => handleContentChange("textColor", color)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="full-width">Ancho Completo</Label>
                <p className="text-sm text-slate-500">La sección ocupará todo el ancho de la pantalla</p>
              </div>
              <Switch
                id="full-width"
                checked={editedSection.content.fullWidth || false}
                onCheckedChange={(checked) => handleContentChange("fullWidth", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-overlay">Mostrar Overlay</Label>
                <p className="text-sm text-slate-500">Añade una capa semitransparente sobre la imagen de fondo</p>
              </div>
              <Switch
                id="show-overlay"
                checked={editedSection.content.showOverlay || false}
                onCheckedChange={(checked) => handleContentChange("showOverlay", checked)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Imagen Principal</Label>
              <ImageUploader
                currentImage={editedSection.content.image || ""}
                onImageSelected={(imageUrl) => handleContentChange("image", imageUrl)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Imagen de Fondo</Label>
              <ImageUploader
                currentImage={editedSection.content.backgroundImage || ""}
                onImageSelected={(imageUrl) => handleContentChange("backgroundImage", imageUrl)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="parallax-effect">Efecto Parallax</Label>
                <p className="text-sm text-slate-500">Añade un efecto de profundidad al hacer scroll</p>
              </div>
              <Switch
                id="parallax-effect"
                checked={editedSection.content.parallaxEffect || false}
                onCheckedChange={(checked) => handleContentChange("parallaxEffect", checked)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIPromptGenerator
            sectionType={editedSection.type}
            onGenerateContent={(generatedContent) => {
              // Actualizar el contenido con lo generado por la IA
              setEditedSection({
                ...editedSection,
                content: {
                  ...editedSection.content,
                  ...generatedContent,
                },
              })
            }}
          />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="custom-css">CSS Personalizado</Label>
              <Textarea
                id="custom-css"
                value={editedSection.content.customCSS || ""}
                onChange={(e) => handleContentChange("customCSS", e.target.value)}
                className="min-h-[120px] bg-slate-950 border-slate-800 focus-visible:ring-indigo-600 font-mono"
                placeholder=".section-container { /* tus estilos aquí */ }"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="custom-js">JavaScript Personalizado</Label>
              <Textarea
                id="custom-js"
                value={editedSection.content.customJS || ""}
                onChange={(e) => handleContentChange("customJS", e.target.value)}
                className="min-h-[120px] bg-slate-950 border-slate-800 focus-visible:ring-indigo-600 font-mono"
                placeholder="// Tu código JavaScript aquí"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="animation-enabled">Animaciones</Label>
                <p className="text-sm text-slate-500">Habilitar animaciones en esta sección</p>
              </div>
              <Switch
                id="animation-enabled"
                checked={editedSection.content.animationEnabled || false}
                onCheckedChange={(checked) => handleContentChange("animationEnabled", checked)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} className="border-slate-800 text-slate-400 hover:text-white">
          Cancelar
        </Button>
        <Button onClick={() => onSave(editedSection)} className="bg-indigo-600 hover:bg-indigo-700">
          Guardar Cambios
        </Button>
      </div>
    </div>
  )
}
