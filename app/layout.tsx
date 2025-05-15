import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedOut,
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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ClerkProvider
              appearance={{
                baseTheme: dark,
              }}
              localization={esES}
            >
              <SignedOut>
                <header className="flex justify-end items-center p-4 gap-4 h-16">
                  <SignInButton mode='modal' />
                  <SignUpButton mode='modal' />
                </header>
              </SignedOut>
              {children}
          </ClerkProvider>
        </body>
      </html>
  )
}