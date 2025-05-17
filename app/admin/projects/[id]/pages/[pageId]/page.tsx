import { PageHeader } from "@/components/admin/page-header"
import { SectionEditor } from "@/components/admin/section-editor"

interface PageDetailProps {
  params: {
    id: string
    pageId: string
  }
}

export default function PageDetail({ params }: PageDetailProps) {
  const { id, pageId } = params

  console.log('PageDetail', { id, pageId })

  return (
    <div className="space-y-6">
      <PageHeader projectId={id} pageId={pageId} />
      <SectionEditor projectId={id} pageId={pageId} />
    </div>
  )
}
