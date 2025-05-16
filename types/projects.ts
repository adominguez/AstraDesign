import { PageExtended } from "@/types/pages"

export interface CommonProject {
  id: string
  project_id: string
}

export interface Image {
  assetFolder: string
  format: string
  height: number
  publicId: string
  url: string
  width: number
}

export interface Keyword {
  keyword: string;
}

export interface BuyerPersona {
  demographics?: string
  family?: string
  work?: string
  behaviors?: string
  problems?: string
  solutions?: string
  barriers?: string
  created_at: string
  name: string // Optional field for the name of the buyer persona
}

export interface ProjectDesign {
  primaryColor: string
  secondaryColor: string
  tertiaryColor: string
  accentColor: string
  textColor: string
  typography: string
}

export interface Project {
  userId: string
  name: string
  description: string
  projectType: string
  status: string
  slug: string
}

export interface ProjectExtended extends Project {
  id: string
  created: string
  images: Image[]
  keywords: Keyword[]
  buyerPersona: BuyerPersona
  projectDesign: ProjectDesign
  pages: PageExtended[]
}