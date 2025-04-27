"use client"

import { useState, useEffect } from "react"
import { Users, FileText, Activity, AlertCircle } from "lucide-react"
import { StatCard } from "@/components/dashboard/home/stat-card"
import { MonthlyChart } from "@/components/dashboard/home/monthly-chart"
import { StatsOverview } from "@/components/dashboard/home/stats-overview"
import { RecentActivityCard } from "@/components/dashboard/home/recent-activity-card"
import { AnalyticsService } from "@/lib/analytics-service"
import { DashboardChart } from "@/components/dashboard-chart"

export function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true)
  const [totalClients, setTotalClients] = useState({ count: 0, growth: 0 })
  const [activePrograms, setActivePrograms] = useState({ count: 0, growth: 0 })
  const [enrollments, setEnrollments] = useState({ count: 0, growth: 0 })
  const [highRiskClients, setHighRiskClients] = useState({ count: 7, growth: -3 })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true)

        // Fetch all analytics data in parallel
        const [clientsData, programsData, enrollmentsData] = await Promise.all([
          AnalyticsService.getTotalClients(),
          AnalyticsService.getActivePrograms(),
          AnalyticsService.getEnrollments(),
        ])

        setTotalClients({
          count: clientsData.total_clients,
          growth: clientsData.growth_percentage,
        })

        setActivePrograms({
          count: programsData.active_programs,
          growth: programsData.growth_percentage,
        })

        setEnrollments({
          count: enrollmentsData.enrollments,
          growth: enrollmentsData.growth_percentage,
        })

        // High risk clients is currently hardcoded as we don't have an API endpoint for it
      } catch (err) {
        console.error("Failed to fetch analytics data:", err)
        setError("Failed to load analytics data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your health information system</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={isLoading ? "Loading..." : totalClients.count.toString()}
          subtitle="Registered in the system"
          icon={Users}
          change={isLoading ? undefined : { value: totalClients.growth, isPositive: totalClients.growth >= 0 }}
          color="blue"
          isLoading={isLoading}
        />
        <StatCard
          title="Active Programs"
          value={isLoading ? "Loading..." : activePrograms.count.toString()}
          subtitle="Currently running programs"
          icon={FileText}
          change={isLoading ? undefined : { value: activePrograms.growth, isPositive: activePrograms.growth >= 0 }}
          color="green"
          isLoading={isLoading}
        />
        <StatCard
          title="Enrollments"
          value={isLoading ? "Loading..." : enrollments.count.toString()}
          subtitle="In the last 30 days"
          icon={Activity}
          change={isLoading ? undefined : { value: enrollments.growth, isPositive: enrollments.growth >= 0 }}
          color="purple"
          isLoading={isLoading}
        />
        <StatCard
          title="High Risk Clients"
          value={isLoading ? "Loading..." : highRiskClients.count.toString()}
          subtitle="Requiring immediate attention"
          icon={AlertCircle}
          change={isLoading ? undefined : { value: highRiskClients.growth, isPositive: highRiskClients.growth >= 0 }}
          color="red"
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-2 lg:col-span-4">
          <MonthlyChart title="Monthly Enrollments" description="Client enrollment across all programs" />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <RecentActivityCard showOnlyClientAndProgram={true} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <StatsOverview title="Client & Program Trends" description="Monthly trends of clients and programs" />
        <DashboardChart />
      </div>
    </div>
  )
}
