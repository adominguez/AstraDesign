"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CTAEditorProps {
  cta: {
    text: string
    url: string
    style?: string
    openInNewTab?: boolean
  }
  onChange: (cta: any) => void
}

export function CTAEditor({ cta, onChange }: CTAEditorProps) {
  const [showCTA, setShowCTA] = useState(Boolean(cta.text || cta.url))

  const handleChange = (field: string, value: any) => {
    onChange({
      ...cta,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="show-cta">Mostrar Botón CTA</Label>
          <p className="text-sm text-slate-500">Añade un botón de llamada a la acción</p>
        </div>
        <Switch
          id="show-cta"
          checked={showCTA}
          onCheckedChange={(checked) => {
            setShowCTA(checked)
            if (!checked) {
              onChange({
                text: "",
                url: "",
              })
            }
          }}
        />
      </div>

      {showCTA && (
        <div className="space-y-4 pl-4 border-l-2 border-slate-800">
          <div className="grid gap-2">
            <Label htmlFor="cta-text">Texto del Botón</Label>
            <Input
              id="cta-text"
              value={cta.text || ""}
              onChange={(e) => handleChange("text", e.target.value)}
              placeholder="Ej: Contáctanos, Saber más..."
              className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cta-url">URL del Botón</Label>
            <Input
              id="cta-url"
              value={cta.url || ""}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder="Ej: /contacto, #servicios..."
              className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cta-style">Estilo del Botón</Label>
            <Select value={cta.style || "primary"} onValueChange={(value) => handleChange("style", value)}>
              <SelectTrigger className="bg-slate-950 border-slate-800 focus:ring-indigo-600">
                <SelectValue placeholder="Selecciona un estilo" />
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-slate-800">
                <SelectItem value="primary">Primario</SelectItem>
                <SelectItem value="secondary">Secundario</SelectItem>
                <SelectItem value="outline">Contorno</SelectItem>
                <SelectItem value="ghost">Fantasma</SelectItem>
                <SelectItem value="link">Enlace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="cta-new-tab">Abrir en nueva pestaña</Label>
            <Switch
              id="cta-new-tab"
              checked={cta.openInNewTab || false}
              onCheckedChange={(checked) => handleChange("openInNewTab", checked)}
            />
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium mb-2">Vista previa:</p>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-md flex items-center justify-center">
              <Button
                className={`${
                  cta.style === "primary"
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : cta.style === "secondary"
                      ? "bg-slate-800 hover:bg-slate-700 text-white"
                      : cta.style === "outline"
                        ? "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                        : cta.style === "ghost"
                          ? "hover:bg-slate-800 text-slate-400 hover:text-white"
                          : "text-indigo-600 hover:underline p-0 h-auto"
                }`}
              >
                {cta.text || "Botón CTA"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
