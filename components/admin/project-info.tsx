import { ProjectExtended } from "@/types/projects"
import PaletteColors from "@/components/admin/palette-colors"
import BuyerPersonaInfo from "@/components/admin/buyer-persona-info"
import KeywordsInfo from "@/components/admin/keywords-info"
import PrincipalProjectInfo from "@/components/admin/principal-project-info"

interface ProjectInfoProps {
  project: ProjectExtended
}

export function ProjectInfo({ project }: ProjectInfoProps) {

  return (
    <div className="space-y-6 grid lg:grid-cols-3 gap-x-4">
      <PrincipalProjectInfo project={project} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm lg:col-span-1" />
      <KeywordsInfo keywords={project.keywords} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm lg:col-span-1" />
      <PaletteColors projectDesign={project.projectDesign} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm lg:col-span-1" />
      {
        project.buyerPersona && (
          <BuyerPersonaInfo buyerPersona={project.buyerPersona} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm lg:col-span-3" />
        )
      }
    </div>
  )
}
