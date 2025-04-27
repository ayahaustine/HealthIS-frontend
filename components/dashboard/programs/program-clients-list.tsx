"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Program } from "@/lib/program-service"
import { Search, UserPlus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ProgramAddClientsDialog } from "./program-add-clients-dialog"

interface ProgramClientsListProps {
  program: Program
  onClientsUpdated: () => void
}

export function ProgramClientsList({ program, onClientsUpdated }: ProgramClientsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false)

  const filteredClients =
    program.clients?.filter((client) => {
      const searchTerms = searchQuery.toLowerCase()
      return (
        client.first_name.toLowerCase().includes(searchTerms) ||
        client.last_name.toLowerCase().includes(searchTerms) ||
        client.uuid.toLowerCase().includes(searchTerms) ||
        client.county.toLowerCase().includes(searchTerms) ||
        client.sub_county.toLowerCase().includes(searchTerms)
      )
    }) || []

  // Get array of enrolled client IDs
  const enrolledClientIds = program.clients?.map((client) => client.uuid) || []

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Enrolled Clients
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-[200px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button size="sm" className="h-9" onClick={() => setIsAddClientDialogOpen(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Name</TableHead>
                <TableHead className="font-medium">Client ID</TableHead>
                <TableHead className="font-medium">Gender</TableHead>
                <TableHead className="font-medium">Date of Birth</TableHead>
                <TableHead className="font-medium">County</TableHead>
                <TableHead className="font-medium">Sub-County</TableHead>
                <TableHead className="font-medium">Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    {program.clients?.length === 0
                      ? "No clients enrolled in this program."
                      : "No clients found matching your search."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.uuid} className="hover:bg-muted/50">
                    <TableCell>
                      <Link
                        href={`/dashboard/clients/${client.uuid}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {client.first_name} {client.last_name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{client.uuid}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          client.gender === "M"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-pink-50 text-pink-700 border-pink-200"
                        }
                      >
                        {client.gender === "M" ? "Male" : client.gender === "F" ? "Female" : client.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(client.dob).toLocaleDateString()}</TableCell>
                    <TableCell>{client.county}</TableCell>
                    <TableCell>{client.sub_county}</TableCell>
                    <TableCell>{client.phone_number}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <div>
            Showing <span className="font-medium">{filteredClients.length}</span> of{" "}
            <span className="font-medium">{program.clients?.length || 0}</span> clients
          </div>
        </div>

        <ProgramAddClientsDialog
          open={isAddClientDialogOpen}
          onOpenChange={setIsAddClientDialogOpen}
          programId={program.uuid}
          enrolledClientIds={enrolledClientIds}
          onClientsAdded={onClientsUpdated}
        />
      </CardContent>
    </Card>
  )
}
