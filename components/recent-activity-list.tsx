import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Activity = {
  id: number
  type: "registration" | "enrollment" | "update" | "alert"
  title: string
  description: string
  time: string
  user?: {
    name: string
    avatar: string
    initials: string
  }
}

const activities: Activity[] = [
  {
    id: 1,
    type: "registration",
    title: "New Client Registered",
    description: "Sarah Johnson was registered in the system",
    time: "10 minutes ago",
    user: {
      name: "Dr. Emily Chen",
      avatar: "/compassionate-doctor-consultation.png",
      initials: "EC",
    },
  },
  {
    id: 2,
    type: "enrollment",
    title: "Program Enrollment",
    description: "Michael Davis was enrolled in HIV Care Program",
    time: "1 hour ago",
    user: {
      name: "Dr. John Doe",
      avatar: "/compassionate-doctor-consultation.png",
      initials: "JD",
    },
  },
  {
    id: 3,
    type: "update",
    title: "Client Information Updated",
    description: "Contact information updated for Robert Smith",
    time: "3 hours ago",
    user: {
      name: "Nurse Wilson",
      avatar: "/compassionate-caregiver.png",
      initials: "NW",
    },
  },
  {
    id: 4,
    type: "alert",
    title: "High Risk Client Flagged",
    description: "AI system flagged Elizabeth Brown as high risk",
    time: "5 hours ago",
  },
  {
    id: 5,
    type: "enrollment",
    title: "Program Enrollment",
    description: "James Wilson was enrolled in TB Treatment Program",
    time: "Yesterday",
    user: {
      name: "Dr. Maria Garcia",
      avatar: "/compassionate-doctor-consultation.png",
      initials: "MG",
    },
  },
]

export function RecentActivityList() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <div className="relative mt-0.5">
            <div className={`h-2 w-2 rounded-full absolute -left-1 top-1.5 ${getActivityColor(activity.type)}`} />
            {activity.user ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${getActivityBgColor(activity.type)}`}
              >
                {getActivityIcon(activity.type)}
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-sm text-gray-500">{activity.description}</p>
            <p className="text-xs text-gray-400">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
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
    default:
      return "bg-gray-100 text-gray-600"
  }
}

function getActivityIcon(type: Activity["type"]) {
  switch (type) {
    case "registration":
      return "+"
    case "enrollment":
      return "→"
    case "update":
      return "↻"
    case "alert":
      return "!"
    default:
      return "•"
  }
}
