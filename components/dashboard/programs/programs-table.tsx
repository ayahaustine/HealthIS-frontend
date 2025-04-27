"use client"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Program } from "@/lib/program-service"
import { Loader2 } from "lucide-react"
import { ProgramTableRow } from "./program-table-row"

interface ProgramsTableProps {
  programs: Program[]
  loading: boolean
  error: string | null
  searchTerm: string
  currentPage: number
  setCurrentPage: (page: number) => void
  onEditClick: (program: Program) => void
}

export function ProgramsTable({
  programs,
  loading,
  error,
  searchTerm,
  currentPage,
  setCurrentPage,
  onEditClick,
}: ProgramsTableProps) {
  const itemsPerPage = 5
  const totalPages = Math.ceil(programs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = programs.slice(startIndex, endIndex)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pages.push("ellipsis-start")
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push("ellipsis-end")
      } else {
        pages.push(i)
      }
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    // Remove duplicates and ellipsis if not needed
    return Array.from(new Set(pages)).filter((page, index, array) => {
      if (page === "ellipsis-start" && array[index + 1] === 2) return false
      if (page === "ellipsis-end" && array[index - 1] === totalPages - 1) return false
      return true
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  if (programs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchTerm ? "No programs match your search" : "No programs found"}
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Enrolled Clients</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((program) => (
              <ProgramTableRow key={program.uuid} program={program} onEditClick={onEditClick} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, programs.length)} of {programs.length} programs
        </p>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis-start" || page === "ellipsis-end" ? (
                  <div className="px-2">...</div>
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(page as number)
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}
