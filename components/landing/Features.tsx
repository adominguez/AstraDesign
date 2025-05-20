import { ibmPlexSansBold } from "@/lib/utils"
import { DownloadCloudIcon, Rocket, SquareUserRound, Sparkles } from "lucide-react"
import Feature from "./Feature"

const FEATURES = [{
  title: "Diseña tu web en minutos",
  description: "Con AstraDesign, puedes crear un diseño web atractivo y funcional en minutos. No necesitas ser un experto en diseño para obtener resultados impresionantes.",
  icon: <Rocket width={96} height={96}/>
}, {
  title: "Diseño centrado en el usuario y en SEO",
  description: "Nuestra plataforma prioriza la experiencia del usuario y está optimizada para SEO, asegurando que tu sitio web no solo sea atractivo para el usuario, sino también para los motores de búsqueda.",
  icon: <SquareUserRound width={96} height={96}/>
}, {
  icon: <Sparkles width={96} height={96}/>,
  title: "Generación de imágenes con IA",
  description: "Puedes generar imágenes de las diferentes secciones de tu sitio web muy fácilmente con sólo un click"
}, {
  icon: <DownloadCloudIcon width={96} height={96}/>,
  title: "Exportación de imágenes",
  description: "Si crear imágenes es muy fácil, descargarlas es todavía mucho más fácil haz click en el botón y la descargas"
}]

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 flex flex-col lg:px-8">
      <h2 className={`mt-10 text-center text-4xl font-bold text-foreground text-balance sm:text-6xl ${ibmPlexSansBold.className}`}>Creación de diseño web fácil con IA</h2>
      <div className="py-20 grid md:grid-cols-2 gap-4">
        {FEATURES.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  )
}
