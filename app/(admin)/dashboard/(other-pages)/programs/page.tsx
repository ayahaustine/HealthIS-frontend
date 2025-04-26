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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, MoreHorizontal, FileText } from "lucide-react"

// Sample data
const programs = [
  {
    id: "PRG-001",
    name: "Diabetes Management",
    description: "Comprehensive program for managing diabetes through medication, diet, and lifestyle changes.",
    enrolledClients: 124,
    status: "active",
    startDate: "2022-01-15",
  },
  {
    id: "PRG-002",
    name: "Hypertension Control",
    description: "Program focused on blood pressure management and cardiovascular health.",
    enrolledClients: 98,
    status: "active",
    startDate: "2022-02-10",
  },
  {
    id: "PRG-003",
    name: "Prenatal Care",
    description: "Comprehensive care for pregnant women including regular check-ups, screenings, and education.",
    enrolledClients: 45,
    status: "active",
    startDate: "2022-03-05",
  },
  {
    id: "PRG-004",
    name: "Mental Health Support",
    description: "Program providing therapy, medication management, and support for mental health conditions.",
    enrolledClients: 67,
    status: "active",
    startDate: "2022-04-20",
  },
  {
    id: "PRG-005",
    name: "Cardiac Rehabilitation",
    description: "Supervised program to help patients recover from heart attacks, heart surgery, or heart failure.",
    enrolledClients: 32,
    status: "active",
    startDate: "2022-05-12",
  },
  {
    id: "PRG-006",
    name: "Weight Management",
    description: "Program focused on healthy weight loss and maintenance through diet and exercise.",
    enrolledClients: 78,
    status: "active",
    startDate: "2022-06-08",
  },
  {
    id: "PRG-007",
    name: "Smoking Cessation",
    description: "Program to help patients quit smoking through counseling and medication.",
    enrolledClients: 23,
    status: "inactive",
    startDate: "2022-07-15",
  },
  {
    id: "PRG-008",
    name: "Substance Abuse Recovery",
    description: "Comprehensive program for recovery from substance abuse disorders.",
    enrolledClients: 19,
    status: "active",
    startDate: "2022-08-22",
  },
]

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

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
          <p className="text-muted-foreground">Manage and view all health programs</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Program</DialogTitle>
                <DialogDescription>Add a new health program to the system</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="program-name">Program Name</Label>
                  <Input id="program-name" placeholder="Enter program name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="program-description">Description</Label>
                  <Textarea id="program-description" placeholder="Enter program description" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="program-start-date">Start Date</Label>
                  <Input id="program-start-date" type="date" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Program</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Health Programs</CardTitle>
          <CardDescription>View and manage all health programs in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search programs..." className="w-full pl-8" />
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
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Start Date</DropdownMenuItem>
                  <DropdownMenuItem>Enrollment Count</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Program Name</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Enrolled Clients</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programs.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{program.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                          {program.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{program.id}</TableCell>
                    <TableCell>{program.enrolledClients}</TableCell>
                    <TableCell>{new Date(program.startDate).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Program</DropdownMenuItem>
                          <DropdownMenuItem>View Enrolled Clients</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            {program.status === "active" ? "Deactivate Program" : "Activate Program"}
                          </DropdownMenuItem>
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
