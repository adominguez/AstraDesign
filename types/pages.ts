import { Section } from '@/types/sections'

export interface Page {
  userId: string
  projectId: string
  title: string
  description: string
  slug: string
  pageType: string
  status: string
}

export interface PageExtended extends Page {
  id: string
  sections: Section[]
  createdAt: string
  updatedAt: string
}