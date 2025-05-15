import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserActivity() {
  const activities = [
    {
      user: "María López",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ML",
      action: "creó un nuevo proyecto",
      target: "Estudio de Arquitectura Cosmos",
      time: "Hace 2 horas",
    },
    {
      user: "Carlos Ruiz",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "CR",
      action: "generó una nueva página",
      target: "Página de Servicios",
      time: "Hace 3 horas",
    },
    {
      user: "Ana Martínez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AM",
      action: "actualizó su perfil de negocio",
      target: "Coaching Galáctico",
      time: "Hace 5 horas",
    },
    {
      user: "Pedro Sánchez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "PS",
      action: "generó un nuevo logo",
      target: "Tienda Online Nebulosa",
      time: "Hace 1 día",
    },
  ]

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 border-b border-slate-800 pb-4 last:border-0 last:pb-0"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback className="bg-indigo-700">{activity.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </div>
                <div className="text-xs text-slate-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
