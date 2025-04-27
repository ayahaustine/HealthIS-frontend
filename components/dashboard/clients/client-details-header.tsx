"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Trash2, UserRound } from "lucide-react"
import type { Client } from "@/lib/client-service"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ClientService } from "@/lib/client-service"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface ClientDetailsHeaderProps {
  client: Client
  onBack: () => void
}

export function ClientDetailsHeader({ client, onBack }: ClientDetailsHeaderProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const fullName = `${client.first_name} ${client.last_name}`

  // Determine risk level based on programs
  const getRiskLevel = () => {
    if (client.programs.some((p) => p.name.toLowerCase().includes("hiv"))) {
      return "high"
    } else if (client.programs.length >= 2) {
      return "medium"
    }
    return "low"
  }

  const riskLevel = getRiskLevel()
  const riskBadgeVariant = riskLevel === "high" ? "destructive" : riskLevel === "medium" ? "warning" : "outline"

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await ClientService.deleteClient(client.uuid)
      toast({
        title: "Client deleted",
        description: `${fullName} has been deleted successfully.`,
      })
      router.push("/dashboard/clients")
    } catch (error) {
      console.error("Failed to delete client:", error)
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/clients">Clients</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fullName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full">
            <UserRound className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {fullName}
              <Badge variant={riskBadgeVariant} className="ml-2">
                {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
              </Badge>
            </h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <span className="font-mono">{client.uuid}</span>
              <span className="text-xs">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(client.created_at).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" onClick={onBack} className="mr-auto sm:mr-0">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this client?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {fullName}'s record and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
