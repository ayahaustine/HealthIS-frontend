import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, FileText, UserPlus, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Sample data
const clients = [
  {
    id: "CL-001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    programs: ["Diabetes Management", "Hypertension"],
    lastVisit: "2023-04-15",
    riskScore: "low",
  },
  {
    id: "CL-002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    programs: ["Prenatal Care"],
    lastVisit: "2023-04-18",
    riskScore: "medium",
  },
  {
    id: "CL-003",
    name: "Michael Brown",
    age: 67,
    gender: "Male",
    programs: ["Cardiac Rehabilitation", "Hypertension"],
    lastVisit: "2023-04-10",
    riskScore: "high",
  },
  {
    id: "CL-004",
    name: "Emily Davis",
    age: 28,
    gender: "Female",
    programs: ["Mental Health"],
    lastVisit: "2023-04-05",
    riskScore: "low",
  },
  {
    id: "CL-005",
    name: "Robert Wilson",
    age: 52,
    gender: "Male",
    programs: ["Diabetes Management"],
    lastVisit: "2023-04-12",
    riskScore: "medium",
  },
  {
    id: "CL-006",
    name: "Jennifer Lee",
    age: 41,
    gender: "Female",
    programs: ["Hypertension", "Weight Management"],
    lastVisit: "2023-04-17",
    riskScore: "low",
  },
  {
    id: "CL-007",
    name: "David Martinez",
    age: 59,
    gender: "Male",
    programs: ["Cardiac Rehabilitation"],
    lastVisit: "2023-04-08",
    riskScore: "high",
  },
  {
    id: "CL-008",
    name: "Lisa Taylor",
    age: 36,
    gender: "Female",
    programs: ["Prenatal Care"],
    lastVisit: "2023-04-14",
    riskScore: "medium",
  },
]

function getRiskBadge(risk: string) {
  switch (risk) {
    case "high":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> High Risk
        </Badge>
      )
    case "medium":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Medium Risk
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Low Risk
        </Badge>
      )
  }
}

export default function ClientsPage() {
  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Client Database</CardTitle>
          <CardDescription>View and manage all registered clients in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search clients..." className="w-full pl-8" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Risk Level</DropdownMenuItem>
                  <DropdownMenuItem>Program</DropdownMenuItem>
                  <DropdownMenuItem>Last Visit</DropdownMenuItem>
                  <DropdownMenuItem>Gender</DropdownMenuItem>
                  <DropdownMenuItem>Age Group</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Programs</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={`/abstract-geometric-shapes.png?height=40&width=40&query=${client.name}`}
                            alt={client.name}
                          />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {client.age} yrs, {client.gender}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {client.programs.map((program) => (
                          <Badge key={program} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(client.lastVisit).toLocaleDateString()}</TableCell>
                    <TableCell>{getRiskBadge(client.riskScore)}</TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/clients/${client.id}`}>View Profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Enroll in Program</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Archive Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
