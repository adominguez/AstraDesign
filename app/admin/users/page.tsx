import { UsersTable } from "@/components/admin/users-table"
import AddButton from "@/components/ui/AddButton"
import { PlusCircle } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <AddButton>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Usuario
        </AddButton>
      </div>
      <UsersTable />
    </div>
  )
}
