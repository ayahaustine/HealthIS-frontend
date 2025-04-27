"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AnalyticsService } from "@/lib/analytics-service"
import { Skeleton } from "@/components/ui/skeleton"

// Month names for conversion
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

interface MonthlyChartProps {
  title: string
  description?: string
}

export function MonthlyChart({ title, description }: MonthlyChartProps) {
  const [data, setData] = useState<Array<{ name: string; value: number }>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [availableYears, setAvailableYears] = useState<string[]>([])

  useEffect(() => {
    const fetchMonthlyEnrollments = async () => {
      try {
        setIsLoading(true)
        const response = await AnalyticsService.getMonthlyEnrollments()

        // Extract available years from the response
        const years = Object.keys(response).sort().reverse()
        setAvailableYears(years)

        // If no year is selected or the selected year is not in the response, use the most recent year
        const selectedYear = years.includes(year) ? year : years[0] || new Date().getFullYear().toString()
        setYear(selectedYear)

        // Transform the data for the selected year
        if (response[selectedYear]) {
          const transformedData = Object.entries(response[selectedYear]).map(([month, value]) => ({
            name: monthNames[Number.parseInt(month) - 1],
            value,
          }))

          // Sort by month number
          transformedData.sort((a, b) => {
            const monthA = monthNames.indexOf(a.name)
            const monthB = monthNames.indexOf(b.name)
            return monthA - monthB
          })

          setData(transformedData)
        } else {
          setData([])
        }

        setError(null)
      } catch (err) {
        console.error("Failed to fetch monthly enrollments:", err)
        setError("Failed to load monthly data")
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMonthlyEnrollments()
  }, [year])

  const handleYearChange = (selectedYear: string) => {
    setYear(selectedYear)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <div className="flex items-center space-x-2">
          {availableYears.length > 0 && (
            <select
              value={year}
              onChange={(e) => handleYearChange(e.target.value)}
              className="text-sm border rounded px-2 py-1 bg-background"
              aria-label="Select year"
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px]">
          {isLoading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-full" />
            </div>
          ) : data.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No data available for {year}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={30} />
                <Tooltip
                  cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
