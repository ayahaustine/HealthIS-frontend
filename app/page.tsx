"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/auth-service"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuthAndRedirect = async () => {
      try {
        // First check if tokens exist
        if (AuthService.isAuthenticated()) {
          // If tokens exist, verify they're valid by trying to fetch user profile
          try {
            await AuthService.getUserProfile()
            // If successful, redirect to dashboard
            router.push("/dashboard")
          } catch (error) {
            // If tokens are invalid, clear them and redirect to signin
            console.error("Invalid tokens:", error)
            AuthService.clearTokens()
            router.push("/signin")
          }
        } else {
          // No tokens, redirect to signin
          router.push("/signin")
        }
      } catch (error) {
        console.error("Auth check error:", error)
        // On any error, redirect to signin as a fallback
        router.push("/signin")
      }
    }

    checkAuthAndRedirect()
  }, [router])

  // Return a loading state while checking authentication
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
