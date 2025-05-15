import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function InfoTooltip({text}: {text: string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-slate-400" />
        </TooltipTrigger>
        <TooltipContent className="bg-slate-950 border-slate-800 text-slate-300">
          <p className="max-w-xs">
            {text}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}