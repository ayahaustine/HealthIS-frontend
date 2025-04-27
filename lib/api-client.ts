import { AuthService } from "./auth-service"

// Get the server URL from environment variables
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://healthis-server.onrender.com"

/**
 * API client for making authenticated requests to the backend
 */
export class ApiClient {
  /**
   * Make a GET request to the API
   */
  static async get<T>(endpoint: string): Promise<T> {
    const accessToken = AuthService.getAccessToken()

    if (!accessToken) {
      throw new Error("No access token available")
    }

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Here you could implement token refresh logic
        throw new Error("Authentication failed")
      }

      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  }

  /**
   * Make a POST request to the API
   */
  static async post<T>(endpoint: string, data: any): Promise<T> {
    const accessToken = AuthService.getAccessToken()

    if (!accessToken) {
      throw new Error("No access token available")
    }

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Here you could implement token refresh logic
        throw new Error("Authentication failed")
      }

      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  }

  /**
   * Make a PATCH request to the API
   */
  static async patch<T>(endpoint: string, data: any): Promise<T> {
    const accessToken = AuthService.getAccessToken()

    if (!accessToken) {
      throw new Error("No access token available")
    }

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Here you could implement token refresh logic
        throw new Error("Authentication failed")
      }

      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  }

  /**
   * Make a PUT request to the API
   */
  static async put<T>(endpoint: string, data: any): Promise<T> {
    const accessToken = AuthService.getAccessToken()

    if (!accessToken) {
      throw new Error("No access token available")
    }

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Here you could implement token refresh logic
        throw new Error("Authentication failed")
      }

      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  }

  /**
   * Make a DELETE request to the API
   */
  static async delete<T>(endpoint: string): Promise<T> {
    const accessToken = AuthService.getAccessToken()

    if (!accessToken) {
      throw new Error("No access token available")
    }

    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Here you could implement token refresh logic
        throw new Error("Authentication failed")
      }

      const errorData = await response.json()
      throw new Error(errorData.message || "API request failed")
    }

    return await response.json()
  }
}
