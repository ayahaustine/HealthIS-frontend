"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Bell, Settings, Link } from "lucide-react"
import { cn } from "@/lib/utils"

type SettingsTab = "account" | "notifications" | "system" | "integrations"

interface SettingsSidebarProps {
  activeTab: SettingsTab
  setActiveTab: (tab: SettingsTab) => void
}

export function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    {
      id: "account" as SettingsTab,
      label: "Account",
      icon: User,
    },
    {
      id: "notifications" as SettingsTab,
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "system" as SettingsTab,
      label: "System",
      icon: Settings,
    },
    {
      id: "integrations" as SettingsTab,
      label: "Integrations",
      icon: Link,
    },
  ]

  return (
    <Card>
      <CardContent className="p-2">
        <div className="space-y-1 py-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={cn("w-full justify-start", activeTab === tab.id ? "" : "text-muted-foreground")}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
