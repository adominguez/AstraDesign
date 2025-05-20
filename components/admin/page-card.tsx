import { PageExtended } from "@/types/pages";
import StatusBadge from "@/components/admin/status-badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  File,
  FileText,
  Home,
  Info,
  InfoIcon,
  Layers,
  Mail,
  ShoppingBag,
} from "lucide-react"
import { ProjectExtended } from "@/types/projects";
import Link from "next/link";
import PageCardSections from "@/components/admin/page-card-sections";
import CompleteImageDialog from "@/components/admin/complete-image-dialog";

interface PageCardProps {
  page: PageExtended
  project: ProjectExtended
}

// Tipo de página con su icono correspondiente
const pageTypeIcons: Record<string, any> = {
  home: Home,
  about: Info,
  services: Layers,
  products: ShoppingBag,
  blog: FileText,
  contact: Mail,
  portfolio: File,
  testimonials: File,
  faq: InfoIcon,
  terms: File,
  privacy: File,
  gallery: File,
  team: File,
  'case-studies': File,
  events: File,
  news: File,
  resources: File,
  careers: File,
  location: File,
  login: File,
  signup: File,
  checkout: File,
  'thank-you': File,
  sitemap: File,
  '404': File,
  'coming-soon': File,
  maintenance: File,
  custom: File,
  other: File,
}

// Función para obtener el icono según el tipo de página
const getPageIcon = (type: string) => {
  const IconComponent = pageTypeIcons[type] || File
  return <IconComponent className="h-5 w-5" />
}

export default function PageCard({page, project}: PageCardProps) {
  return (
    <Card key={page.id} className="bg-slate-950 border-slate-800 overflow-hidden">
      <StatusBadge status={page.status} type="div" />
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-indigo-900/30 text-indigo-400">{getPageIcon(page.pageType)}</div>
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Link href={`/admin/projects/${project.slug}/pages/${page.slug}`} className="cursor-pointer hover:text-indigo-400 transition-colors">
                  {page.title}
                </Link>
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {page.pageType}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" />
            {
              page.sections ? <span>{page.sections.length} secciones</span> : null
            }
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <StatusBadge status={page.status} />
            {
              page.sections && page.sections.some(section => section.images && section.images.length > 0) ? (<CompleteImageDialog page={page} />) : null
            }
          </div>
        </div>
        {
          page.sections ? <PageCardSections sections={page.sections} page={page} /> : null
        }
      </CardContent>
    </Card>
  )
}