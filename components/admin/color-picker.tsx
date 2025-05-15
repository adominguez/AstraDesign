"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from "lucide-react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

// Colores predefinidos
const presetColors = [
  "#1a1a2e",
  "#16213e",
  "#0f3460",
  "#533483",
  "#1e3a8a",
  "#1e40af",
  "#1d4ed8",
  "#2563eb",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",
  "#7e22ce",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",
  "#be123c",
  "#9f1239",
  "#881337",
  "#701a75",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",
]

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputColor, setInputColor] = useState(color)

  const handleColorChange = (newColor: string) => {
    setInputColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="flex gap-2">
      <div className="h-10 w-10 rounded-md border border-slate-800" style={{ backgroundColor: color }} />
      <Input
        value={inputColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 bg-slate-950 border-slate-800 p-3">
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="h-6 w-6 rounded-md border border-slate-800 flex items-center justify-center"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  handleColorChange(presetColor)
                  setIsOpen(false)
                }}
              >
                {color === presetColor && <Check className="h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
