"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type Program, ProgramService } from "@/lib/program-service"
import { useToast } from "@/components/ui/use-toast"
import { eventBus, EVENTS } from "@/lib/event-bus"
import { ProgramsHeader } from "@/components/dashboard/programs/programs-header"
import { ProgramsSearch } from "@/components/dashboard/programs/programs-search"
import { ProgramsTable } from "@/components/dashboard/programs/programs-table"
import { ProgramCreateDialog } from "@/components/dashboard/programs/program-create-dialog"
import { ProgramEditDialog } from "@/components/dashboard/programs/program-edit-dialog"

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createFormData, setCreateFormData] = useState({
    name: "",
    description: "",
  })
  const [editFormData, setEditFormData] = useState({
    uuid: "",
    name: "",
    description: "",
  })
  const [currentPage, setCurrentPage] = useState(1)

  const { toast } = useToast()

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true)
        const data = await ProgramService.getPrograms()
        setPrograms(data)
        setFilteredPrograms(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching programs:", err)
        setError("Failed to load programs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  // Filter programs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPrograms(programs)
    } else {
      const filtered = programs.filter(
        (program) =>
          program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          program.uuid.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredPrograms(filtered)
    }
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchTerm, programs])

  // Handle create form input changes
  const handleCreateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCreateFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle edit form input changes
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Open edit dialog with program data
  const handleEditClick = (program: Program) => {
    setEditFormData({
      uuid: program.uuid,
      name: program.name,
      description: program.description,
    })
    setIsEditDialogOpen(true)
  }

  // Handle create form submission
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!createFormData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Program name is required",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const newProgram = await ProgramService.createProgram({
        name: createFormData.name,
        description: createFormData.description,
      })

      // Add the new program to the list
      setPrograms((prev) => [newProgram, ...prev])

      // Publish event to notify sidebar about the new program
      eventBus.publish(EVENTS.PROGRAM_CREATED, newProgram)

      // Reset form and close dialog
      setCreateFormData({ name: "", description: "" })
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Program created successfully",
      })
    } catch (err) {
      console.error("Error creating program:", err)
      toast({
        title: "Error",
        description: "Failed to create program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)
      const updatedProgram = await ProgramService.updateProgram(editFormData.uuid, {
        description: editFormData.description,
      })

      // Update the program in the list
      setPrograms((prev) => prev.map((program) => (program.uuid === updatedProgram.uuid ? updatedProgram : program)))

      // Close dialog
      setIsEditDialogOpen(false)

      toast({
        title: "Success",
        description: "Program updated successfully",
      })
    } catch (err) {
      console.error("Error updating program:", err)
      toast({
        title: "Error",
        description: "Failed to update program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <ProgramsHeader onAddProgram={() => setIsCreateDialogOpen(true)} />

      <ProgramCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        formData={createFormData}
        onInputChange={handleCreateInputChange}
        onSubmit={handleCreateSubmit}
        isSubmitting={isSubmitting}
      />

      <ProgramEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={editFormData}
        onInputChange={handleEditInputChange}
        onSubmit={handleEditSubmit}
        isSubmitting={isSubmitting}
      />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Health Programs</CardTitle>
          <CardDescription>View and manage all health programs in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgramsSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <ProgramsTable
            programs={filteredPrograms}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onEditClick={handleEditClick}
          />
        </CardContent>
      </Card>
    </div>
  )
}
