"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ProgramsSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function ProgramsSearch({ searchTerm, onSearchChange }: ProgramsSearchProps) {
  return (
    <div className="flex mb-6 items-center">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search programs by name or ID..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  )
}
