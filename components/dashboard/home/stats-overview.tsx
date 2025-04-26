"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", clients: 30, programs: 40 },
  { name: "Feb", clients: 40, programs: 30 },
  { name: "Mar", clients: 45, programs: 50 },
  { name: "Apr", clients: 60, programs: 45 },
  { name: "May", clients: 50, programs: 40 },
  { name: "Jun", clients: 70, programs: 60 },
  { name: "Jul", clients: 80, programs: 70 },
  { name: "Aug", clients: 90, programs: 80 },
  { name: "Sep", clients: 100, programs: 90 },
  { name: "Oct", clients: 110, programs: 100 },
  { name: "Nov", clients: 120, programs: 110 },
  { name: "Dec", clients: 130, programs: 120 },
]

interface StatsOverviewProps {
  title: string
  description?: string
}

export function StatsOverview({ title, description }: StatsOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue="monthly">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="annually">Annually</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="monthly" className="pt-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorPrograms" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={30} />
                  <Tooltip />
                  <Area type="monotone" dataKey="clients" stroke="#4F46E5" fillOpacity={1} fill="url(#colorClients)" />
                  <Area
                    type="monotone"
                    dataKey="programs"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorPrograms)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="quarterly" className="pt-4">
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-muted-foreground">Quarterly data coming soon</p>
            </div>
          </TabsContent>
          <TabsContent value="annually" className="pt-4">
            <div className="h-[350px] flex items-center justify-center">
              <p className="text-muted-foreground">Annual data coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
