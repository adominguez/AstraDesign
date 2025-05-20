import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from 'next/font/google'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400'
});

export const ibmPlexSansBold = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '700'
});

export const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: '400'
});