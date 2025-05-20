"use client"
import { ibmPlexSansBold } from "@/lib/utils"
import Image from "next/image";

interface FeatureProps {
  number: string,
  title: string,
  image: string,
  className?: string
  width: number,
  height: number
}

export default function Feature({ title, number, image, width, height, className}: FeatureProps) {
  return (
    <article className={`flex flex-col gap-4 items-center p-6 rounded-lg ${className}`}>
      <span className={`flex items-center text-6xl text-blue-300 justify-center w-24 h-24 mb-4 ${ibmPlexSansBold.className}`}>
        {number}
      </span>
      <Image
        src={image}
        width={width}
        height={height}
        alt={title}
      />
      <h3 className={`text-2xl text-center font-bold text-foreground ${ibmPlexSansBold.className} text-balance`}>
        {title}
      </h3>
    </article>
  )
}
