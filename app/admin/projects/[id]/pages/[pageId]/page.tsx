import { PageHeader } from "@/components/admin/page-header"
import { SectionEditor } from "@/components/admin/section-editor"

interface PageDetailProps {
  params: {
    projectId: string
    pageId: string
  }
}

export default function PageDetail({ params }: PageDetailProps) {
  const { projectId, pageId } = params

  return (
    <div className="space-y-6">
      <PageHeader projectId={projectId} pageId={pageId} />
      <SectionEditor projectId={projectId} pageId={pageId} />
    </div>
  )
}
