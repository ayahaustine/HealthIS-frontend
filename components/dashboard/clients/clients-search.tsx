"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, Loader2 } from "lucide-react"
import { exportToCSV } from "@/lib/csv-export"
import type { Client } from "@/lib/client-service"
import { useToast } from "@/components/ui/use-toast"

interface ClientsSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  clients?: Client[] // Make clients optional
}

export function ClientsSearch({ searchTerm, onSearchChange, clients = [] }: ClientsSearchProps) {
  const [exporting, setExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    if (!clients || clients.length === 0) {
      toast({
        title: "No Data",
        description: "There are no clients to export",
        variant: "destructive",
      })
      return
    }

    try {
      setExporting(true)

      // Prepare data for CSV export
      const data = clients.map((client) => ({
        ID: client.uuid,
        "First Name": client.first_name,
        "Last Name": client.last_name,
        Age: client.age,
        Gender: client.gender === "M" ? "Male" : client.gender === "F" ? "Female" : "Other",
        "Phone Number": client.phone_number,
        County: client.county,
        "Sub County": client.sub_county,
        Programs: client.programs.map((p) => p.name).join(", ") || "None",
        "Created At": new Date(client.created_at).toLocaleDateString(),
        "Created By": client.created_by,
      }))

      // Export to CSV
      await exportToCSV(data, "clients-export")

      toast({
        title: "Export Successful",
        description: `${clients.length} clients exported to CSV`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error exporting clients:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting clients to CSV",
        variant: "destructive",
      })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search clients..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          disabled={exporting || !clients || clients.length === 0}
        >
          {exporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Export CSV
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
