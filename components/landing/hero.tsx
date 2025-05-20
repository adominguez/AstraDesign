"use client"
import { motion } from "framer-motion"
import { ibmPlexSansBold, ibmPlexSansCondensed, ibmPlexSans } from "@/lib/utils"
import AddButton from "../ui/AddButton";
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from "next/link";
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="h-dvh flex">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <motion.h1
            className={`text-lg font-bold text-foreground text-balance ${ibmPlexSansCondensed.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >Diseño de Páginas Web con IA</motion.h1>
          <motion.h2
            className={`mt-10 text-4xl font-bold tracking-tight text-balance text-foreground sm:text-6xl ${ibmPlexSansBold.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >Diseña sitios web personalizados en minutos con IA</motion.h2>
          <motion.p
            className={`mt-6 text-xl leading-8 text-muted-foreground text-pretty ${ibmPlexSans.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            La plataforma de diseño web con IA que te ayudará a diseñar una web adaptada a tus necesidades. Haz que tu sitio web llegue a lo más alto del universo
          </motion.p>
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl="/admin" >
                <AddButton>
                  <span className="text-sm font-semibold leading-6 text-foreground">
                    Comienza a diseñar <span aria-hidden="true">→</span>
                  </span>
                </AddButton>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/admin">
                <AddButton>
                  <span className="text-sm font-semibold leading-6 text-foreground">
                    Panel de administración <span aria-hidden="true">→</span>
                  </span>
                </AddButton>
              </Link>
            </SignedIn>
          </motion.div>
        </div>
        <div className="flex flex-row lg:flex-col w-full">
          <motion.div
            className="mx-auto mt-16 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/cohete.webp"
              width={342}
              height={150}
              alt="Imagen de un cohete"
            />
          </motion.div>
          <motion.div
            className="mx-auto mt-16 lg:mt-0"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Image
              src="/computer-design.webp"
              width={350}
              height={287}
              alt="Imagen de un diseño de computadora"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
