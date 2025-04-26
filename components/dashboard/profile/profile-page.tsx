"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/dashboard/profile/profile-header"
import { ProfileSidebar } from "@/components/dashboard/profile/profile-sidebar"
import { PersonalInformation } from "@/components/dashboard/profile/personal-information"
import { SecuritySettings } from "@/components/dashboard/profile/security-settings"

type ProfileTab = "personal" | "security"

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal")

  return (
    <div className="space-y-6">
      <ProfileHeader />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="md:col-span-2">
          {activeTab === "personal" && <PersonalInformation />}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  )
}
