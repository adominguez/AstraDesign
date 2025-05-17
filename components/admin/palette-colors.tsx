import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ProjectDesign } from "@/types/projects"
import { Brush } from "lucide-react"

const COLORS = {
  primaryColor: "Color primario",
  secondaryColor: "Color secundario",
  accentColor: "Color de accent",
  tertiaryColor: "Color terciario",
  textColor: "Color de texto",
}

interface PaletteColorsProps {
  projectDesign: ProjectDesign
  className?: string
}

export default function PaletteColors({projectDesign, className}: PaletteColorsProps) {
  return (
    <Card className={`${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Paleta de Colores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="space-y-2">
              {
                Object.keys(projectDesign).filter(item => item !== 'typography').map((color) => (
                  <div className="flex items-center gap-2" key={color}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className="w-6 h-6 rounded-full border border-slate-700"
                            style={{ backgroundColor: projectDesign[color as keyof typeof COLORS] }}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300">
                          <span className="max-w-xs">{projectDesign[color as keyof typeof COLORS]}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-sm">{COLORS[color as keyof typeof COLORS]}</span>
                  </div>
                ))
              }
            </div>
            <div className="ml-auto">
              <Brush className="h-16 w-16 text-slate-700" />
            </div>
          </div>
        </CardContent>
      </Card>
  )
}