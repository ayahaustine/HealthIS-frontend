import { Calendar, Phone, User } from "lucide-react"
import type { Client } from "@/lib/client-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ClientPersonalInfoProps {
  client: Client
}

export function ClientPersonalInfo({ client }: ClientPersonalInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Full Name</div>
            <div className="text-sm font-medium">
              {client.first_name} {client.last_name}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Gender</div>
            <div className="text-sm font-medium">
              {client.gender === "M" ? "Male" : client.gender === "F" ? "Female" : "Other"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Age</div>
            <div className="text-sm font-medium">{client.age} years</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Date of Birth</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              {formatDate(client.dob)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Phone Number</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              {client.phone_number}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
