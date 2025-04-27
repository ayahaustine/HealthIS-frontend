import { ApiClient } from "./api-client"

export interface Enrollment {
  uuid: string
  client: string
  program: string
  status: string
  enrolled_at: string
}

export interface CreateEnrollmentRequest {
  client: string
  program: string
}

export class EnrollmentService {
  /**
   * Create a new enrollment
   */
  static async createEnrollment(enrollmentData: CreateEnrollmentRequest): Promise<Enrollment> {
    try {
      return await ApiClient.post<Enrollment>("/api/v1/enrollments/create/", enrollmentData)
    } catch (error) {
      console.error("Failed to create enrollment:", error)
      throw error
    }
  }
}
