"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { EnrollmentDialog } from "@/components/dashboard/clients/enrollment-dialog"
import { ProgramService } from "@/lib/program-service"
import { EnrollmentService } from "@/lib/enrollment-service"
import { ClientService, type Client } from "@/lib/client-service"

interface ClientProgramsListProps {
  client: Client
}

export function ClientProgramsList({ client }: ClientProgramsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [programs, setPrograms] = useState<any[]>([])
  const [loadingPrograms, setLoadingPrograms] = useState(false)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [currentClient, setCurrentClient] = useState<Client>(client)

  const handleEnrollClick = async () => {
    try {
      setLoadingPrograms(true)
      const allPrograms = await ProgramService.getPrograms()
      setPrograms(allPrograms)
      setIsDialogOpen(true)
    } catch (error) {
      console.error("Failed to fetch programs:", error)
      toast({
        title: "Error",
        description: "Failed to load programs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoadingPrograms(false)
    }
  }

  const handleEnrollSubmit = async (values: { program: string }) => {
    try {
      setIsEnrolling(true)
      await EnrollmentService.createEnrollment({
        client: client.uuid,
        program: values.program,
      })

      // Refresh client data to show the new program
      const updatedClient = await ClientService.getClient(client.uuid)
      setCurrentClient(updatedClient)

      toast({
        title: "Success",
        description: "Client enrolled in program successfully.",
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to enroll client:", error)
      toast({
        title: "Error",
        description: "Failed to enroll client in program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsEnrolling(false)
    }
  }

  // Check if there are available programs to enroll in
  const hasAvailablePrograms = () => {
    if (programs.length === 0) return false

    const clientProgramIds = currentClient.programs.map((p) => p.uuid)
    return programs.some((program) => !clientProgramIds.includes(program.uuid))
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Enrolled Programs</CardTitle>
            <CardDescription>Programs this client is currently enrolled in</CardDescription>
          </div>
          <Button size="sm" onClick={handleEnrollClick}>
            <Plus className="h-4 w-4 mr-1" /> Enroll in Program
          </Button>
        </CardHeader>
        <CardContent>
          {currentClient.programs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              This client is not enrolled in any programs yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentClient.programs.map((program) => (
                <Card key={program.uuid} className="overflow-hidden">
                  <div className="bg-primary h-1" />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{program.name}</h3>
                      <Badge variant={program.status === "active" ? "outline" : "secondary"}>{program.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{program.description}</p>
                    <div className="text-xs text-muted-foreground">
                      Enrolled: {format(new Date(program.enrolled_at), "MMM d, yyyy")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <EnrollmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        client={currentClient}
        programs={programs}
        loadingPrograms={loadingPrograms}
        isEnrolling={isEnrolling}
        onSubmit={handleEnrollSubmit}
      />
    </>
  )
}
