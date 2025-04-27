"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Activity, ActivityService } from "@/lib/activity-service"
import { formatDistanceToNow } from "date-fns"
import { AlertCircle, CheckCircle2, Clock, FileText, UserPlus, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface RecentActivityListProps {
  limit?: number
  entityType?: string
  entityUuid?: string
  showOnlyClientAndProgram?: boolean
}

export function RecentActivityList({
  limit,
  entityType,
  entityUuid,
  showOnlyClientAndProgram = false,
}: RecentActivityListProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchActivities() {
      try {
        setLoading(true)
        let data: Activity[]

        if (entityType && entityUuid) {
          data = await ActivityService.getEntityActivities(entityType, entityUuid)
        } else if (showOnlyClientAndProgram) {
          data = await ActivityService.getClientAndProgramActivities(limit)
        } else {
          data = await ActivityService.getActivities(limit)
        }

        setActivities(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching activities:", err)
        setError("Failed to load activities. Please try again later.")
        setActivities([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [limit, entityType, entityUuid, showOnlyClientAndProgram])

  if (loading) {
    return <ActivityListSkeleton count={limit || 5} />
  }

  if (error) {
    return <div className="p-4 text-sm text-red-500">{error}</div>
  }

  if (activities.length === 0) {
    return <div className="p-4 text-sm text-gray-500">No recent activities found.</div>
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className="relative mt-0.5">
            <div className={`h-2 w-2 rounded-full absolute -left-1 top-1.5 ${getActivityColor(activity.type)}`} />
            {activity.user ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/avatar.png" alt={activity.user.name} />
                <AvatarFallback>{getInitials(activity.user.name)}</AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${getActivityBgColor(activity.type)}`}
              >
                {getActivityIcon(activity.type, activity.entity_type)}
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
              {activity.entity_type && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${getEntityTypeBadgeColor(activity.entity_type)}`}>
                  {capitalizeFirstLetter(activity.entity_type)}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ActivityListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  )
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

function getActivityColor(type: Activity["type"]): string {
  switch (type) {
    case "registration":
      return "bg-green-500"
    case "enrollment":
      return "bg-blue-500"
    case "update":
      return "bg-amber-500"
    case "alert":
      return "bg-red-500"
    case "login":
      return "bg-purple-500"
    case "logout":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

function getActivityBgColor(type: Activity["type"]): string {
  switch (type) {
    case "registration":
      return "bg-green-100 text-green-600"
    case "enrollment":
      return "bg-blue-100 text-blue-600"
    case "update":
      return "bg-amber-100 text-amber-600"
    case "alert":
      return "bg-red-100 text-red-600"
    case "login":
      return "bg-purple-100 text-purple-600"
    case "logout":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

function getActivityIcon(type: Activity["type"], entityType?: string) {
  if (entityType === "program") {
    return <FileText className="h-4 w-4" />
  }

  switch (type) {
    case "registration":
      return <UserPlus className="h-4 w-4" />
    case "enrollment":
      return <Users className="h-4 w-4" />
    case "update":
      return <Clock className="h-4 w-4" />
    case "alert":
      return <AlertCircle className="h-4 w-4" />
    case "login":
      return <CheckCircle2 className="h-4 w-4" />
    case "logout":
      return <CheckCircle2 className="h-4 w-4" />
    default:
      return "•"
  }
}

function getEntityTypeBadgeColor(entityType: string): string {
  switch (entityType.toLowerCase()) {
    case "client":
      return "bg-blue-100 text-blue-800"
    case "program":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
