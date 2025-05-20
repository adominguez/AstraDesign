import { Rocket } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/admin/navigation"

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col bg-slate-950 border-r border-slate-800">
      <div className="flex h-14 items-center border-b border-slate-800 px-4">
        <Link href="/admin" className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-indigo-400" />
          <span className="font-bold text-xl">AstraDesign</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <Navigation />
      </div>
    </div>
  )
}
