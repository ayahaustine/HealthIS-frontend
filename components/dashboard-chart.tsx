"use client"

import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartLegendItemColor,
  ChartLegendItemLabel,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", hiv: 40, tb: 24, malaria: 35 },
  { name: "Feb", hiv: 30, tb: 13, malaria: 22 },
  { name: "Mar", hiv: 20, tb: 38, malaria: 28 },
  { name: "Apr", hiv: 27, tb: 39, malaria: 30 },
  { name: "May", hiv: 18, tb: 48, malaria: 24 },
  { name: "Jun", hiv: 23, tb: 38, malaria: 28 },
  { name: "Jul", hiv: 34, tb: 43, malaria: 31 },
  { name: "Aug", hiv: 45, tb: 34, malaria: 40 },
  { name: "Sep", hiv: 65, tb: 28, malaria: 45 },
  { name: "Oct", hiv: 78, tb: 37, malaria: 53 },
  { name: "Nov", hiv: 82, tb: 42, malaria: 57 },
  { name: "Dec", hiv: 91, tb: 50, malaria: 60 },
]

export function DashboardChart() {
  return (
    <ChartContainer className="h-[300px]">
      <ChartLegend className="mb-4 flex justify-center gap-8">
        <ChartLegendItem>
          <ChartLegendItemColor className="bg-blue-500" />
          <ChartLegendItemLabel>HIV Program</ChartLegendItemLabel>
        </ChartLegendItem>
        <ChartLegendItem>
          <ChartLegendItemColor className="bg-green-500" />
          <ChartLegendItemLabel>TB Program</ChartLegendItemLabel>
        </ChartLegendItem>
        <ChartLegendItem>
          <ChartLegendItemColor className="bg-amber-500" />
          <ChartLegendItemLabel>Malaria Program</ChartLegendItemLabel>
        </ChartLegendItem>
      </ChartLegend>
      <Chart>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="hiv" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
            <Area type="monotone" dataKey="tb" stackId="1" stroke="#22c55e" fill="#22c55e" />
            <Area type="monotone" dataKey="malaria" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
          </AreaChart>
        </ResponsiveContainer>
      </Chart>
    </ChartContainer>
  )
}
