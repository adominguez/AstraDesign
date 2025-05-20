import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { esES } from '@clerk/localizations'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AstraDesign - Creador de diseños de páginas web',
  description: 'Crea el diseño de tu página web de forma rápida y sencilla con AstraDesign. Genera un diseño atractivo y funcional en minutos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="es">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-indexBackground`}>
          <ClerkProvider
              appearance={{
                baseTheme: dark,
              }}
              localization={esES}
            >
              {children}
          </ClerkProvider>
        </body>
      </html>
  )
}