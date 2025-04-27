import { MapPin } from "lucide-react"
import type { Client } from "@/lib/client-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ClientLocationInfoProps {
  client: Client
}

export function ClientLocationInfo({ client }: ClientLocationInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">County</div>
            <div className="text-sm font-medium">{client.county}</div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm text-muted-foreground">Sub-County</div>
            <div className="text-sm font-medium">{client.sub_county}</div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-2">Location Map</div>
            <div className="bg-muted rounded-md h-[120px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Map view coming soon</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
