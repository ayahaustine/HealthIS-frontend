"use client"

import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PersonalInformation() {
  const { user } = useAuth()

  // Get initials for avatar fallback
  const getInitials = (name: string | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>View your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/images/avatar.png" alt="User avatar" />
                <AvatarFallback className="text-2xl">{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Standard Avatar</p>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <div className="mt-1 p-2 border rounded-md bg-muted">
                    {user?.name ? user.name.split(" ")[0] : "Loading..."}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <div className="mt-1 p-2 border rounded-md bg-muted">
                    {user?.name ? user.name.split(" ").slice(1).join(" ") : "Loading..."}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="mt-1 p-2 border rounded-md bg-muted">{user?.email || "Loading..."}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
