"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AIPromptGeneratorProps {
  sectionType: string
  onGenerateContent: (generatedContent: any) => void
}

export function AIPromptGenerator({ sectionType, onGenerateContent }: AIPromptGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResult, setGenerationResult] = useState<string | null>(null)

  // Sugerencias de prompts según el tipo de sección
  const promptSuggestions: Record<string, string[]> = {
    hero: [
      "Crea un hero para un estudio de arquitectura moderno y minimalista",
      "Genera un hero impactante para un fotógrafo de naturaleza",
      "Diseña un hero para una startup de tecnología espacial",
    ],
    features: [
      "Crea 4 características destacadas para un servicio de diseño web",
      "Genera 3 puntos clave para un producto de software de gestión",
      "Diseña 5 ventajas competitivas para una agencia de marketing",
    ],
    about: [
      "Escribe una historia convincente sobre una empresa familiar con 20 años de experiencia",
      "Genera un texto sobre la misión y visión de una startup ecológica",
      "Crea una narrativa sobre los valores de una consultora profesional",
    ],
  }

  const handleGenerateContent = async () => {
    setIsGenerating(true)
    setGenerationResult(null)

    try {
      // Simulación de llamada a la API de IA
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Contenido generado de ejemplo según el tipo de sección
      let generatedContent: any = {}

      if (sectionType === "hero") {
        generatedContent = {
          title: "Diseños Arquitectónicos que Transforman Espacios",
          subtitle: "Creatividad, Innovación y Sostenibilidad",
          description:
            "Creamos espacios que inspiran y perduran en el tiempo. Nuestro enfoque combina estética moderna con funcionalidad práctica para transformar tu visión en realidad.",
          ctaText: "Descubre Nuestros Proyectos",
          ctaUrl: "#proyectos",
        }
      } else if (sectionType === "features") {
        generatedContent = {
          title: "Nuestros Servicios Destacados",
          description: "Soluciones completas para tus necesidades arquitectónicas",
          features: [
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
        }
      } else if (sectionType === "about") {
        generatedContent = {
          title: "Nuestra Historia",
          description:
            "Con más de 15 años de experiencia en el sector, nos hemos consolidado como un referente en arquitectura sostenible y diseño innovador. Nuestro equipo de profesionales apasionados trabaja incansablemente para crear espacios que no solo cumplen con las expectativas, sino que las superan.",
          image: "/placeholder.svg?height=400&width=600",
        }
      }

      // Mostrar el resultado y notificar al componente padre
      setGenerationResult("¡Contenido generado con éxito!")
      onGenerateContent(generatedContent)
    } catch (error) {
      setGenerationResult("Error al generar el contenido. Inténtalo de nuevo.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="ai-prompt">Prompt para la IA</Label>
        <Textarea
          id="ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe lo que quieres generar para esta sección..."
          className="min-h-[120px] bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
        />
      </div>

      <div className="space-y-2">
        <Label>Sugerencias de prompts</Label>
        <div className="flex flex-wrap gap-2">
          {(promptSuggestions[sectionType] || promptSuggestions.hero).map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="border-slate-800 text-slate-400 hover:text-white"
              onClick={() => setPrompt(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          La IA generará contenido optimizado para SEO basado en tu prompt y el tipo de sección.
        </p>
        <Button
          onClick={handleGenerateContent}
          className="bg-indigo-600 hover:bg-indigo-700"
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generar Contenido
            </>
          )}
        </Button>
      </div>

      {generationResult && (
        <Alert className={generationResult.includes("Error") ? "bg-red-900/20" : "bg-green-900/20"}>
          <AlertDescription>{generationResult}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
