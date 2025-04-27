"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const { user } = useAuth()

  // Get initials for avatar fallback
  const getInitials = (name: string | undefined) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-3 p-4 border rounded-lg">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/images/avatar.png" alt="User avatar" />
          <AvatarFallback className="text-xl">{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="font-medium">{user?.name || "User"}</p>
          <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
        </div>
      </div>

      <div className="space-y-1">
        <Button
          variant={activeTab === "personal" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("personal")}
        >
          Personal Information
        </Button>
        <Button
          variant={activeTab === "security" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("security")}
        >
          Security Settings
        </Button>
      </div>
    </div>
  )
}
