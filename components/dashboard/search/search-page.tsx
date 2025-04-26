"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon, Sparkles, Clock, TrendingUp, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SearchResults } from "@/components/dashboard/search/search-results"
import { SearchSuggestions } from "@/components/dashboard/search/search-suggestions"

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "high risk patients",
    "diabetes program",
    "missed appointments",
  ])
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showTrending, setShowTrending] = useState(true)

  // Simulated trending searches
  const trendingSearches = [
    "HIV program enrollment",
    "TB screening results",
    "Malaria cases this month",
    "Vaccination records",
  ]

  useEffect(() => {
    // Simulate loading recent searches from local storage or API
    const timer = setTimeout(() => {
      setShowTrending(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Add to recent searches if not already there
    if (!recentSearches.includes(searchQuery) && searchQuery.trim()) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)])
    }

    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
    }, 800)
  }

  const handleFilterToggle = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const clearSearch = () => {
    setSearchQuery("")
    setHasSearched(false)
  }

  const removeRecentSearch = (search: string) => {
    setRecentSearches((prev) => prev.filter((s) => s !== search))
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 -mx-6 px-6 py-8 rounded-lg border border-blue-100 dark:border-blue-900">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Search</h1>
        <p className="text-muted-foreground max-w-2xl">
          Use natural language to search across clients, programs, and documents. Try asking questions like "show me
          high risk clients in the diabetes program" or "find missed appointments this week".
        </p>

        <form onSubmit={handleSearch} className="relative mt-6">
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search using natural language..."
              className="w-full pl-10 py-6 text-lg pr-24 border-blue-200 dark:border-blue-800 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-[5.5rem] top-1/2 -translate-y-1/2 h-8 px-2"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={isSearching || !searchQuery.trim()}
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>Search</>
              )}
            </Button>
          </div>

          {/* Keyboard shortcut hint */}
          <div className="absolute right-2 -bottom-6 text-xs text-muted-foreground">
            Press{" "}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600">
              Enter
            </kbd>{" "}
            to search
          </div>
        </form>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-muted-foreground mr-1">Filters:</span>
        <Button
          variant={activeFilters.includes("clients") ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle("clients")}
          className="rounded-full"
        >
          Clients
        </Button>
        <Button
          variant={activeFilters.includes("programs") ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle("programs")}
          className="rounded-full"
        >
          Programs
        </Button>
        <Button
          variant={activeFilters.includes("documents") ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle("documents")}
          className="rounded-full"
        >
          Documents
        </Button>
        <Button
          variant={activeFilters.includes("appointments") ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle("appointments")}
          className="rounded-full"
        >
          Appointments
        </Button>
        <Button
          variant={activeFilters.includes("high-risk") ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterToggle("high-risk")}
          className="rounded-full"
        >
          High Risk
        </Button>

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters([])}
            className="text-muted-foreground hover:text-foreground ml-2"
          >
            Clear all
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {hasSearched ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-blue-100 dark:border-blue-900 shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Results for "{searchQuery}"</h2>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    {Math.floor(Math.random() * 50) + 10} results
                  </Badge>
                </div>

                <Tabs defaultValue="all" className="mt-6">
                  <TabsList className="mb-4 bg-muted/50">
                    <TabsTrigger value="all">All Results</TabsTrigger>
                    <TabsTrigger value="clients">Clients</TabsTrigger>
                    <TabsTrigger value="programs">Programs</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="pt-4">
                    <SearchResults query={searchQuery} type="all" />
                  </TabsContent>
                  <TabsContent value="clients" className="pt-4">
                    <SearchResults query={searchQuery} type="clients" />
                  </TabsContent>
                  <TabsContent value="programs" className="pt-4">
                    <SearchResults query={searchQuery} type="programs" />
                  </TabsContent>
                  <TabsContent value="documents" className="pt-4">
                    <SearchResults query={searchQuery} type="documents" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Recent searches */}
            <Card className="border-blue-100 dark:border-blue-900 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Recent Searches</h3>
                </div>

                {recentSearches.length > 0 ? (
                  <ul className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <li key={index} className="flex items-center justify-between group">
                        <Button
                          variant="ghost"
                          className="text-left justify-start px-2 h-auto py-1.5 w-full"
                          onClick={() => {
                            setSearchQuery(search)
                            handleSearch({ preventDefault: () => {} } as React.FormEvent)
                          }}
                        >
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          {search}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                          onClick={() => removeRecentSearch(search)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No recent searches</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trending or suggested searches */}
            <Card className="border-blue-100 dark:border-blue-900 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {showTrending ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Trending Searches</h3>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Suggested Searches</h3>
                    </>
                  )}
                </div>

                <ul className="space-y-2">
                  {(showTrending
                    ? trendingSearches
                    : [
                        "Clients enrolled in diabetes program",
                        "High risk clients over 60",
                        "Programs with low enrollment",
                        "Clients who missed appointments",
                      ]
                  ).map((search, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="text-left justify-start px-2 h-auto py-1.5 w-full"
                        onClick={() => {
                          setSearchQuery(search)
                          handleSearch({ preventDefault: () => {} } as React.FormEvent)
                        }}
                      >
                        {showTrending ? (
                          <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-2 text-muted-foreground" />
                        )}
                        {search}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Advanced search suggestions */}
            <Card className="md:col-span-2 border-blue-100 dark:border-blue-900 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <SearchIcon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Try These Searches</h3>
                </div>

                <SearchSuggestions onSelectSuggestion={setSearchQuery} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
