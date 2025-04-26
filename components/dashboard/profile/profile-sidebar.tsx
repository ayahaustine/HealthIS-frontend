"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

// Update the ProfileTab type to remove 'professional' and 'activity'
type ProfileTab = "personal" | "security"

interface ProfileSidebarProps {
  activeTab: ProfileTab
  setActiveTab: (tab: ProfileTab) => void
}

export function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  // Update the tabs array to only include personal and security
  const tabs = [
    {
      id: "personal" as ProfileTab,
      label: "Personal Information",
      icon: User,
    },
    {
      id: "security" as ProfileTab,
      label: "Security Settings",
      icon: Shield,
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/compassionate-doctor-consultation.png" alt="Dr. John Doe" />
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
          <h3 className="font-medium text-lg">Dr. John Doe</h3>
          <p className="text-sm text-muted-foreground">Cardiologist</p>
          <Button variant="outline" size="sm" className="mt-4">
            Change Photo
          </Button>
        </div>

        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
                activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
              )}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
