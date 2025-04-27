"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { type Client, ClientService } from "@/lib/client-service"
import { ClientDetailsHeader } from "@/components/dashboard/clients/client-details-header"
import { ClientPersonalInfo } from "@/components/dashboard/clients/client-personal-info"
import { ClientProgramsList } from "@/components/dashboard/clients/client-programs-list"
import { ClientLocationInfo } from "@/components/dashboard/clients/client-location-info"
import { ClientActivityTimeline } from "@/components/dashboard/clients/client-activity-timeline"
import { ClientApiAccess } from "@/components/dashboard/clients/client-api-access"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function ClientDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const uuid = params.uuid as string

  useEffect(() => {
    async function fetchClient() {
      try {
        setLoading(true)
        setError(null)
        const clientData = await ClientService.getClient(uuid)
        setClient(clientData)
      } catch (err) {
        console.error("Failed to fetch client:", err)
        setError("Failed to load client details. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load client details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [uuid])

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading client details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-destructive mb-4 text-lg">
          <span className="font-semibold">Error:</span> {error}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-destructive mb-4 text-lg">Client not found</div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <ClientDetailsHeader client={client} onBack={handleBack} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClientPersonalInfo client={client} />
        <ClientLocationInfo client={client} />
      </div>

      <ClientProgramsList client={client} />

      <ClientApiAccess client={client} />

      <ClientActivityTimeline client={client} />
    </div>
  )
}
