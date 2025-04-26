"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PersonalInformation() {
  // Static user data
  const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@healthis.com",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">First Name</p>
            <p className="text-base">{userData.firstName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Last Name</p>
            <p className="text-base">{userData.lastName}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Email</p>
          <p className="text-base">{userData.email}</p>
        </div>
        <div className="pt-2">
          <p className="text-sm text-muted-foreground italic">
            Contact your administrator if you need to update your personal information.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
