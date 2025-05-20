"use client"
import { ibmPlexSansBold } from "@/lib/utils"
import Step from "./Step"

const STEPS = [{
  title: "Crea tu proyecto",
  image: "/step-1.webp",
  number: "1",
  width: 497,
  height: 439
}, {
  title: "Crea las páginas y secciones",
  image: "/step-2.webp",
  number: "2",
  width: 402,
  height: 348
}, {
  title: "Crea las imágenes",
  image: "/step-3.webp",
  number: "3",
  width: 400,
  height: 392
}]

export default function Steps() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 flex flex-col lg:px-8">
      <h2 className={`mt-10 text-4xl font-bold text-foreground text-balance text-center sm:text-5xl ${ibmPlexSansBold.className}`}>Crea el diseño de tu web fácilmente en 3 pasos</h2>
      <div className="py-20 grid md:grid-cols-3 gap-4">
        {STEPS.map((step, index) => (
          <Step
            key={index}
            title={step.title}
            number={step.number}
            image={step.image}
            width={step.width}
            height={step.height}
          />
        ))}
      </div>
    </section>
  )
}
