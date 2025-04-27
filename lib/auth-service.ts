// Authentication service for handling API calls to the backend

// Get the server URL from environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  refresh: string
  access: string
}

export class AuthService {
  /**
   * Register a new user
   */
  static async register(data: RegisterData): Promise<any> {
    try {
      const response = await fetch(`${SERVER_URL}/api/v1/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      return await response.json()
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  /**
   * Login a user
   */
  static async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${SERVER_URL}/api/v1/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        // Extract the specific error message from the response
        const errorMessage = errorData.detail || errorData.message || "Login failed"
        throw new Error(errorMessage)
      }

      const authData = await response.json()
      return authData
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  /**
   * Logout a user
   */
  static async logout(): Promise<void> {
    try {
      // Clear tokens first to prevent any issues with subsequent requests
      const refreshToken = this.getRefreshToken()
      const accessToken = this.getAccessToken()

      // Clear tokens immediately
      this.clearTokens()

      if (!refreshToken || !accessToken) {
        return
      }

      // Then make the API call
      await fetch(`${SERVER_URL}/api/v1/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }).catch((error) => {
        // Silently catch any network errors
        console.error("Logout API call failed:", error)
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Ensure tokens are cleared even if there's an error
      this.clearTokens()
      throw error
    }
  }

  /**
   * Get user profile - also serves as a token validation method
   */
  static async getUserProfile(): Promise<{ email: string; name: string }> {
    try {
      const accessToken = this.getAccessToken()

      if (!accessToken) {
        throw new Error("No access token available")
      }

      const response = await fetch(`${SERVER_URL}/api/v1/auth/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        // If response is 401 Unauthorized, the token is invalid
        if (response.status === 401) {
          this.clearTokens()
          throw new Error("Invalid or expired token")
        }
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch user profile")
      }

      return await response.json()
    } catch (error) {
      console.error("Get user profile error:", error)
      throw error
    }
  }

  /**
   * Store authentication tokens in localStorage
   */
  static storeTokens(tokens: AuthResponse): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", tokens.access)
      localStorage.setItem("refreshToken", tokens.refresh)
    }
  }

  /**
   * Get the access token from localStorage
   */
  static getAccessToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken")
    }
    return null
  }

  /**
   * Get the refresh token from localStorage
   */
  static getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refreshToken")
    }
    return null
  }

  /**
   * Clear authentication tokens from localStorage
   */
  static clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    }
  }

  /**
   * Check if the user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}
