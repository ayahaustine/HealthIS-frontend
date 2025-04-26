import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type ActivityItem = {
  id: number
  type: "login" | "update" | "action" | "system"
  title: string
  description: string
  timestamp: string
  location?: string
  device?: string
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: "login",
    title: "Successful Login",
    description: "You logged in successfully",
    timestamp: "Today at 9:32 AM",
    location: "San Francisco, USA",
    device: "Chrome on Windows",
  },
  {
    id: 2,
    type: "update",
    title: "Profile Updated",
    description: "You updated your professional details",
    timestamp: "Yesterday at 3:45 PM",
    location: "San Francisco, USA",
  },
  {
    id: 3,
    type: "action",
    title: "Client Record Updated",
    description: "You updated medical records for patient #12345",
    timestamp: "Yesterday at 11:20 AM",
    location: "San Francisco, USA",
  },
  {
    id: 4,
    type: "system",
    title: "Password Changed",
    description: "Your account password was changed",
    timestamp: "3 days ago at 2:15 PM",
    location: "San Francisco, USA",
    device: "Chrome on Windows",
  },
  {
    id: 5,
    type: "login",
    title: "Login Attempt",
    description: "Failed login attempt detected",
    timestamp: "5 days ago at 8:30 PM",
    location: "New York, USA",
    device: "Unknown device",
  },
]

export function ActivityHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <CardDescription>Review your recent account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="logins">Logins</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </TabsContent>
          <TabsContent value="logins" className="space-y-4">
            {activities
              .filter((activity) => activity.type === "login")
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </TabsContent>
          <TabsContent value="updates" className="space-y-4">
            {activities
              .filter((activity) => activity.type === "update")
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </TabsContent>
          <TabsContent value="actions" className="space-y-4">
            {activities
              .filter((activity) => activity.type === "action")
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  const getBadgeForType = (type: string) => {
    switch (type) {
      case "login":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Login</Badge>
      case "update":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Update</Badge>
      case "action":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Action</Badge>
      case "system":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">System</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="flex items-start space-x-4 p-4 rounded-md border">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{activity.title}</h4>
          {getBadgeForType(activity.type)}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
        <div className="flex flex-wrap gap-x-4 mt-2 text-xs text-muted-foreground">
          <span>{activity.timestamp}</span>
          {activity.location && <span>• {activity.location}</span>}
          {activity.device && <span>• {activity.device}</span>}
        </div>
      </div>
    </div>
  )
}
