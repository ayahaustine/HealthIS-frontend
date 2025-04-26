"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, FileText, Users, Activity, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface SearchResultsProps {
  query: string
  type: "all" | "clients" | "programs" | "documents"
}

export function SearchResults({ query, type }: SearchResultsProps) {
  // Mock data - in a real app, this would come from an API call
  const clientResults = [
    {
      id: "CL-001",
      name: "John Smith",
      age: 45,
      gender: "Male",
      programs: ["Diabetes Management", "Hypertension"],
      riskScore: "low",
    },
    {
      id: "CL-003",
      name: "Michael Brown",
      age: 67,
      gender: "Male",
      programs: ["Cardiac Rehabilitation", "Hypertension"],
      riskScore: "high",
    },
    {
      id: "CL-005",
      name: "Robert Wilson",
      age: 52,
      gender: "Male",
      programs: ["Diabetes Management"],
      riskScore: "medium",
    },
  ]

  const programResults = [
    {
      id: "PRG-001",
      name: "Diabetes Management",
      description: "Comprehensive program for managing diabetes through medication, diet, and lifestyle changes.",
      enrolledClients: 124,
    },
    {
      id: "PRG-002",
      name: "Hypertension Control",
      description: "Program focused on blood pressure management and cardiovascular health.",
      enrolledClients: 98,
    },
  ]

  const documentResults = [
    {
      id: "DOC-001",
      title: "Diabetes Management Protocol",
      type: "PDF",
      lastUpdated: "2023-04-15",
    },
    {
      id: "DOC-002",
      title: "Hypertension Treatment Guidelines",
      type: "PDF",
      lastUpdated: "2023-03-22",
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
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800"
          >
            Medium Risk
          </Badge>
        )
      default:
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
          >
            Low Risk
          </Badge>
        )
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
      {(type === "all" || type === "clients") && clientResults.length > 0 && (
        <div className="space-y-4">
          {type === "all" && (
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-medium">Clients</h3>
            </div>
          )}
          <motion.div className="grid gap-4" variants={container}>
            {clientResults.map((client, index) => (
              <motion.div key={client.id} variants={item}>
                <Card className="overflow-hidden hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between p-4 relative">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`/abstract-geometric-shapes.png?height=40&width=40&query=${client.name}`} />
                          <AvatarFallback>
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{client.name}</h4>
                            <span className="ml-2 text-sm text-muted-foreground">({client.id})</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {client.age} yrs, {client.gender}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {client.programs.map((program) => (
                              <Badge
                                key={program}
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                              >
                                {program}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getRiskBadge(client.riskScore)}
                        <Button size="sm" variant="outline" className="gap-1">
                          View Profile <ChevronRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {(type === "all" || type === "programs") && programResults.length > 0 && (
        <div className="space-y-4">
          {type === "all" && (
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-medium">Programs</h3>
            </div>
          )}
          <motion.div className="grid gap-4" variants={container}>
            {programResults.map((program, index) => (
              <motion.div key={program.id} variants={item}>
                <Card className="overflow-hidden hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <Activity className="h-5 w-5 mr-2 text-purple-600" />
                          <h4 className="font-medium">{program.name}</h4>
                          <span className="ml-2 text-sm text-muted-foreground">({program.id})</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{program.description}</p>
                        <div className="flex items-center mt-2">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="text-sm">
                            <span className="font-medium">{program.enrolledClients}</span> enrolled clients
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        View Program <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {(type === "all" || type === "documents") && documentResults.length > 0 && (
        <div className="space-y-4">
          {type === "all" && (
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-medium">Documents</h3>
            </div>
          )}
          <motion.div className="grid gap-4" variants={container}>
            {documentResults.map((document, index) => (
              <motion.div key={document.id} variants={item}>
                <Card className="overflow-hidden hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-green-600" />
                          <h4 className="font-medium">{document.title}</h4>
                          <Badge className="ml-2" variant="outline">
                            {document.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Last updated: {new Date(document.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        View Document <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Button variant="outline" className="gap-2">
          Load More Results <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
