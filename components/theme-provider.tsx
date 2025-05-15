"use client"

import {useEffect} from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useUser } from '@clerk/nextjs'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (isLoaded && user) {
      // Llama al endpoint sólo si hay sesión activa
      fetch('/api/sync-user', { method: 'POST' })
    }
  }, [isLoaded, user])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
