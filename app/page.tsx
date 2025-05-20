import Hero from "@/components/landing/hero";
import Features from "@/components/landing/Features";
import Steps from "@/components/landing/Steps";
import Cta from "@/components/landing/cta"

export default function Home() {
  return (
    <main className="flex flex-col absolute left-0 top-0 w-full z-0">
      <Hero />
      <Features />
      <Steps />
      <Cta />
    </main>
  );
}