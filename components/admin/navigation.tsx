'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs";
import { Users, Layers, Settings, Home, Star } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const { isLoaded, user } = useUser()

  if (!isLoaded || !user) return <div className="grid items-start px-2 space-y-1">
    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all">
      <span className="text-sm font-medium text-slate-400">Cargando...</span>
    </div>
  </div>;
  const role = user.publicMetadata.role as string | undefined;
  const isAdmin = role === "admin";

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/admin",
      active: pathname === "/admin",
      hidden: !isAdmin,
    },
    {
      label: "Usuarios",
      icon: Users,
      href: "/admin/users",
      active: pathname === "/admin/users",
      hidden: !isAdmin,
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
      hidden: !isAdmin,
    },
  ]

  return (
    <nav className="grid items-start px-2 space-y-1">
      {routes.map((route) => (
        !route.hidden && (
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
        )
      ))}
    </nav>
  )
}