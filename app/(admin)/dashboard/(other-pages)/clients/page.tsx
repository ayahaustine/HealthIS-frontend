"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { type Client, ClientService } from "@/lib/client-service"
import { ProgramService } from "@/lib/program-service"
import { type CreateEnrollmentRequest, EnrollmentService } from "@/lib/enrollment-service"

import { ClientsHeader } from "@/components/dashboard/clients/clients-header"
import { ClientsSearch } from "@/components/dashboard/clients/clients-search"
import { ClientsTable } from "@/components/dashboard/clients/clients-table"
import { ClientsPagination } from "@/components/dashboard/clients/clients-pagination"
import { EnrollmentDialog } from "@/components/dashboard/clients/enrollment-dialog"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [programs, setPrograms] = useState<any[]>([])
  const [loadingPrograms, setLoadingPrograms] = useState(false)
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const { toast } = useToast()

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true)
        const data = await ClientService.getClients()
        setClients(data)
        setError(null)
      } catch (err) {
        setError("Failed to load clients. Please try again later.")
        console.error("Error fetching clients:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  useEffect(() => {
    fetchPrograms()
  }, [])

  async function fetchPrograms() {
    try {
      setLoadingPrograms(true)
      const data = await ProgramService.getPrograms()
      setPrograms(data)
    } catch (err) {
      console.error("Error fetching programs:", err)
      toast({
        title: "Error",
        description: "Failed to load programs. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoadingPrograms(false)
    }
  }

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // Filter clients based on search term
  const filteredClients = clients.filter((client) => {
    const fullName = `${client.first_name} ${client.last_name}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase()) || client.uuid.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const openEnrollDialog = (client: Client) => {
    setSelectedClient(client)
    setEnrollDialogOpen(true)
  }

  const onSubmitEnrollment = async (data: { program: string }) => {
    if (!selectedClient) return

    try {
      setIsEnrolling(true)

      const enrollmentData: CreateEnrollmentRequest = {
        client: selectedClient.uuid,
        program: data.program,
      }

      await EnrollmentService.createEnrollment(enrollmentData)

      // Refresh client data after successful enrollment
      const updatedClient = await ClientService.getClient(selectedClient.uuid)

      // Update the client in the clients list
      setClients((prevClients) =>
        prevClients.map((client) => (client.uuid === updatedClient.uuid ? updatedClient : client)),
      )

      toast({
        title: "Success",
        description: `${selectedClient.first_name} ${selectedClient.last_name} has been enrolled in the program.`,
        variant: "default",
      })

      setEnrollDialogOpen(false)
    } catch (err) {
      console.error("Error enrolling client in program:", err)
      toast({
        title: "Error",
        description: "Failed to enroll client in program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEnrolling(false)
    }
  }

  return (
    <div className="space-y-6">
      <ClientsHeader />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Client Database</CardTitle>
          <CardDescription>View and manage all registered clients in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientsSearch
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            clients={filteredClients} // Pass the filtered clients array
          />

          <ClientsTable
            clients={currentClients}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            programsAvailable={programs.length > 0}
            onEnrollClick={openEnrollDialog}
          />

          {!loading && !error && filteredClients.length > 0 && (
            <ClientsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredClients.length}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>

      <EnrollmentDialog
        open={enrollDialogOpen}
        onOpenChange={setEnrollDialogOpen}
        client={selectedClient}
        programs={programs}
        loadingPrograms={loadingPrograms}
        isEnrolling={isEnrolling}
        onSubmit={onSubmitEnrollment}
      />
    </div>
  )
}
