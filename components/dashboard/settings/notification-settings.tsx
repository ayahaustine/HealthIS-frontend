"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState({
    systemUpdates: true,
    newClients: true,
    appointments: true,
    programUpdates: false,
    marketing: false,
  })
  const [pushNotifications, setPushNotifications] = useState({
    systemUpdates: true,
    newClients: true,
    appointments: true,
    programUpdates: true,
    alerts: true,
  })

  const handleEmailChange = (key: keyof typeof emailNotifications, checked: boolean) => {
    setEmailNotifications((prev) => ({ ...prev, [key]: checked }))
  }

  const handlePushChange = (key: keyof typeof pushNotifications, checked: boolean) => {
    setPushNotifications((prev) => ({ ...prev, [key]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Configure which emails you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-system">System Updates</Label>
                <p className="text-sm text-muted-foreground">Receive emails about system maintenance and updates</p>
              </div>
              <Switch
                id="email-system"
                checked={emailNotifications.systemUpdates}
                onCheckedChange={(checked) => handleEmailChange("systemUpdates", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-clients">New Clients</Label>
                <p className="text-sm text-muted-foreground">Receive emails when new clients are registered</p>
              </div>
              <Switch
                id="email-clients"
                checked={emailNotifications.newClients}
                onCheckedChange={(checked) => handleEmailChange("newClients", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-appointments">Appointments</Label>
                <p className="text-sm text-muted-foreground">Receive emails about upcoming appointments and changes</p>
              </div>
              <Switch
                id="email-appointments"
                checked={emailNotifications.appointments}
                onCheckedChange={(checked) => handleEmailChange("appointments", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-programs">Program Updates</Label>
                <p className="text-sm text-muted-foreground">Receive emails about program changes and updates</p>
              </div>
              <Switch
                id="email-programs"
                checked={emailNotifications.programUpdates}
                onCheckedChange={(checked) => handleEmailChange("programUpdates", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-marketing">Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about new features and promotional content
                </p>
              </div>
              <Switch
                id="email-marketing"
                checked={emailNotifications.marketing}
                onCheckedChange={(checked) => handleEmailChange("marketing", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>Configure which push notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-system">System Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about system maintenance and updates
                </p>
              </div>
              <Switch
                id="push-system"
                checked={pushNotifications.systemUpdates}
                onCheckedChange={(checked) => handlePushChange("systemUpdates", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-clients">New Clients</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications when new clients are registered
                </p>
              </div>
              <Switch
                id="push-clients"
                checked={pushNotifications.newClients}
                onCheckedChange={(checked) => handlePushChange("newClients", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-appointments">Appointments</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about upcoming appointments and changes
                </p>
              </div>
              <Switch
                id="push-appointments"
                checked={pushNotifications.appointments}
                onCheckedChange={(checked) => handlePushChange("appointments", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-programs">Program Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications about program changes and updates
                </p>
              </div>
              <Switch
                id="push-programs"
                checked={pushNotifications.programUpdates}
                onCheckedChange={(checked) => handlePushChange("programUpdates", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-alerts">Critical Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications for critical system alerts and high-risk clients
                </p>
              </div>
              <Switch
                id="push-alerts"
                checked={pushNotifications.alerts}
                onCheckedChange={(checked) => handlePushChange("alerts", checked)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
