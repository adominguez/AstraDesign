import { CloudDownload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Section } from "@/types/sections"
import AddButton from "../ui/AddButton"

interface ImageSectionDialogProps {
  section: Section
}

export default function ImageSectionDialog({section} : ImageSectionDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative rounded-xl overflow-hidden cursor-pointer aspect-[3/2]">
          <img src={section.images[0].url}
              alt={`Imagen de ${section.title}`}
              className="h-full w-full object-cover" />
          <span className="absolute text-center w-full inset-0 bg-black/30 opacity-0 hover:opacity-100 grid place-content-center text-white text-sm transition">
            {section.title}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-3/5">
        <DialogHeader>
          <DialogTitle>{section.title}</DialogTitle>
        </DialogHeader>
        <div className="relative group">
          <img src={section.images[0].url} alt={section.title} className="w-full h-auto rounded-2xl" />
          <a
            href={section.images[0].url.replace("upload/", "upload/fl_attachment/")}
            download
            className="btn-primary"
          >
            <AddButton className="right-4 top-4 absolute flex opacity-0 group-hover:opacity-100 transition-opacity">
              <CloudDownload className="h-4 w-4 " />
              <span>Descargar imagen</span>
            </AddButton>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}