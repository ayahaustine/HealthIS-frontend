import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ProfileHeader() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and account settings</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active Account
          </Badge>
          <Button variant="outline">View Public Profile</Button>
        </div>
      </div>
    </div>
  )
}
