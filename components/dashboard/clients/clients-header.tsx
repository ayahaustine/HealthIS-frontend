import Link from "next/link"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ClientsHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-muted-foreground">Manage and view all client records</p>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-2">
        <Link href="/dashboard/clients/register">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Register New Client
          </Button>
        </Link>
      </div>
    </div>
  )
}
