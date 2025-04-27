import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  subtitle?: string
  change?: {
    value: number
    isPositive: boolean
  }
  className?: string
  color: "blue" | "green" | "purple" | "red" | "amber"
  isLoading?: boolean
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  change,
  className,
  color,
  isLoading = false,
}: StatCardProps) {
  const colorStyles = {
    blue: {
      border: "border-l-blue-500",
      text: "text-blue-600",
      icon: "text-blue-500",
    },
    green: {
      border: "border-l-green-500",
      text: "text-green-600",
      icon: "text-green-500",
    },
    purple: {
      border: "border-l-purple-500",
      text: "text-purple-600",
      icon: "text-purple-500",
    },
    red: {
      border: "border-l-red-500",
      text: "text-red-600",
      icon: "text-red-500",
    },
    amber: {
      border: "border-l-amber-500",
      text: "text-amber-600",
      icon: "text-amber-500",
    },
  }

  return (
    <Card className={cn("overflow-hidden border-l-4 shadow-sm", colorStyles[color].border, className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <h3 className={cn("text-3xl font-bold mt-2", colorStyles[color].text)}>{value}</h3>
            )}
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            {change && !isLoading && (
              <p className={cn("text-xs mt-2", change.isPositive ? "text-green-600" : "text-red-600")}>
                <span>
                  {change.isPositive ? "+" : ""}
                  {change.value}%
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </p>
            )}
            {isLoading && <Skeleton className="h-4 w-32 mt-2" />}
          </div>
          <div className={cn("p-2 rounded-md", colorStyles[color].icon)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
