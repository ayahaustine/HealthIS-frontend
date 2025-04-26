"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, Calendar, AlertTriangle, FileText, Activity, TrendingUp } from "lucide-react"

interface SearchSuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void
}

export function SearchSuggestions({ onSelectSuggestion }: SearchSuggestionsProps) {
  const suggestions = [
    {
      query: "Clients enrolled in diabetes program",
      description: "Find all clients in the diabetes management program",
      icon: Users,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
    },
    {
      query: "High risk clients over 60",
      description: "Find elderly clients with high risk scores",
      icon: AlertTriangle,
      color: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    },
    {
      query: "Programs with low enrollment",
      description: "Find programs that need more participants",
      icon: Activity,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300",
    },
    {
      query: "Clients who missed appointments",
      description: "Find clients who need follow-up",
      icon: Calendar,
      color: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
    },
    {
      query: "Recent lab reports for John Smith",
      description: "Find specific client documents",
      icon: FileText,
      color: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-300",
    },
    {
      query: "Active programs starting this year",
      description: "Find recently launched programs",
      icon: TrendingUp,
      color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card
              className="cursor-pointer hover:bg-muted/50 transition-colors border-transparent hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow"
              onClick={() => onSelectSuggestion(suggestion.query)}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`rounded-full p-2 ${suggestion.color} mt-1`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">"{suggestion.query}"</p>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
