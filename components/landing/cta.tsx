import { ibmPlexSansBold, ibmPlexSansCondensed, ibmPlexSans } from "@/lib/utils"
import AddButton from "../ui/AddButton";
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col justiy-start items-start">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <h2 className={`mt-10 text-4xl font-bold text-center text-balance text-foreground sm:text-6xl ${ibmPlexSansBold.className}`}>
            Empieza a diseñar tu web
          </h2>
          <p className={`mt-6 text-xl text-center leading-8 text-muted-foreground text-pretty ${ibmPlexSans.className}`}>
            Crea el diseño de tu web fácilmente con IA, puedes tenerlo listo en sólo unos minutos.
          </p>
          <div className="mt-10 flex items-center gap-x-6 justify-center">
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
          </div>
        </div>
      </div>
    </section>
  )
}
