import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentProjects } from "@/components/admin/recent-projects"
import { UserActivity } from "@/components/admin/user-activity"
import { SystemStatus } from "@/components/admin/system-status"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Panel de Control</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentProjects />
        <UserActivity />
      </div>
      <SystemStatus />
    </div>
  )
}
