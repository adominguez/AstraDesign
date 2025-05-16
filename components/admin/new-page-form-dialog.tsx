'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddButton from "@/components/ui/AddButton"
import { PlusCircle, Loader, Rocket } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import InfoTooltip from "@/components/ui/info-tooltip"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { pagesTypes } from "@/lib/constants"

interface NewPageFormDialogProps {
  projectId: string
  pagesUsed: number
  maxPages: number
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "El título de la página debe tener al menos 3 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción de la página debe tener al menos 10 caracteres.",
  }),
  pageType: z.string({
    required_error: "Por favor selecciona un tipo de página.",
  }),
  projectId: z.string().min(1, {
    message: "El ID del proyecto es obligatorio.",
  }),
})

export default function NewPageFormDialog({ projectId, pagesUsed, maxPages }: NewPageFormDialogProps) {  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Página de inicio",
      pageType: "home",
      description: "Página de inicio del proyecto",
      projectId,
    },
  })

  const composeFormData = (formData: z.infer<typeof formSchema>) => {
    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData] || '';
      body.append(key, value);
    });
  
    body.append('url', window.location.href);
    return body;
  }

  const handleCreatePage = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)

    // Crear un nuevo FormData con los datos de formData
    const body = composeFormData(values);
    // Enviar el formulario a la API
    fetch("/api/new-page", {
      method: "POST",
      body,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setIsLoading(false)
          form.reset()

          // Recargar la página para mostrar la nueva página
          window.location.reload()

        })
      }
    }).catch((error) => {
      console.error("Error:", error);
    }).finally(() => {
      setIsLoading(false)
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
    <DialogTrigger asChild>
      <AddButton disabled={pagesUsed >= maxPages}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nueva Página
      </AddButton>
    </DialogTrigger>
    <DialogContent className="bg-slate-900 border-slate-800 text-white">
      <DialogHeader>
        <DialogTitle>Crear Nueva Página</DialogTitle>
        <DialogDescription className="text-slate-400">
          Añade una nueva página a tu proyecto. Podrás personalizarla después.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreatePage)} className="grid gap-2">
          {/* Título de la página */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Título de la Página
                  <InfoTooltip text="Nombre que identificará a la página en el menú de navegación." />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Estudio de Arquitectura especializado en diseño moderno y sostenible"
                    {...field}
                    className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descripción */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Descripción
                  <InfoTooltip text="Breve descripción de la página. Añade información que te gustaría que apareciese en tu página." />
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej: Información sobre la empresa, presentación de servicios, qué nos diferencia y testimonios de clientes."
                    className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-slate-400">
                  Proporciona una descripción de lo que te gustaría que apareciese en el sitio web.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo de página */}
          <FormField
            control={form.control}
            name="pageType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Tipo de página
                  <InfoTooltip text="Categoría de tu proyecto. Ayuda a la IA a generar contenido más relevante para tu sector." />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-slate-950 border-slate-800 focus:ring-indigo-600">
                      <SelectValue placeholder="Selecciona un tipo de proyecto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-950 border-slate-800 max-h-60">
                    {pagesTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* projectId del proyecto */}
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="hidden"
                    placeholder="Ej: Estudio de Arquitectura especializado en diseño moderno y sostenible"
                    {...field}
                    className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(false)}
          className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 py-5 px-4 cursor-pointer rounded-3xl transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancelar
        </Button>
        <AddButton type="submit" disabled={isLoading} onClick={form.handleSubmit(handleCreatePage)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 cursor-pointer rounded-3xl flex justify-center items-center transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {
            isLoading ? <Loader className="animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />
          }
          {isLoading ? "Creando página..." : "Crear Página"}
        </AddButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}