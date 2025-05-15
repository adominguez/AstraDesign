"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Search } from "lucide-react"

export function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: "USR-1234",
      name: "María López",
      email: "maria@ejemplo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ML",
      role: "Admin",
      status: "Activo",
      projects: 3,
      joined: "15/03/2025",
    },
    {
      id: "USR-1235",
      name: "Carlos Ruiz",
      email: "carlos@ejemplo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CR",
      role: "Usuario",
      status: "Activo",
      projects: 1,
      joined: "20/03/2025",
    },
    {
      id: "USR-1236",
      name: "Ana Martínez",
      email: "ana@ejemplo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AM",
      role: "Usuario",
      status: "Activo",
      projects: 2,
      joined: "25/03/2025",
    },
    {
      id: "USR-1237",
      name: "Pedro Sánchez",
      email: "pedro@ejemplo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PS",
      role: "Usuario",
      status: "Inactivo",
      projects: 1,
      joined: "01/04/2025",
    },
    {
      id: "USR-1238",
      name: "Laura Gómez",
      email: "laura@ejemplo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LG",
      role: "Usuario",
      status: "Activo",
      projects: 0,
      joined: "05/04/2025",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <Input
            type="search"
            placeholder="Buscar usuarios..."
            className="w-full bg-slate-900 border-slate-800 pl-8 text-sm text-slate-400 focus-visible:ring-indigo-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-800/50">
              <TableHead className="text-slate-400">Usuario</TableHead>
              <TableHead className="text-slate-400">Rol</TableHead>
              <TableHead className="text-slate-400">Estado</TableHead>
              <TableHead className="text-slate-400">Proyectos</TableHead>
              <TableHead className="text-slate-400">Fecha de Registro</TableHead>
              <TableHead className="text-slate-400 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/50">
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-indigo-700">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "Admin" ? "border-purple-500 text-purple-500" : "border-blue-500 text-blue-500"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.status === "Activo" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.projects}</TableCell>
                <TableCell>{user.joined}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-950 border-slate-800 text-slate-300">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-slate-800" />
                      <DropdownMenuItem className="hover:bg-slate-900">Ver detalles</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-900">Editar usuario</DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-slate-900">Cambiar estado</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-800" />
                      <DropdownMenuItem className="text-red-500 hover:bg-slate-900 hover:text-red-500">
                        Eliminar usuario
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
