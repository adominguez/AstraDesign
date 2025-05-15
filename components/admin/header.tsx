"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Bell, Menu, Search, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden border-slate-800 text-slate-400">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-slate-950 border-slate-800 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="relative flex-1 md:grow-0 md:w-80">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
        <Input
          type="search"
          placeholder="Buscar..."
          className="w-full bg-slate-900 border-slate-800 pl-8 text-sm text-slate-400 focus-visible:ring-indigo-600"
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="outline"
          size="icon"
          className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notificaciones</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900"
            >
              <User className="h-4 w-4" />
              <span className="sr-only">Perfil</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-300">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="hover:bg-slate-900">Perfil</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-900">Configuración</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="hover:bg-slate-900">Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
