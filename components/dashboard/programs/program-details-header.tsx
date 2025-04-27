"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Archive, Users, Calendar } from "lucide-react"
import type { Program } from "@/lib/program-service"

interface ProgramDetailsHeaderProps {
  program: Program
  onEditClick: () => void
}

export function ProgramDetailsHeader({ program, onEditClick }: ProgramDetailsHeaderProps) {
  const router = useRouter()
  const createdDate = new Date(program.created_at).toLocaleDateString()

  function getStatusBadge(status: string) {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="border-b pb-5 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">{program.name}</h2>
          <div className="ml-2">{getStatusBadge(program.status)}</div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created on {createdDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{program.total_enrolled_clients || 0} enrolled clients</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9" onClick={onEditClick}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Program
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
            >
              <Archive className="h-4 w-4 mr-2" />
              Archive Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
