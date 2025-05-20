import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden border-slate-800 text-slate-400">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-slate-950 border-slate-800 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2 ml-auto">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  )
}
