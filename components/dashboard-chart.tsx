"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { AnalyticsService } from "@/lib/analytics-service"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"

// Define a set of colors for the chart
const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#22c55e", // green-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
]

export function DashboardChart() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [barData, setBarData] = useState<any[]>([])
  const [areaData, setAreaData] = useState<any[]>([])
  const [programColors, setProgramColors] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Fetch program distribution data
        const response = await AnalyticsService.getProgramDistribution()

        // Create color mapping for programs
        const colors: Record<string, string> = {}
        response.program_names.forEach((name, index) => {
          colors[name] = CHART_COLORS[index % CHART_COLORS.length]
        })
        setProgramColors(colors)

        // Create bar chart data
        const barChartData = response.program_names.map((name, index) => ({
          name,
          clients: response.client_counts[index],
          fill: colors[name],
        }))
        setBarData(barChartData)

        // Create area chart data
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const areaChartData = months.map((month, monthIndex) => {
          const dataPoint: Record<string, any> = { name: month }

          response.program_names.forEach((name, index) => {
            // Create a sine wave pattern for visual appeal
            const baseValue = response.client_counts[index]
            const factor = Math.sin((monthIndex / 11) * Math.PI) * 0.3 + 0.85
            dataPoint[name] = Math.round(baseValue * factor)
          })

          return dataPoint
        })
        setAreaData(areaChartData)

        setError(null)
      } catch (err) {
        console.error("Failed to fetch chart data:", err)
        setError("Failed to load program distribution data")
        setBarData([])
        setAreaData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Custom tooltip for the bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="font-medium">{label}</div>
          <div className="text-sm text-muted-foreground">{payload[0].value} clients</div>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Program Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[400px] w-full" />
        ) : error ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        ) : barData.length === 0 ? (
          <div className="flex h-[400px] items-center justify-center">
            <p className="text-sm text-muted-foreground">No program distribution data available</p>
          </div>
        ) : (
          <Tabs defaultValue="bar" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="area">Area Chart</TabsTrigger>
            </TabsList>

            {/* Bar Chart Tab */}
            <TabsContent value="bar" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="clients" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Bar key={`bar-segment-${index}`} dataKey="clients" fill={entry.fill} name={entry.name} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            {/* Area Chart Tab */}
            <TabsContent value="area" className="h-[350px]">
              <div className="mb-4 flex flex-wrap justify-center gap-4">
                {Object.entries(programColors).map(([name, color], index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </div>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  {Object.entries(programColors).map(([name, color]) => (
                    <Area key={name} type="monotone" dataKey={name} stackId="1" stroke={color} fill={color} />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
