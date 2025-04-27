import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentActivityList } from "@/components/recent-activity-list"
import { Bell } from "lucide-react"

interface RecentActivityCardProps {
  title?: string
  description?: string
  limit?: number
  entityType?: string
  entityUuid?: string
}

export function RecentActivityCard({
  title = "Recent Activity",
  description = "Latest actions in the system",
  limit = 5,
  entityType,
  entityUuid,
}: RecentActivityCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <Bell className="h-4 w-4 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <RecentActivityList limit={limit} entityType={entityType} entityUuid={entityUuid} />
      </CardContent>
    </Card>
  )
}
