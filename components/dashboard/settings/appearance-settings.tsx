"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Check } from "lucide-react"

export function AppearanceSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [theme, setTheme] = useState("light")
  const [density, setDensity] = useState("comfortable")
  const [fontSize, setFontSize] = useState("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appearance settings updated",
        description: "Your appearance preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>Choose your preferred color theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  theme === "light" ? "border-primary ring-2 ring-primary" : "border-border"
                }`}
                onClick={() => setTheme("light")}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Light</span>
                  {theme === "light" && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="h-24 bg-white border rounded-md"></div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  theme === "dark" ? "border-primary ring-2 ring-primary" : "border-border"
                }`}
                onClick={() => setTheme("dark")}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Dark</span>
                  {theme === "dark" && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="h-24 bg-gray-900 rounded-md"></div>
              </div>
              <div
                className={`border rounded-lg p-4 cursor-pointer ${
                  theme === "system" ? "border-primary ring-2 ring-primary" : "border-border"
                }`}
                onClick={() => setTheme("system")}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">System</span>
                  {theme === "system" && <Check className="h-4 w-4 text-primary" />}
                </div>
                <div className="h-24 bg-gradient-to-r from-white to-gray-900 rounded-md"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Density</CardTitle>
            <CardDescription>Adjust the density of the user interface</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={density} onValueChange={setDensity} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="compact" id="density-compact" />
                <Label htmlFor="density-compact">Compact</Label>
                <span className="text-sm text-muted-foreground ml-2">(Reduced spacing, more content per screen)</span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="density-comfortable" />
                <Label htmlFor="density-comfortable">Comfortable</Label>
                <span className="text-sm text-muted-foreground ml-2">(Default spacing)</span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spacious" id="density-spacious" />
                <Label htmlFor="density-spacious">Spacious</Label>
                <span className="text-sm text-muted-foreground ml-2">(Increased spacing, less content per screen)</span>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Font Size</CardTitle>
            <CardDescription>Adjust the size of text throughout the application</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={fontSize} onValueChange={setFontSize} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="font-small" />
                <Label htmlFor="font-small" className="text-sm">
                  Small
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="font-medium" />
                <Label htmlFor="font-medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="font-large" />
                <Label htmlFor="font-large" className="text-lg">
                  Large
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  )
}
