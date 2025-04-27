"use client"

import { useEffect, useState } from "react"
import { type Program, ProgramService } from "@/lib/program-service"
import { ProgramDetailsHeader } from "@/components/dashboard/programs/program-details-header"
import { ProgramDetailsInfo } from "@/components/dashboard/programs/program-details-info"
import { ProgramClientsList } from "@/components/dashboard/programs/program-clients-list"
import { ProgramEditDialog } from "@/components/dashboard/programs/program-edit-dialog"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"

interface ProgramDetailsPageProps {
  params: {
    uuid: string
  }
}

export default function ProgramDetailsPage({ params }: ProgramDetailsPageProps) {
  const { uuid } = params
  const [program, setProgram] = useState<Program | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const { toast } = useToast()

  const fetchProgramDetails = async () => {
    try {
      setLoading(true)
      const programData = await ProgramService.getProgram(uuid)
      setProgram(programData)
      setError(null)
    } catch (err) {
      console.error("Error fetching program details:", err)
      setError("Failed to load program details. Please try again.")
      toast({
        title: "Error",
        description: "Failed to load program details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProgramDetails()
  }, [uuid])

  const handleProgramUpdate = async (data: { description: string }) => {
    if (!program) return

    try {
      const updatedProgram = await ProgramService.updateProgram(program.uuid, data)
      setProgram(updatedProgram)
      setIsEditDialogOpen(false)
      toast({
        title: "Success",
        description: "Program updated successfully",
      })
    } catch (err) {
      console.error("Error updating program:", err)
      toast({
        title: "Error",
        description: "Failed to update program",
        variant: "destructive",
      })
    }
  }

  const handleClientsUpdated = () => {
    fetchProgramDetails()
  }

  if (loading) {
    // The loading component will be shown automatically by Next.js
    return null
  }

  if (error || !program) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load program</h2>
          <p className="text-muted-foreground mb-4">{error || "Program not found"}</p>
          <button className="text-primary hover:underline" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <ProgramDetailsHeader program={program} onEditClick={() => setIsEditDialogOpen(true)} />
      <ProgramDetailsInfo program={program} />
      <ProgramClientsList program={program} onClientsUpdated={handleClientsUpdated} />

      {isEditDialogOpen && (
        <ProgramEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          program={program}
          onSubmit={handleProgramUpdate}
        />
      )}
    </div>
  )
}
