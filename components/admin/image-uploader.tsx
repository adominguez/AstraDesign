"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

interface ImageUploaderProps {
  currentImage: string
  onImageSelected: (imageUrl: string) => void
}

export function ImageUploader({ currentImage, onImageSelected }: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState("upload")
  const [imageUrl, setImageUrl] = useState(currentImage)

  // Simulación de biblioteca de imágenes
  const libraryImages = [
    "/placeholder.svg?height=200&width=300&text=Imagen+1",
    "/placeholder.svg?height=200&width=300&text=Imagen+2",
    "/placeholder.svg?height=200&width=300&text=Imagen+3",
    "/placeholder.svg?height=200&width=300&text=Imagen+4",
    "/placeholder.svg?height=200&width=300&text=Imagen+5",
    "/placeholder.svg?height=200&width=300&text=Imagen+6",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // En una implementación real, aquí se subiría la imagen a un servidor
      // y se obtendría la URL. Por ahora, simulamos con URL.createObjectURL
      const imageUrl = URL.createObjectURL(e.target.files[0])
      setImageUrl(imageUrl)
      onImageSelected(imageUrl)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  const handleUrlSubmit = () => {
    onImageSelected(imageUrl)
  }

  const handleLibrarySelect = (libraryImageUrl: string) => {
    setImageUrl(libraryImageUrl)
    onImageSelected(libraryImageUrl)
  }

  const clearImage = () => {
    setImageUrl("")
    onImageSelected("")
  }

  return (
    <div className="space-y-4">
      {currentImage && (
        <div className="relative">
          <img
            src={currentImage || "/placeholder.svg"}
            alt="Selected"
            className="w-full h-40 object-cover rounded-md border border-slate-800"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-red-900/80 hover:bg-red-800"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Eliminar imagen</span>
          </Button>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-950 border border-slate-800 mb-4">
          <TabsTrigger value="upload" className="data-[state=active]:bg-slate-800">
            Subir
          </TabsTrigger>
          <TabsTrigger value="url" className="data-[state=active]:bg-slate-800">
            URL
          </TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-slate-800">
            Biblioteca
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-slate-700 bg-slate-950 hover:bg-slate-900"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-slate-500" />
                <p className="mb-2 text-sm text-slate-400">
                  <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                </p>
                <p className="text-xs text-slate-500">PNG, JPG o SVG (MAX. 5MB)</p>
              </div>
              <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          </div>
        </TabsContent>

        <TabsContent value="url" className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="image-url">URL de la imagen</Label>
            <div className="flex gap-2">
              <Input
                id="image-url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={handleUrlChange}
                className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
              />
              <Button onClick={handleUrlSubmit} className="bg-indigo-600 hover:bg-indigo-700">
                Usar
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {libraryImages.map((image, index) => (
              <div
                key={index}
                className={`aspect-[3/2] rounded-md border-2 cursor-pointer overflow-hidden ${
                  imageUrl === image ? "border-indigo-600" : "border-slate-800"
                }`}
                onClick={() => handleLibrarySelect(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Library ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
