"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="general" className="data-[state=active]:bg-slate-800">
            General
          </TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:bg-slate-800">
            IA
          </TabsTrigger>
          <TabsTrigger value="limits" className="data-[state=active]:bg-slate-800">
            Límites
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-800">
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes generales de la plataforma.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Nombre del Sitio</Label>
                <Input id="site-name" defaultValue="SpaceDesign IA" className="bg-slate-950 border-slate-800" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Descripción</Label>
                <Textarea
                  id="site-description"
                  defaultValue="Plataforma para crear diseños web utilizando IA de forma fácil y sencilla."
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email de Contacto</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="contacto@spacedesign.com"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Modo Mantenimiento</Label>
                  <p className="text-sm text-slate-500">Activa el modo mantenimiento para realizar actualizaciones.</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 px-6 py-4">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Configuración de IA</CardTitle>
              <CardDescription>Configura los parámetros de los modelos de IA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="ai-model">Modelo de IA</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger className="bg-slate-950 border-slate-800">
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800">
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image-model">Modelo de Generación de Imágenes</Label>
                <Select defaultValue="dalle-3">
                  <SelectTrigger className="bg-slate-950 border-slate-800">
                    <SelectValue placeholder="Selecciona un modelo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-950 border-slate-800">
                    <SelectItem value="dalle-3">DALL-E 3</SelectItem>
                    <SelectItem value="midjourney">Midjourney</SelectItem>
                    <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt-template">Plantilla de Prompt</Label>
                <Textarea
                  id="prompt-template"
                  defaultValue="Crea una sección web para un sitio de [TIPO_NEGOCIO] que muestre [CONTENIDO] y que esté optimizado para SEO con las palabras clave [KEYWORDS]."
                  className="bg-slate-950 border-slate-800"
                  rows={4}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="seo-optimization">Optimización SEO Automática</Label>
                  <p className="text-sm text-slate-500">Optimiza automáticamente el contenido para SEO.</p>
                </div>
                <Switch id="seo-optimization" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 px-6 py-4">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="limits">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Límites del Plan Gratuito</CardTitle>
              <CardDescription>Configura los límites para usuarios del plan gratuito.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="max-projects">Máximo de Proyectos</Label>
                <Input id="max-projects" type="number" defaultValue="3" className="bg-slate-950 border-slate-800" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-pages">Máximo de Páginas por Proyecto</Label>
                <Input id="max-pages" type="number" defaultValue="4" className="bg-slate-950 border-slate-800" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-sections">Máximo de Secciones por Página</Label>
                <Input id="max-sections" type="number" defaultValue="5" className="bg-slate-950 border-slate-800" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-generations">Generaciones de IA Diarias</Label>
                <Input id="max-generations" type="number" defaultValue="20" className="bg-slate-950 border-slate-800" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 px-6 py-4">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
              <CardDescription>Configura las notificaciones del sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                  <p className="text-sm text-slate-500">Enviar notificaciones por email a los usuarios.</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-user-notifications">Nuevos Usuarios</Label>
                  <p className="text-sm text-slate-500">Notificar cuando se registre un nuevo usuario.</p>
                </div>
                <Switch id="new-user-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-project-notifications">Nuevos Proyectos</Label>
                  <p className="text-sm text-slate-500">Notificar cuando se cree un nuevo proyecto.</p>
                </div>
                <Switch id="new-project-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-notifications">Alertas del Sistema</Label>
                  <p className="text-sm text-slate-500">Notificar sobre eventos del sistema y mantenimiento.</p>
                </div>
                <Switch id="system-notifications" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-800 px-6 py-4">
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
