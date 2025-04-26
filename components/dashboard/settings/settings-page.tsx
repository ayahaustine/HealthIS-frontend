"use client"

import { useState } from "react"
import { SettingsHeader } from "@/components/dashboard/settings/settings-header"
import { SettingsSidebar } from "@/components/dashboard/settings/settings-sidebar"
import { AccountSettings } from "@/components/dashboard/settings/account-settings"
import { NotificationSettings } from "@/components/dashboard/settings/notification-settings"
import { SystemSettings } from "@/components/dashboard/settings/system-settings"
import { IntegrationSettings } from "@/components/dashboard/settings/integration-settings"

type SettingsTab = "account" | "notifications" | "system" | "integrations"

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account")

  return (
    <div className="space-y-6">
      <SettingsHeader />

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="md:col-span-3">
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "system" && <SystemSettings />}
          {activeTab === "integrations" && <IntegrationSettings />}
        </div>
      </div>
    </div>
  )
}
