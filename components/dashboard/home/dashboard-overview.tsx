import { Users, FileText, Activity, AlertCircle } from "lucide-react"
import { StatCard } from "@/components/dashboard/home/stat-card"
import { MonthlyChart } from "@/components/dashboard/home/monthly-chart"
import { TargetGauge } from "@/components/dashboard/home/target-gauge"
import { StatsOverview } from "@/components/dashboard/home/stats-overview"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your health information system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value="1,248"
          subtitle="Registered in the system"
          icon={Users}
          change={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Active Programs"
          value="8"
          subtitle="Currently running programs"
          icon={FileText}
          change={{ value: 2, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Enrollments"
          value="324"
          subtitle="In the last 30 days"
          icon={Activity}
          change={{ value: 5, isPositive: true }}
          color="purple"
        />
        <StatCard
          title="High Risk Clients"
          value="7"
          subtitle="Requiring immediate attention"
          icon={AlertCircle}
          change={{ value: 3, isPositive: false }}
          color="red"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-2 lg:col-span-4">
          <MonthlyChart title="Monthly Enrollments" description="Client enrollment across all programs" />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <TargetGauge
            title="Monthly Target"
            description="Target you've set for each month"
            percentage={75.5}
            change={10}
            message="You're on track to meet your monthly target. Keep up the good work!"
          />
        </div>
      </div>

      <div>
        <StatsOverview title="Statistics" description="Target you've set for each month" />
      </div>
    </div>
  )
}
