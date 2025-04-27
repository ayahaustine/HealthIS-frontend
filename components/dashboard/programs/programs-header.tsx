"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface ProgramsHeaderProps {
  onAddProgram: () => void
}

export function ProgramsHeader({ onAddProgram }: ProgramsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
        <p className="text-muted-foreground">Manage and view all health programs</p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <Button onClick={onAddProgram}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>
    </div>
  )
}
