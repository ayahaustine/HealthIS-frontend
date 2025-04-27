"use client"

import { useState } from "react"
import { Check, Copy, Globe, Info, Lock } from "lucide-react"
import type { Client } from "@/lib/client-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ClientApiAccessProps {
  client: Client
}

export function ClientApiAccess({ client }: ClientApiAccessProps) {
  const [isPublicEnabled, setIsPublicEnabled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const apiEndpoint = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/public/clients/${client.uuid}/`

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiEndpoint)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "API endpoint URL has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const togglePublicAccess = () => {
    setIsPublicEnabled(!isPublicEnabled)
    toast({
      title: isPublicEnabled ? "Public API access disabled" : "Public API access enabled",
      description: isPublicEnabled
        ? `Public API access for ${client.first_name} ${client.last_name} has been disabled.`
        : `Public API access for ${client.first_name} ${client.last_name} has been enabled.`,
    })
  }

  // Sample API response based on the client data
  const sampleResponse = {
    uuid: client.uuid,
    first_name: client.first_name,
    last_name: client.last_name,
    dob: client.dob,
    county: client.county,
    sub_county: client.sub_county,
    gender: client.gender,
    created_at: client.created_at,
    programs: client.programs.map((program) => ({
      name: program.name,
      description: program.description,
      enrolled_at: program.enrolled_at,
    })),
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          API Access
        </CardTitle>
        <CardDescription>
          Expose this client profile via a public API endpoint for integration with other systems.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch id="public-api-access" checked={isPublicEnabled} onCheckedChange={togglePublicAccess} />
            <label htmlFor="public-api-access" className="text-sm font-medium">
              Enable public API access
            </label>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">More information</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  When enabled, this client's data will be accessible via a public API endpoint without authentication.
                  Only share this URL with trusted systems.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className={`rounded-md border p-4 ${isPublicEnabled ? "bg-background" : "bg-muted/50"}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">API Endpoint</span>
              {!isPublicEnabled && (
                <span className="flex items-center text-xs text-muted-foreground gap-1">
                  <Lock className="h-3 w-3" /> Disabled
                </span>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={handleCopyToClipboard}
              disabled={!isPublicEnabled}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" /> Copy URL
                </>
              )}
            </Button>
          </div>
          <div className="font-mono text-xs p-2 bg-muted rounded border overflow-x-auto">
            <code className={!isPublicEnabled ? "opacity-50" : ""}>GET {apiEndpoint}</code>
          </div>
        </div>

        <Collapsible open={showResponse} onOpenChange={setShowResponse}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center justify-between w-full">
              <span>Sample Response</span>
              <span className="text-xs text-muted-foreground">{showResponse ? "Hide" : "Show"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="font-mono text-xs p-3 bg-muted rounded border overflow-x-auto mt-2">
              <pre>{JSON.stringify(sampleResponse, null, 2)}</pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
        <p>Note: This API endpoint does not require authentication. Be careful when sharing this URL.</p>
      </CardFooter>
    </Card>
  )
}
