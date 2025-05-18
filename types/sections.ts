export interface GeneratedImage {
  url: string
  width: number
  height: number
  format: string
  assetFolder: string
  publicId: string
  pageId: string
  sectionId: string
  projectId: string
}

export interface Section {
  id: string
  projectId: string
  pageId: string
  title: string
  description: string
  sectionType: string
  images: GeneratedImage[]
  sectionOrder: number
  createdAt: string
}