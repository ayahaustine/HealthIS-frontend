"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"

export function AccountSettings() {
  // Use the user data from auth context
  const { user } = useAuth()

  // Extract first name and last name from the full name
  const nameParts = user?.name ? user.name.split(" ") : ["", ""]
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your personal account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">First Name</p>
            <p className="text-base">{firstName}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Last Name</p>
            <p className="text-base">{lastName}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Email Address</p>
            <p className="text-base">{user?.email || "Loading..."}</p>
          </div>
          <div className="pt-2">
            <p className="text-sm text-muted-foreground italic">
              Contact your administrator if you need to update your account information.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>The following actions are irreversible. Please proceed with caution.</AlertDescription>
          </Alert>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
            </div>
            <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2 rounded-md">
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
