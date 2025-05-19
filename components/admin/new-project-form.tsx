"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Rocket, Upload, X, SparkleIcon, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { projectsTypes, typographyStyles } from "@/lib/constants"
import InfoTooltip from "@/components/ui/info-tooltip"
import ColorSelectable from "./color-selectable"
import AddButton from "../ui/AddButton"

// Reemplazar la función completa para asegurar que la estructura JSX sea correcta
export function NewProjectForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingKeyword, setIsLoadingKeyword] = useState(false)
  const [keywordInput, setKeywordInput] = useState("")
  // const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const formSchema = z.object({
    name: z.string().min(3, {
      message: "El nombre del proyecto debe tener al menos 3 caracteres.",
    }),
    description: z.string().min(10, {
      message: "La descripción del proyecto debe tener al menos 10 caracteres.",
    }),
    projectType: z.string({
      required_error: "Por favor selecciona un tipo de proyecto.",
    }),
    keywords: z.array(z.string()).min(1, {
      message: "Debes añadir al menos una palabra clave.",
    }),
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    tertiaryColor: z.string().optional(),
    accentColor: z.string().optional(),
    textColor: z.string().optional(),
    typography: z.enum(["serif", "sans-serif", "monospace", "display", "handwritten"], ),
    images: z.any().optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      projectType: "pagina-corporativa",
      description: "",
      keywords: [],
      primaryColor: "#1b263b",
      secondaryColor: "#415a77",
      tertiaryColor: "#778da9",
      accentColor: "#1a535c",
      textColor: "#ffffff",
      typography: "sans-serif",
      images: undefined,
    },
  })

  const composeFormData = (formData: z.infer<typeof formSchema>) => {
    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData] || ''; // Provide a default value of an empty string if formData[key] is undefined
      if (Array.isArray(value)) {
        value.forEach((file) => {
          body.append(key, file);
        });
      } else {
        const valueString = typeof value === 'boolean' ? value.toString() : value; // Convert boolean value to string
        body.append(key, valueString);
      }
    });
  
    body.append('url', window.location.href);
  
    return body;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true) // set loading state to true
    // Crear un nuevo FormData con los datos de formData
    const body = composeFormData(values);
    // Enviar el formulario a la API
    fetch("/api/new-project", {
      method: "POST",
      body,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data)
          const { slug } = data
          setIsLoading(false)
          form.reset()
          // setUploadedImages([])

          // Redireccionar a la página del proyecto
          window.location.href = `/admin/projects/${slug}`

        })
      }
    }).catch((error) => {
      console.error("Error:", error);
    }).finally(() => {
      setIsLoading(false)
    });
  }

  const addKeyword = () => {
    const keywords = form.getValues("keywords")
    if ((keywordInput.trim() !== "" && !keywords.includes(keywordInput.trim()))) {
      const keywordToAdd = keywordInput.trim()
      const newKeywords = Array.from(new Set([...keywords, keywordToAdd]))
      form.setValue("keywords", newKeywords)
      setKeywordInput("")
    }
  }

  const addKeywords = (newKeywords: string[]) => {
    const keywords = form.getValues("keywords")
    const keywordsToAdd = Array.from(new Set([...keywords, ...newKeywords.map((k) => k.trim())]))
    form.setValue("keywords", keywordsToAdd)
  }

  const removeKeyword = (keyword: string) => {
    const keywords = form.getValues("keywords")
    const newKeywords = keywords.filter((k) => k !== keyword)
    form.setValue("keywords", newKeywords)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addKeyword()
    }
  }

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const newFiles = Array.from(e.target.files)
  //     setUploadedImages((prev) => [...prev, ...newFiles])
  //   }
  // }

  // const removeImage = (index: number) => {
  //   setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  // }

  // useEffect(() => {
  //   form.setValue('images', uploadedImages);
  // }, [uploadedImages])

  const onChangeColors = (colors: { primary: string | undefined; secondary: string | undefined; tertiary: string | undefined; accent: string | undefined; text: string | undefined }) => {
    form.setValue("primaryColor", colors.primary)
    form.setValue("secondaryColor", colors.secondary)
    form.setValue("tertiaryColor", colors.tertiary)
    form.setValue("accentColor", colors.accent)
    form.setValue("textColor", colors.text)
  }

  const handleKeywords = async () => {
    
    setIsLoadingKeyword(true)

    await fetch('/api/generate-keywords', {
      method: 'POST',
      body: JSON.stringify({
        prompt: `nombre: ${form.getValues('name')}, tipo de proyecto: ${form.getValues('projectType')}, descripción: ${form.getValues('description')}.`,
      }),
    }).then(response => {
      response.json().then(json => {
        addKeywords(json.keywords);
      });
    }).finally(() => {
      setIsLoadingKeyword(false)
    });
  }

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-indigo-400" />
          Información del Proyecto
        </CardTitle>
        <CardDescription>Completa la información para crear tu nuevo proyecto de diseño web.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* Nombre del proyecto */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Nombre del Proyecto
                    <InfoTooltip text="Nombre identificativo para tu proyecto. Será visible en el listado de proyectos." />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Mi Estudio de Arquitectura"
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
                    <InfoTooltip text="Breve descripción de tu proyecto. añade a que se dedica tu web, donde está localizado, que ofrece... Esto ayudará a crear mejor el contenido y el diseño de tu sitio web." />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ej: Estudio de arquitectura especializado en diseño moderno y sostenible en Murcia."
                      className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-400">
                    Proporciona una descripción clara y concisa de tu proyecto.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de proyecto */}
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Tipo de Proyecto
                    <InfoTooltip text="Categoría de tu proyecto. Ayuda a la IA a generar contenido más relevante para tu sector." />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-950 border-slate-800 focus:ring-indigo-600">
                        <SelectValue placeholder="Selecciona un tipo de proyecto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-slate-950 border-slate-800 max-h-60">
                      {projectsTypes.map((type) => (
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

            {/* Palabras clave */}
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Palabras Clave
                    <InfoTooltip text="Términos relevantes para tu negocio. Ayudarán a optimizar el SEO y a generar contenido más específico." />
                    <Button disabled={isLoadingKeyword} className="cursor-pointer" onClick={() => handleKeywords()}>
                      {
                        isLoadingKeyword ? <Loader className="animate-spin" /> : <SparkleIcon className="mr-2 h-4 w-4" />
                      }
                      Generar palabras clave
                    </Button>
                  </FormLabel>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Añade palabras clave y presiona Enter"
                        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      />
                      <Button
                        type="button"
                        onClick={addKeyword}
                        variant="outline"
                        className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        Añadir
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.getValues("keywords").map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeKeyword(keyword)}
                            className="ml-1 rounded-full hover:bg-indigo-800/50"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Eliminar</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** Seleccionar una paleta de colores */}
            <FormField
              control={form.control}
              name="ColorPalette"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    Paleta de colores
                    <InfoTooltip text="Estilo de fuente que se usará en tu sitio web. Cada estilo transmite una personalidad diferente." />
                  </FormLabel>
                  <FormControl>
                    <ColorSelectable name={form.getValues('name')} projectType={form.getValues('projectType')} description={form.getValues('description')} field={field} onChangeColors={onChangeColors} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 pt-2">
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Color Primario
                      <InfoTooltip text="Color principal de tu marca. Se usará para elementos destacados." />
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          value={field.value}
                          className="w-12 h-10 p-1 bg-slate-950 border-slate-800"
                        />
                      </FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Color Secundario
                      <InfoTooltip text="Color complementario. Se usará para crear contraste con el color primario." />
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          value={field.value || "#8b5cf6"}
                          className="w-12 h-10 p-1 bg-slate-950 border-slate-800"
                        />
                      </FormControl>
                      <Input
                        type="text"
                        value={field.value || "#8b5cf6"}
                        onChange={field.onChange}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tertiaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Color terciario
                      <InfoTooltip text="Color que se usa para elementos menos importantes" />
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          value={field.value}
                          className="w-12 h-10 p-1 bg-slate-950 border-slate-800"
                        />
                      </FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Color de Accent
                      <InfoTooltip text="Color para elementos que necesitan destacar, como botones de llamada a la acción." />
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          value={field.value}
                          className="w-12 h-10 p-1 bg-slate-950 border-slate-800"
                        />
                      </FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Color de Texto
                      <InfoTooltip text="Color que se usará para el texto en el proyecto." />
                    </FormLabel>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Input
                          type="color"
                          {...field}
                          value={field.value}
                          className="w-12 h-10 p-1 bg-slate-950 border-slate-800"
                        />
                      </FormControl>
                      <Input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        className="bg-slate-950 border-slate-800 focus-visible:ring-indigo-600"
                      />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Tipografía */}
            <FormField
              control={form.control}
              name="typography"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    Estilo de Tipografía
                    <InfoTooltip text="Estilo de fuente que se usará en tu sitio web. Cada estilo transmite una personalidad diferente." />
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-5"
                    >
                      {
                        typographyStyles.map((style) => (
                          <Label
                            key={style.id}
                            htmlFor={style.id}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-slate-800 bg-slate-950 p-4 hover:bg-slate-900 hover:border-slate-700 has-[:checked]:border-indigo-600"
                          >
                            <RadioGroupItem value={style.id} id={style.id} className="sr-only" />
                            <span className={`text-xl ${style.className}`}>Aa</span>
                            <span className="mt-2 text-xs">{style.name}</span>
                          </Label>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subir imágenes */}
            {/* <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-2">
                    Imágenes del Proyecto
                    <InfoTooltip text="Sube imágenes relacionadas con tu negocio. Estas se usarán para crear un diseño más personalizado." />
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-slate-700 bg-slate-950 hover:bg-slate-900"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-slate-500" />
                            <p className="mb-2 text-sm text-slate-400">
                              <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                            </p>
                            <p className="text-xs text-slate-500">PNG, JPG o SVG (MAX. 5MB)</p>
                          </div>
                          <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      {uploadedImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
                          {uploadedImages.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-800">
                                <img
                                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                                  alt={`Uploaded ${index + 1}`}
                                  className="object-cover w-full h-full"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-slate-900/80 text-slate-300 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Eliminar</span>
                                </button>
                              </div>
                              <p className="mt-1 text-xs text-slate-500 truncate">{file.name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            /> */}
          </CardContent>
          <CardFooter className="border-t border-slate-800 px-6 py-4">
            <AddButton type="submit" disabled={isLoading}>
              {
                isLoading ? <Loader className="animate-spin" /> : <Rocket className="mr-2 h-4 w-4" />
              }
              {isLoading ? "Creando proyecto..." : "Crear Proyecto"}
            </AddButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
