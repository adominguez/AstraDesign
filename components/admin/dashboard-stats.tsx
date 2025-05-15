import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Layers, Star, Zap } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Usuarios Totales",
      value: "1,234",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Proyectos Activos",
      value: "567",
      icon: Layers,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Páginas Generadas",
      value: "2,345",
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Generaciones IA",
      value: "9,876",
      icon: Zap,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-full`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">+12.5% desde el mes pasado</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
