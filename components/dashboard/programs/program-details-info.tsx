import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, User, Calendar, CheckCircle } from "lucide-react"
import type { Program } from "@/lib/program-service"

interface ProgramDetailsInfoProps {
  program: Program
}

export function ProgramDetailsInfo({ program }: ProgramDetailsInfoProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Program Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Program ID</p>
              <p className="font-mono text-sm bg-muted px-2 py-1 rounded">{program.uuid}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Created By</p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <p>{program.created_by}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="bg-muted/50 p-3 rounded-md">{program.description}</p>
          </div>

          <div className="space-y-1 pt-2">
            <p className="text-sm font-medium text-muted-foreground">Created At</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p>
                {new Date(program.created_at).toLocaleDateString()} {new Date(program.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Enrollment Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <p className="text-sm font-medium text-blue-700 mb-1">Total Clients</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-blue-700">{program.total_enrolled_clients || 0}</p>
                <p className="text-sm text-blue-600 mb-1">enrolled</p>
              </div>
            </div>
            <div
              className={`border rounded-lg p-4 ${
                program.status === "active"
                  ? "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
                  : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200"
              }`}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  program.status === "active" ? "text-green-700" : "text-gray-700"
                }`}
              >
                Program Status
              </p>
              <div className="flex items-end gap-2">
                <p
                  className={`text-3xl font-bold capitalize ${
                    program.status === "active" ? "text-green-700" : "text-gray-700"
                  }`}
                >
                  {program.status}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 border rounded-lg p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Client Gender Distribution</p>
              <div className="flex items-center gap-2">
                <div
                  className="h-4 bg-blue-500 rounded"
                  style={{
                    width: `${calculateGenderPercentage(program.clients, "M")}%`,
                  }}
                ></div>
                <span className="text-xs text-muted-foreground">{calculateGenderCount(program.clients, "M")} Male</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-4 bg-pink-500 rounded"
                  style={{
                    width: `${calculateGenderPercentage(program.clients, "F")}%`,
                  }}
                ></div>
                <span className="text-xs text-muted-foreground">
                  {calculateGenderCount(program.clients, "F")} Female
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function calculateGenderCount(clients: any[] | undefined, gender: string): number {
  if (!clients || !clients.length) return 0
  return clients.filter((client) => client.gender === gender).length
}

function calculateGenderPercentage(clients: any[] | undefined, gender: string): number {
  if (!clients || !clients.length) return 0
  const count = calculateGenderCount(clients, gender)
  return Math.round((count / clients.length) * 100)
}
