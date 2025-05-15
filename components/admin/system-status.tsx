import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Clock } from "lucide-react"

export function SystemStatus() {
  const services = [
    {
      name: "API de Generación IA",
      status: "Operativo",
      uptime: "99.9%",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      name: "Almacenamiento de Proyectos",
      status: "Operativo",
      uptime: "99.8%",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      name: "Servicio de Autenticación",
      status: "Operativo",
      uptime: "100%",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      name: "Generador de Imágenes",
      status: "Degradado",
      uptime: "95.2%",
      icon: AlertCircle,
      color: "text-amber-500",
    },
    {
      name: "Mantenimiento Programado",
      status: "Pendiente",
      time: "15/05/2025 02:00 AM",
      icon: Clock,
      color: "text-blue-500",
    },
  ]

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Estado del Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border border-slate-800 p-3">
              <div className="flex items-center space-x-3">
                <service.icon className={`h-5 w-5 ${service.color}`} />
                <div>
                  <div className="font-medium">{service.name}</div>
                  {service.uptime && <div className="text-xs text-slate-500">Uptime: {service.uptime}</div>}
                  {service.time && <div className="text-xs text-slate-500">{service.time}</div>}
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  service.status === "Operativo"
                    ? "border-green-500 text-green-500"
                    : service.status === "Degradado"
                      ? "border-amber-500 text-amber-500"
                      : "border-blue-500 text-blue-500"
                }
              >
                {service.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
