'use client'
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { colorPalettes } from "@/lib/constants"
import { Button } from "../ui/button"
import { SparkleIcon, Loader } from "lucide-react"

interface ColorSelectableProps {
  name: string
  projectType: string
  description: string
  field: {
    onChange: (value: string) => void
    value: string
  }
  onChangeColors: (palette: { id: string, primary: string, secondary: string, tertiary: string, accent: string, text: string }) => void
}

export default function ColorSelectable({ name, projectType, description, field, onChangeColors }: ColorSelectableProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeColors = (value: string) => {
    const palette = colorPalettes.find(p => p.id === value)
    if (palette) {
      onChangeColors(palette);
    }
  }

  const handleIAColors = async () => {
    setIsLoading(true);

    await fetch('/api/select-color', {
      method: 'POST',
      body: JSON.stringify({
        prompt: `nombre: ${name}, tipo de proyecto: ${projectType}, descripción: ${description}.`,
      }),
    }).then(response => {
      response.json().then(json => {
        onChangeColors(json);
      });
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <Tabs defaultValue="palette" className="space-y-4">
    <TabsList className="bg-slate-900 border border-slate-800">
      <TabsTrigger value="palette" className="data-[state=active]:bg-slate-800">
        Paleta de colores
      </TabsTrigger>
      <TabsTrigger value="ai" className="data-[state=active]:bg-slate-800">
        Colores Automáticos (IA)
      </TabsTrigger>
    </TabsList>

    <TabsContent value="palette">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Selecciona una paleta de colores</CardTitle>
          <CardDescription>Selecciona una paleta de colores para tu sitio web. Puedes elegir entre varias opciones predefinidas o crear la tuya propia.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            onValueChange={handleChangeColors}
            defaultValue={field.value}
            className="grid grid-cols-2 gap-4 sm:grid-cols-5"
          >

            {
              colorPalettes.map((palette) => (
                <Label
                  key={palette.id}
                  htmlFor={palette.id}
                  className="flex justify-between overflow-hidden rounded-md border-2 h-14 border-slate-800 hover:border-slate-700 has-[:checked]:border-indigo-600 p-1 cursor-pointer"
                >
                  <RadioGroupItem value={palette.id} id={palette.id} className="sr-only" />
                  <div className="flex-1" style={{background: palette.primary}} />
                  <div className="flex-1" style={{background: palette.secondary}} />
                  <div className="flex-1" style={{background: palette.tertiary}} />
                  <div className="flex-1" style={{background: palette.accent}} />
                  <div className="flex-1" style={{background: palette.text}} />                            
                </Label>
              ))
            }
          </RadioGroup>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="ai">
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Colores automáticos (IA)</CardTitle>
          <CardDescription>Deja que la IA seleccione los colores ideales para tu proyecto.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button disabled={isLoading} className="cursor-pointer" onClick={() => handleIAColors()}>
            {
              isLoading ? <Loader className="animate-spin" /> : <SparkleIcon className="mr-2 h-4 w-4" />
            }
            Generar colores automáticos
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
  )
}