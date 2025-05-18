import { Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PageExtended } from "@/types/pages"
import AddButton from "../ui/AddButton"

interface CompleteImageDialogProps {
  page: PageExtended
}

export default function CompleteImageDialog({ page }: CompleteImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <AddButton>
          <Eye className="h-4 w-4 " />
          <span>Vista previa</span>
        </AddButton>
      </DialogTrigger>
      <DialogContent className="min-w-3/5">
        <DialogHeader>
          <DialogTitle>{page.title}</DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-col justify-items-start items-start group max-h-[500px] overflow-auto">
          {
            page.sections.map((section) => (
              section.images[0] ? (
                <img
                  key={section.id}
                  src={section.images[0].url}
                  alt={`Imagen de ${section.title}`}
                />
              ) : null
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}