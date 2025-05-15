import { SettingsForm } from "@/components/admin/settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h1>
      </div>
      <SettingsForm />
    </div>
  )
}
