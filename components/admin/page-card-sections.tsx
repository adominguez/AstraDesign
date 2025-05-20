'use client'
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/types/sections"
import EmptyZone from "@/components/admin/empty-zone"
import AddButton from "@/components/ui/AddButton"
import { PlusCircle, Loader } from "lucide-react"
import { PageExtended } from "@/types/pages"
import ImageSectionDialog from "@/components/admin/image-section-dialog"

interface PageCardSectionsProps {
  sections: Section[]
  page: PageExtended
}

export default function PageCardSections({ sections = [], page }: PageCardSectionsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateSections = async () => {
    setIsLoading(true)
    // Enviar el formulario a la API
    fetch("/api/generate-sections", {
      method: "POST",
      body: JSON.stringify({ page }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setIsLoading(false)
          // Reload page to show the new sections
          window.location.reload()
        })
      } else {
      }
    }).catch((error) => {
      console.error("Error:", error);
    }).finally(() => {
      setIsLoading(false)
    });
  }

  const handleGenerateImage = async (section: Section) => {
    setIsLoading(true)
    // Enviar el formulario a la API
    fetch("/api/generate-image-section", {
      method: "POST",
      body: JSON.stringify({ section }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setIsLoading(false)
          // Reload page to show the new sections
          window.location.reload()
        })
      } else {
      }
    }).catch((error) => {
      console.error("Error:", error);
    }).finally(() => {
      setIsLoading(false)
    });
  }

  return (
    <div className="mt-3 pt-3 border-t border-slate-800">
      <div className="space-y-2 max-h-80 overflow-auto">
        {sections.length > 0 && (<p className="text-xs font-medium text-slate-400 mb-2">Secciones:</p>) }
        {sections.length ? sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between bg-slate-900 p-2 rounded-md text-xs"
          >
            <div className="flex flex-col w-full gap-2">
              {
                section.images.length > 0 ? (
                  // <img src={section.images[0].url} alt={section.title} className="w-full h-auto" />
                  <ImageSectionDialog section={section} />
                ) : (
                  <>
                  <Badge variant="outline" className="text-xs w-min border-slate-700 text-slate-400">
                    {section.sectionType}
                  </Badge>
                  <div className="flex items-center w-full justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span>{section.title}</span>
                    </div>
                    <AddButton className="mt-2 flex" onClick={() => handleGenerateImage(section)} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader className="animate-spin h-4 w-4" />
                          <span>Generando imagen...</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-4 w-4" />
                          <span>Generar imagen</span>
                        </>
                      )}
                    </AddButton>
                  </div>
                  </>
                )
              }
            </div>
          </div>
        )) : (
          <EmptyZone title="No hay secciones creadas" text="¿Quieres generar las secciones para la página?">
            <AddButton className="mt-2 flex" onClick={handleGenerateSections} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-4 w-4" />
                  <span>Generando secciones...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  <span>Generar secciones</span>
                </>
              )}
            </AddButton>
          </EmptyZone>
        )}
      </div>
    </div>
  )
}