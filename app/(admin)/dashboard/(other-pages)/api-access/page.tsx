import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key, Copy, Code, FileJson, AlertTriangle, FileText } from "lucide-react"

// Sample API keys
const apiKeys = [
  {
    id: "key_1a2b3c4d5e6f",
    name: "Production API Key",
    created: "2023-01-15",
    lastUsed: "2023-04-20",
    status: "active",
    permissions: ["read", "write"],
  },
  {
    id: "key_7g8h9i0j1k2l",
    name: "Development API Key",
    created: "2023-02-10",
    lastUsed: "2023-04-19",
    status: "active",
    permissions: ["read"],
  },
  {
    id: "key_3m4n5o6p7q8r",
    name: "Testing API Key",
    created: "2023-03-05",
    lastUsed: "2023-04-15",
    status: "revoked",
    permissions: ["read"],
  },
]

// Sample API usage data
const apiUsageData = [
  { date: "2023-04-01", requests: 1245 },
  { date: "2023-04-02", requests: 1322 },
  { date: "2023-04-03", requests: 1176 },
  { date: "2023-04-04", requests: 1288 },
  { date: "2023-04-05", requests: 1433 },
  { date: "2023-04-06", requests: 1567 },
  { date: "2023-04-07", requests: 1689 },
  { date: "2023-04-08", requests: 1432 },
  { date: "2023-04-09", requests: 1256 },
  { date: "2023-04-10", requests: 1378 },
]

export default function ApiAccessPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Access</h1>
          <p className="text-muted-foreground">Manage API keys and access to the Health Information System</p>
        </div>
        <div className="mt-4 md:mt-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>
                <Key className="mr-2 h-4 w-4" />
                Generate New API Key
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Generate New API Key</AlertDialogTitle>
                <AlertDialogDescription>
                  This will create a new API key for accessing the Health Information System. Make sure to save your API
                  key as it will only be shown once.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input id="key-name" placeholder="Enter a name for this API key" />
                </div>
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="permission-read" className="rounded border-gray-300" />
                    <Label htmlFor="permission-read" className="font-normal">
                      Read
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="permission-write" className="rounded border-gray-300" />
                    <Label htmlFor="permission-write" className="font-normal">
                      Write
                    </Label>
                  </div>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Generate Key</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="keys" className="space-y-4">
        <TabsList>
          <TabsTrigger value="keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            Usage
          </TabsTrigger>
        </TabsList>

        <TabsContent value="keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for accessing the Health Information System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Key</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell className="font-medium">{key.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                              {key.id.substring(0, 8)}...
                            </code>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy API key</span>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(key.created).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(key.lastUsed).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {key.permissions.includes("read") && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Read
                              </Badge>
                            )}
                            {key.permissions.includes("write") && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                Write
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {key.status === "active" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Revoked
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {key.status === "active" ? (
                            <Button variant="destructive" size="sm">
                              Revoke
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" disabled>
                              Revoked
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to integrate with the Health Information System API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Getting Started</h3>
                <p className="text-muted-foreground">
                  The Health Information System API allows you to programmatically access client data, program
                  information, and other resources. All API requests must include your API key in the Authorization
                  header.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Authentication</h3>
                <div className="bg-muted p-4 rounded-md">
                  <code className="text-sm font-mono">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Base URL</h3>
                <div className="bg-muted p-4 rounded-md">
                  <code className="text-sm font-mono">https://api.healthis.example.com/v1</code>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Available Endpoints</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Clients</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                      <li>GET /clients - List all clients</li>
                      <li>GET /clients/:id - Get a specific client</li>
                      <li>POST /clients - Create a new client</li>
                      <li>PUT /clients/:id - Update a client</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Programs</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                      <li>GET /programs - List all programs</li>
                      <li>GET /programs/:id - Get a specific program</li>
                      <li>GET /programs/:id/clients - List clients in a program</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium">Enrollments</h4>
                    <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
                      <li>POST /enrollments - Enroll a client in a program</li>
                      <li>DELETE /enrollments/:id - Remove a client from a program</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" className="mt-4">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Full Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Monitor your API usage and rate limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Requests (30 days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42,657</div>
                    <p className="text-xs text-muted-foreground">+8.2% from previous period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Average Daily Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,422</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Rate Limit Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">14.2%</div>
                    <p className="text-xs text-muted-foreground">Of 10,000 requests/day</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Recent API Errors</h3>
                <Card className="border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">401 Unauthorized</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          3 occurrences in the last 24 hours. Last seen at 2023-04-20 14:32:15.
                        </p>
                        <p className="text-sm mt-2">
                          This error occurs when an invalid API key is provided or when the key has been revoked.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Endpoint Usage</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Requests (30 days)</TableHead>
                        <TableHead>Average Response Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">GET /clients</TableCell>
                        <TableCell>15,432</TableCell>
                        <TableCell>124ms</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">GET /clients/:id</TableCell>
                        <TableCell>12,876</TableCell>
                        <TableCell>98ms</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">GET /programs</TableCell>
                        <TableCell>8,543</TableCell>
                        <TableCell>112ms</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">POST /enrollments</TableCell>
                        <TableCell>3,245</TableCell>
                        <TableCell>187ms</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">PUT /clients/:id</TableCell>
                        <TableCell>2,561</TableCell>
                        <TableCell>156ms</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
