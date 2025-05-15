"use client"

import { cn } from "@/lib/utils"
import { Users, Layers, Settings, Home, Rocket, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Usuarios",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
    },
    {
      label: "Proyectos",
      icon: Layers,
      href: "/admin/projects",
      active: pathname === "/admin/projects",
    },
    {
      label: "Configuración",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
  ]

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-950 border-r border-slate-800">
      <div className="flex h-14 items-center border-b border-slate-800 px-4">
        <Link href="/admin" className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-indigo-400" />
          <span className="font-bold text-xl">SpaceDesign</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-white",
                route.active ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-900",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
              {route.active && (
                <div className="ml-auto">
                  <Star className="h-3 w-3 text-indigo-400" />
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-900 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700">
            <span className="text-xs font-bold">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-slate-400">admin@spacedesign.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
