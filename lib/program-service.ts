import { ApiClient } from "./api-client"

export interface Program {
  uuid: string
  name: string
  description: string
  status: string
  created_at: string
  created_by: string
  total_enrolled_clients?: number
  clients?: Array<{
    uuid: string
    first_name: string
    last_name: string
    dob: string
    phone_number: string
    county: string
    sub_county: string
    gender: string
    created_at: string
  }>
}

export interface CreateProgramRequest {
  name: string
  description: string
}

export interface UpdateProgramRequest {
  description: string
}

export class ProgramService {
  /**
   * Get all programs
   */
  static async getPrograms(): Promise<Program[]> {
    try {
      return await ApiClient.get<Program[]>("/api/v1/programs/")
    } catch (error) {
      console.error("Failed to fetch programs:", error)
      throw error
    }
  }

  /**
   * Create a new program
   */
  static async createProgram(programData: CreateProgramRequest): Promise<Program> {
    try {
      return await ApiClient.post<Program>("/api/v1/programs/create/", programData)
    } catch (error) {
      console.error("Failed to create program:", error)
      throw error
    }
  }

  /**
   * Get a program by UUID
   */
  static async getProgram(uuid: string): Promise<Program> {
    try {
      return await ApiClient.get<Program>(`/api/v1/programs/${uuid}/`)
    } catch (error) {
      console.error(`Failed to fetch program ${uuid}:`, error)
      throw error
    }
  }

  /**
   * Update a program's description
   */
  static async updateProgram(uuid: string, data: UpdateProgramRequest): Promise<Program> {
    try {
      return await ApiClient.patch<Program>(`/api/v1/programs/${uuid}/update/`, data)
    } catch (error) {
      console.error(`Failed to update program ${uuid}:`, error)
      throw error
    }
  }
}
