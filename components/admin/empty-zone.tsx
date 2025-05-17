import { File } from "lucide-react"

interface EmptyZoneProps {
  title: string
  text: string
  children?: React.ReactNode
}

export default function EmptyZone({ title, text, children } : EmptyZoneProps ) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <File className="h-12 w-12 text-slate-700 mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-md">
        {text}
      </p>
      {children}
    </div>
  )
}