import { ApiClient } from "./api-client"

export interface TotalClientsResponse {
  total_clients: number
  growth_percentage: number
}

export interface ActiveProgramsResponse {
  active_programs: number
  growth_percentage: number
}

export interface EnrollmentsResponse {
  enrollments: number
  growth_percentage: number
}

export interface HighRiskClientsResponse {
  high_risk_clients: number
  growth_percentage: number
}

export interface MonthlyEnrollmentsResponse {
  [year: string]: {
    [month: string]: number
  }
}

export interface MonthlyClientsProgramsResponse {
  months: string[]
  clients: number[]
  programs: number[]
}

export interface ProgramDistributionResponse {
  program_names: string[]
  client_counts: number[]
}

export class AnalyticsService {
  /**
   * Get total clients count and growth percentage
   */
  static async getTotalClients(): Promise<TotalClientsResponse> {
    return await ApiClient.get<TotalClientsResponse>("/api/v1/analytics/total_clients/")
  }

  /**
   * Get active programs count and growth percentage
   */
  static async getActivePrograms(): Promise<ActiveProgramsResponse> {
    return await ApiClient.get<ActiveProgramsResponse>("/api/v1/analytics/active_programs/")
  }

  /**
   * Get enrollments in the last 30 days and growth percentage
   */
  static async getEnrollments(): Promise<EnrollmentsResponse> {
    return await ApiClient.get<EnrollmentsResponse>("/api/v1/analytics/enrollments")
  }

  /**
   * Get high risk clients count and growth percentage
   * Note: This is a placeholder as the API endpoint wasn't specified
   */
  static async getHighRiskClients(): Promise<HighRiskClientsResponse> {
    // This is a mock implementation since the API endpoint wasn't provided
    // In a real implementation, you would call the actual endpoint
    return {
      high_risk_clients: 7,
      growth_percentage: -3,
    }
  }

  /**
   * Get monthly enrollments data
   */
  static async getMonthlyEnrollments(): Promise<MonthlyEnrollmentsResponse> {
    return await ApiClient.get<MonthlyEnrollmentsResponse>("/api/v1/analytics/monthly_enrollments/")
  }

  /**
   * Get monthly clients and programs data
   */
  static async getMonthlyClientsPrograms(): Promise<MonthlyClientsProgramsResponse> {
    return await ApiClient.get<MonthlyClientsProgramsResponse>("/api/v1/analytics/monthly_clients_programs/")
  }

  /**
   * Get program distribution data
   */
  static async getProgramDistribution(): Promise<ProgramDistributionResponse> {
    return await ApiClient.get<ProgramDistributionResponse>("/api/v1/analytics/program_distribution/")
  }
}
