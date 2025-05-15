"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface SectionTemplateCardProps {
  template: {
    id: string
    name: string
    thumbnail: string
  }
  onClick: () => void
}

export function SectionTemplateCard({ template, onClick }: SectionTemplateCardProps) {
  return (
    <Card
      className="bg-slate-950 border-slate-800 overflow-hidden cursor-pointer hover:border-indigo-600 transition-colors"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[16/9] bg-slate-900">
          <img
            src={template.thumbnail || "/placeholder.svg"}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
      <CardFooter className="p-3 text-center">
        <p className="text-sm font-medium w-full">{template.name}</p>
      </CardFooter>
    </Card>
  )
}
