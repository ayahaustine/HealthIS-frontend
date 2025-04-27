"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Client } from "@/lib/client-service"
import { ClientTableRow } from "./client-table-row"

interface ClientsTableProps {
  clients: Client[]
  loading: boolean
  error: string | null
  searchTerm: string
  programsAvailable: boolean
  onEnrollClick: (client: Client) => void
}

export function ClientsTable({
  clients,
  loading,
  error,
  searchTerm,
  programsAvailable,
  onEnrollClick,
}: ClientsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading clients...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Programs</TableHead>
            <TableHead>Enrolled At</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No clients match your search" : "No clients found"}
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <ClientTableRow
                key={client.uuid}
                client={client}
                onEnrollClick={onEnrollClick}
                programsAvailable={programsAvailable}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
