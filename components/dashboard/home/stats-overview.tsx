"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnalyticsService } from "@/lib/analytics-service"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsOverviewProps {
  title: string
  description: string
}

export function StatsOverview({ title, description }: StatsOverviewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<{ name: string; clients: number; programs: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await AnalyticsService.getMonthlyClientsPrograms()

        // Transform the API response into the format expected by the chart
        const transformedData = response.months.map((month, index) => {
          // Format the month for display (e.g., "2023-01" to "Jan")
          const date = new Date(month)
          const formattedMonth = date.toLocaleString("default", { month: "short" })

          return {
            name: formattedMonth,
            clients: response.clients[index],
            programs: response.programs[index],
          }
        })

        setData(transformedData)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch monthly clients and programs data:", err)
        setError("Failed to load chart data")
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="clients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
          </TabsList>
          <TabsContent value="clients" className="space-y-4">
            <div className="h-[300px]">
              {isLoading ? (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : error ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              ) : data.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">No data available</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="clients"
                      stroke="#4F46E5"
                      fillOpacity={1}
                      fill="url(#colorClients)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>
          <TabsContent value="programs" className="space-y-4">
            <div className="h-[300px]">
              {isLoading ? (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[300px] w-full" />
                </div>
              ) : error ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              ) : data.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">No data available</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorPrograms" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="programs"
                      stroke="#22C55E"
                      fillOpacity={1}
                      fill="url(#colorPrograms)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
