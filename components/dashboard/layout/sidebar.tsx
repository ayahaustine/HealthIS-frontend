"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  Search,
  Settings,
  ChevronDown,
  Activity,
  Key,
  Menu,
  X,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProgramService, type Program } from "@/lib/program-service"
import { eventBus, EVENTS } from "@/lib/event-bus"

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
  const [programs, setPrograms] = useState<Program[]>([])
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false)
  const [programsError, setProgramsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrograms = async () => {
      setIsLoadingPrograms(true)
      setProgramsError(null)
      try {
        const data = await ProgramService.getPrograms()
        setPrograms(data)
      } catch (error) {
        console.error("Failed to fetch programs for sidebar:", error)
        setProgramsError("Failed to load programs")
      } finally {
        setIsLoadingPrograms(false)
      }
    }

    fetchPrograms()

    // Subscribe to program created events
    const unsubscribe = eventBus.subscribe(EVENTS.PROGRAM_CREATED, (newProgram: Program) => {
      setPrograms((prevPrograms) => [newProgram, ...prevPrograms])
    })

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe()
    }
  }, [])

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  // Default nav items without dynamic programs
  const baseNavItems: NavItem[] = [
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

  // Add dynamic programs to the Programs dropdown
  const navItems = baseNavItems.map((item) => {
    if (item.title === "Programs" && item.children) {
      return {
        ...item,
        children: [
          ...item.children,
          ...(isLoadingPrograms
            ? [
                {
                  title: "Loading programs...",
                  href: "#",
                  icon: Loader2,
                  isActive: false,
                },
              ]
            : programs.map((program) => ({
                title: program.name,
                href: `/dashboard/programs/${program.uuid}`,
                icon: Activity,
                isActive: pathname === `/dashboard/programs/${program.uuid}`,
              }))),
        ],
      }
    }
    return item
  })

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

        <div className="py-4 px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
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
                      {item.children.map((child, childIndex) =>
                        child.title === "Loading programs..." ? (
                          <div
                            key={childIndex}
                            className="flex items-center px-4 py-1.5 text-sm rounded-md text-gray-500"
                          >
                            <Loader2 className="h-4 w-4 mr-3 animate-spin" />
                            <span>{child.title}</span>
                          </div>
                        ) : (
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
                        ),
                      )}
                      {programsError && <div className="px-4 py-1.5 text-sm text-red-500">{programsError}</div>}
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
