"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TableCell, TableRow } from "@/components/ui/table"
import type { Program } from "@/lib/program-service"
import { Archive, Edit, Eye, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProgramTableRowProps {
  program: Program
  onEditClick: (program: Program) => void
}

export function ProgramTableRow({ program, onEditClick }: ProgramTableRowProps) {
  const router = useRouter()

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

  const handleViewDetails = () => {
    router.push(`/dashboard/programs/${program.uuid}`)
  }

  return (
    <TableRow>
      <TableCell>
        <div>
          <Button variant="link" className="p-0 h-auto font-medium" onClick={handleViewDetails}>
            {program.name}
          </Button>
          <div className="text-sm text-muted-foreground truncate max-w-[300px]">{program.description}</div>
        </div>
      </TableCell>
      <TableCell>{program.uuid}</TableCell>
      <TableCell>{program.total_enrolled_clients || 0}</TableCell>
      <TableCell>{program.created_at ? new Date(program.created_at).toLocaleDateString() : "N/A"}</TableCell>
      <TableCell>{getStatusBadge(program.status)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleViewDetails}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onEditClick(program)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Program
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Archive className="h-4 w-4 mr-2" />
              Archive Program
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
