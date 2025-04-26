"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Search, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navigateTo = (path: string) => {
    router.push(path)
    setShowProfileMenu(false)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="hidden md:block flex-1">
        <Button variant="outline" className="inline-flex items-center" onClick={() => setOpen(true)}>
          <Search className="mr-2 h-4 w-4" />
          <span>Search or type command</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              <CommandItem onSelect={() => (window.location.href = "/dashboard")}>
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => (window.location.href = "/dashboard/clients")}>
                <span>Clients</span>
              </CommandItem>
              <CommandItem onSelect={() => (window.location.href = "/dashboard/programs")}>
                <span>Programs</span>
              </CommandItem>
              <CommandItem onSelect={() => (window.location.href = "/dashboard/search")}>
                <span>Search</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => (window.location.href = "/dashboard/clients/register")}>
                <span>Register New Client</span>
              </CommandItem>
              <CommandItem onSelect={() => (window.location.href = "/dashboard/programs/new")}>
                <span>Create New Program</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>

      <div className="flex items-center gap-4 md:ml-auto">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <div className="relative" ref={profileRef}>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full hover:bg-transparent"
            onMouseEnter={() => setShowProfileMenu(true)}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/compassionate-doctor-consultation.png" alt="Dr. John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>

          {showProfileMenu && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <div className="py-1">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm font-medium">Dr. John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@healthis.com</p>
                </div>
                <button
                  onClick={() => navigateTo("/dashboard/profile")}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => navigateTo("/dashboard/settings")}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </button>
                <div className="border-t"></div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <LogOut className="mr-2 h-4 w-4 text-red-600" />
                      <span>Log out</span>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                      <AlertDialogDescription>You will be redirected to the login page.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => navigateTo("/signin")}>Log out</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
