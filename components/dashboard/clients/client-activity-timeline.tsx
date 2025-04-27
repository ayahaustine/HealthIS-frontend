import { Clock, UserPlus } from "lucide-react"
import type { Client } from "@/lib/client-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ClientActivityTimelineProps {
  client: Client
}

export function ClientActivityTimeline({ client }: ClientActivityTimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Create timeline events from client data
  const timelineEvents = [
    {
      id: "registration",
      type: "registration",
      title: "Client Registration",
      description: `${client.first_name} ${client.last_name} was registered by ${client.created_by}`,
      date: client.created_at,
      icon: <UserPlus className="h-5 w-5" />,
    },
    ...client.programs.map((program) => ({
      id: `enrollment-${program.uuid}`,
      type: "enrollment",
      title: `Enrolled in ${program.name}`,
      description: `Client was enrolled in the ${program.name} program`,
      date: program.enrolled_at,
      icon: <Clock className="h-5 w-5" />,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineEvents.map((event) => (
            <div key={event.id} className="flex gap-4">
              <div className="mt-1">
                <div className="bg-primary/10 p-2 rounded-full">{event.icon}</div>
              </div>
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(event.date)} at {formatTime(event.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
