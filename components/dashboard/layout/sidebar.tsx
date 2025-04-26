"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileText, Search, Settings, ChevronDown, Activity, Key, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type NavItem = {
  title: string
  href: string
  icon: React.ElementType
  isActive?: boolean
  children?: NavItem[]
}

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    programs: true,
  })

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/dashboard",
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: Users,
      isActive: pathname.startsWith("/dashboard/clients"),
    },
    {
      title: "Programs",
      href: "#",
      icon: FileText,
      isActive: pathname.startsWith("/dashboard/programs"),
      children: [
        {
          title: "All Programs",
          href: "/dashboard/programs",
          icon: FileText,
          isActive: pathname === "/dashboard/programs",
        },
        {
          title: "HIV Program",
          href: "/dashboard/programs/hiv",
          icon: Activity,
          isActive: pathname === "/dashboard/programs/hiv",
        },
        {
          title: "TB Program",
          href: "/dashboard/programs/tb",
          icon: Activity,
          isActive: pathname === "/dashboard/programs/tb",
        },
      ],
    },
    {
      title: "Search",
      href: "/dashboard/search",
      icon: Search,
      isActive: pathname === "/dashboard/search",
    },
    {
      title: "API Access",
      href: "/dashboard/api-access",
      icon: Key,
      isActive: pathname === "/dashboard/api-access",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      isActive: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <div className="bg-primary p-1 rounded-md mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <span className="text-xl font-bold">HealthIS</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="py-4 px-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Main</div>
          {navItems.map((item, index) => (
            <div key={index} className="py-0.5">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleGroup(item.title.toLowerCase())}
                    className={cn(
                      "flex items-center w-full px-4 py-3 text-sm rounded-md",
                      item.isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        openGroups[item.title.toLowerCase()] ? "transform rotate-180" : "",
                      )}
                    />
                  </button>
                  {openGroups[item.title.toLowerCase()] && (
                    <div className="pl-12 mt-1 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          className={cn(
                            "flex items-center px-4 py-1.5 text-sm rounded-md",
                            child.isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                          )}
                        >
                          <child.icon className="h-4 w-4 mr-3" />
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm rounded-md",
                    item.isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="text-center">
            <p className="text-xs text-gray-500">© 2025 HealthIS</p>
            <p className="text-xs text-gray-500">All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}
