"use client"

import { format } from "date-fns"
import { Eye, Plus, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Client } from "@/lib/client-service"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ClientTableRowProps {
  client: Client
  onEnrollClick: (client: Client) => void
  programsAvailable: boolean
}

export function ClientTableRow({ client, onEnrollClick, programsAvailable }: ClientTableRowProps) {
  // Determine risk based on programs
  const getRiskBadge = (programs: any[]) => {
    const hasHIV = programs.some((p) => p.name.includes("HIV"))

    if (hasHIV) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> High Risk
        </Badge>
      )
    } else if (programs.length >= 2) {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Medium Risk
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Low Risk
        </Badge>
      )
    }
  }

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`/abstract-geometric-shapes.png?height=40&width=40&query=${client.first_name} ${client.last_name}`}
              alt={`${client.first_name} ${client.last_name}`}
            />
            <AvatarFallback>
              {client.first_name[0]}
              {client.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {client.first_name} {client.last_name}
            </div>
            <div className="text-sm text-muted-foreground">
              {client.age} yrs, {client.gender === "M" ? "Male" : client.gender === "F" ? "Female" : "Other"}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{client.uuid}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {client.programs.map((program) => (
            <Badge key={program.uuid} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {program.name}
            </Badge>
          ))}
          {client.programs.length === 0 && <span className="text-sm text-muted-foreground">No programs</span>}
        </div>
      </TableCell>
      <TableCell>
        {client.programs.length > 0 ? format(new Date(client.programs[0].enrolled_at), "MMM d, yyyy") : "Not enrolled"}
      </TableCell>
      <TableCell>{getRiskBadge(client.programs)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/dashboard/clients/${client.uuid}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Client</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Client</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => onEnrollClick(client)} disabled={!programsAvailable}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Enroll in Program</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{programsAvailable ? "Enroll in Program" : "No available programs"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  )
}
