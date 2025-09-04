import { DashboardHeader } from "@/components/dashboard-header"
import { SummaryCards } from "@/components/summary-card"
import { QuickActions } from "@/components/quick-action"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPageContent() {
  return (
      <div className="h-screen bg-background text-sm overflow-hidden">
      {/* Back Button */}
      <div className="container mx-auto px-7 max-w-7xl">
        {/* Main Dashboard Content */}
        <DashboardHeader />

        <div className="grid gap-6 mt-6">
          {/* Summary Cards Section */}
          <SummaryCards />

          {/* Quick Actions and Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
