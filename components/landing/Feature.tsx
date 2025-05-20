import { ibmPlexSansCondensed, ibmPlexSans } from "@/lib/utils"
import { JSX } from "react/jsx-runtime";

interface FeatureProps {
  title: string,
  description: string,
  icon: JSX.Element,
  className?: string
}

export default function Feature({ title, description, icon, className}: FeatureProps) {
  return (
    <article className={`border-violet-300 border-2 flex flex-col items-center p-6 rounded-lg ${className}`}>
      <div className="flex items-center text-violet-300 justify-center w-24 h-24 mb-4">
        {icon}
      </div>
      <h3 className={`text-2xl text-center font-bold text-foreground ${ibmPlexSansCondensed.className} text-balance`}>
        {title}
      </h3>
      <p className={`mt-2 text-lg text-pretty text-center text-violet-300 ${ibmPlexSans.className}`}>{description}</p>
    </article>
  )
}
