"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AuthService } from "@/lib/auth-service"

interface UserProfile {
  email: string
  name: string
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
  login: (email: string, password: string) => Promise<void>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserProfile | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const fetchUserProfile = async () => {
    try {
      const userData = await AuthService.getUserProfile()
      setUser(userData)
      return true
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      // If we can't fetch the user profile, we should log the user out
      AuthService.clearTokens()
      setIsAuthenticated(false)
      setUser(null)
      return false
    }
  }

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      const isAuth = AuthService.isAuthenticated()

      if (isAuth) {
        // If tokens exist, verify they're valid
        try {
          const profileValid = await fetchUserProfile()
          setIsAuthenticated(profileValid)

          // If on auth pages and authenticated, redirect to dashboard
          if (profileValid && (pathname === "/signin" || pathname === "/signup")) {
            router.push("/dashboard")
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
          setIsAuthenticated(false)

          // If on protected pages and not authenticated, redirect to signin
          if (pathname !== "/signin" && pathname !== "/signup") {
            router.push("/signin")
          }
        }
      } else {
        setIsAuthenticated(false)

        // If on protected pages and not authenticated, redirect to signin
        if (pathname !== "/signin" && pathname !== "/signup" && pathname !== "/") {
          router.push("/signin")
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

  // Update the login function to better handle the specific error message from the server
  // and show appropriate toast notifications

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await AuthService.login({ email, password })
      AuthService.storeTokens(response)

      // Fetch user profile after successful login
      const profileValid = await fetchUserProfile()
      setIsAuthenticated(profileValid)

      if (profileValid) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const name = `${firstName} ${lastName}`.trim()
      await AuthService.register({ name, email, password })
      router.push("/signin")
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      // First clear the authentication state
      setIsAuthenticated(false)
      setUser(null)

      // Then call the logout API
      await AuthService.logout()

      // Finally redirect to signin page
      router.push("/signin")
    } catch (error) {
      console.error("Logout failed:", error)
      // Even if logout fails, redirect to signin
      router.push("/signin")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
