import { BuyerPersona } from "@/types/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

interface BuyerPersonaInfoProps {
  buyerPersona: BuyerPersona;
  className?: string;
}

const BUYER_PERSONA = {
  name: 'Nombre',
  demographics: 'Demografía',
  family: 'Familia',
  work: 'Trabajo',
  behaviors: 'Comportamientos',
  problems: 'Problemas',
  solutions: 'Soluciones',
  barriers: 'Barreras',
}

export default function BuyerPersonaInfo({ buyerPersona, className}: BuyerPersonaInfoProps) {
  return (
    <Card className={`${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Buyer Persona</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-x-4">
          {
            Object.keys(buyerPersona).filter((item) => !item.toLowerCase().includes('id') && !item.toLowerCase().includes('created')).map((bp) => {
              return (
                <div className="flex flex-col mb-3 md:col-span-1" key={bp}>
                  <h3 className="text-sm font-medium text-slate-400 mb-1">{BUYER_PERSONA[bp as keyof typeof BUYER_PERSONA]}</h3>
                  <p className="text-sm capitalize">{buyerPersona[bp as keyof typeof BUYER_PERSONA]}</p>
                </div>
              )
            })
          }
        </CardContent>
      </Card>
  )
}