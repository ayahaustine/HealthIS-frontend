"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClientService, type Client } from "@/lib/client-service"
import { EnrollmentService, type CreateEnrollmentRequest } from "@/lib/enrollment-service"
import { useToast } from "@/components/ui/use-toast"

interface ProgramAddClientsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  programId: string
  enrolledClientIds: string[]
  onClientsAdded: () => void
}

export function ProgramAddClientsDialog({
  open,
  onOpenChange,
  programId,
  enrolledClientIds,
  onClientsAdded,
}: ProgramAddClientsDialogProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [enrolling, setEnrolling] = useState(false)
  const { toast } = useToast()

  // Fetch available clients when dialog opens
  useEffect(() => {
    if (open) {
      fetchAvailableClients()
    } else {
      // Reset state when dialog closes
      setSelectedClientIds([])
      setSearchQuery("")
    }
  }, [open])

  // Filter clients based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredClients(clients)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredClients(
        clients.filter(
          (client) =>
            client.first_name.toLowerCase().includes(query) ||
            client.last_name.toLowerCase().includes(query) ||
            client.uuid.toLowerCase().includes(query) ||
            client.county.toLowerCase().includes(query) ||
            client.sub_county.toLowerCase().includes(query),
        ),
      )
    }
  }, [searchQuery, clients])

  const fetchAvailableClients = async () => {
    try {
      setLoading(true)
      const allClients = await ClientService.getClients()
      // Filter out clients that are already enrolled
      const availableClients = allClients.filter((client) => !enrolledClientIds.includes(client.uuid))
      setClients(availableClients)
      setFilteredClients(availableClients)
    } catch (error) {
      console.error("Failed to fetch clients:", error)
      toast({
        title: "Error",
        description: "Failed to fetch available clients",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSelectClient = (clientId: string) => {
    setSelectedClientIds((prev) =>
      prev.includes(clientId) ? prev.filter((id) => id !== clientId) : [...prev, clientId],
    )
  }

  const handleSelectAll = () => {
    if (selectedClientIds.length === filteredClients.length) {
      setSelectedClientIds([])
    } else {
      setSelectedClientIds(filteredClients.map((client) => client.uuid))
    }
  }

  const handleEnrollClients = async () => {
    if (selectedClientIds.length === 0) return

    try {
      setEnrolling(true)

      // Create enrollment requests for each selected client
      const enrollmentPromises = selectedClientIds.map((clientId) => {
        const enrollmentData: CreateEnrollmentRequest = {
          client: clientId,
          program: programId,
        }
        return EnrollmentService.createEnrollment(enrollmentData)
      })

      await Promise.all(enrollmentPromises)

      toast({
        title: "Success",
        description: `${selectedClientIds.length} client(s) enrolled successfully`,
      })

      onClientsAdded()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to enroll clients:", error)
      toast({
        title: "Error",
        description: "Failed to enroll clients",
        variant: "destructive",
      })
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Clients to Program</DialogTitle>
          <DialogDescription>
            Select clients to enroll in this program. You can select multiple clients.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search clients..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {clients.length === 0 ? "No available clients to enroll" : "No clients found matching your search"}
          </div>
        ) : (
          <>
            <div className="flex items-center py-2 px-1">
              <Checkbox
                id="select-all"
                checked={selectedClientIds.length > 0 && selectedClientIds.length === filteredClients.length}
                onCheckedChange={handleSelectAll}
              />
              <label htmlFor="select-all" className="ml-2 text-sm font-medium">
                Select all ({filteredClients.length})
              </label>
              {selectedClientIds.length > 0 && (
                <span className="ml-auto text-sm text-muted-foreground">{selectedClientIds.length} selected</span>
              )}
            </div>

            <ScrollArea className="h-[300px] border rounded-md">
              <div className="p-1">
                {filteredClients.map((client) => (
                  <div key={client.uuid} className="flex items-center py-2 px-2 hover:bg-muted/50 rounded-md">
                    <Checkbox
                      id={`client-${client.uuid}`}
                      checked={selectedClientIds.includes(client.uuid)}
                      onCheckedChange={() => handleSelectClient(client.uuid)}
                    />
                    <label htmlFor={`client-${client.uuid}`} className="ml-2 flex-1 cursor-pointer">
                      <div className="font-medium">
                        {client.first_name} {client.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {client.county}, {client.sub_county} • {client.gender === "M" ? "Male" : "Female"}
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={enrolling}>
            Cancel
          </Button>
          <Button onClick={handleEnrollClients} disabled={selectedClientIds.length === 0 || enrolling}>
            {enrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enroll {selectedClientIds.length > 0 ? `(${selectedClientIds.length})` : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
