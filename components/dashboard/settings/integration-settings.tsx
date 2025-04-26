"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Link2, X, RefreshCw, ExternalLink } from "lucide-react"

type Integration = {
  id: string
  name: string
  description: string
  status: "connected" | "disconnected" | "pending"
  lastSync?: string
}

export function IntegrationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "ehr",
      name: "Electronic Health Records",
      description: "Connect to your EHR system to sync patient records",
      status: "connected",
      lastSync: "2023-04-20 14:30",
    },
    {
      id: "lab",
      name: "Laboratory System",
      description: "Connect to your lab system to import test results",
      status: "connected",
      lastSync: "2023-04-19 09:15",
    },
    {
      id: "billing",
      name: "Billing System",
      description: "Connect to your billing system for payment processing",
      status: "disconnected",
    },
    {
      id: "pharmacy",
      name: "Pharmacy System",
      description: "Connect to pharmacy systems for medication management",
      status: "pending",
    },
  ])

  const [autoSync, setAutoSync] = useState(true)

  const handleConnect = (id: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIntegrations(
        integrations.map((integration) =>
          integration.id === id
            ? { ...integration, status: "connected", lastSync: new Date().toLocaleString() }
            : integration,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Integration connected",
        description: "The integration has been successfully connected.",
      })
    }, 1500)
  }

  const handleDisconnect = (id: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIntegrations(
        integrations.map((integration) =>
          integration.id === id ? { ...integration, status: "disconnected", lastSync: undefined } : integration,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Integration disconnected",
        description: "The integration has been disconnected.",
      })
    }, 1000)
  }

  const handleSync = (id: string) => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIntegrations(
        integrations.map((integration) =>
          integration.id === id ? { ...integration, lastSync: new Date().toLocaleString() } : integration,
        ),
      )
      setIsLoading(false)
      toast({
        title: "Sync complete",
        description: "The integration has been successfully synchronized.",
      })
    }, 2000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Connected</Badge>
      case "disconnected":
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Disconnected</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>Connect and manage third-party integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Automatic Synchronization</Label>
              <p className="text-sm text-muted-foreground">Automatically sync data with connected systems</p>
            </div>
            <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{integration.name}</h3>
                    {getStatusBadge(integration.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  {integration.lastSync && (
                    <p className="text-xs text-muted-foreground">Last synced: {integration.lastSync}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {integration.status === "connected" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                        disabled={isLoading}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(integration.id)}
                        disabled={isLoading}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Disconnect
                      </Button>
                    </>
                  )}
                  {integration.status === "disconnected" && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleConnect(integration.id)}
                      disabled={isLoading}
                    >
                      <Link2 className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  )}
                  {integration.status === "pending" && (
                    <Button variant="outline" size="sm" disabled>
                      Pending
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="ml-2">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
