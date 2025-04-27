import { ApiClient } from "./api-client"

export interface Program {
  uuid: string
  name: string
  description: string
  status: string
  enrolled_at: string
}

export interface Client {
  uuid: string
  first_name: string
  last_name: string
  dob: string
  phone_number: string
  county: string
  sub_county: string
  gender: string
  age: number
  programs: Program[]
  created_at: string
  created_by: string
}

export interface CreateClientRequest {
  first_name: string
  last_name: string
  dob: string
  phone_number: string
  county: string
  sub_county: string
  gender: string
}

export class ClientService {
  /**
   * Get all clients
   */
  static async getClients(): Promise<Client[]> {
    try {
      return await ApiClient.get<Client[]>("/api/v1/clients/")
    } catch (error) {
      console.error("Failed to fetch clients:", error)
      throw error
    }
  }

  /**
   * Get a client by UUID
   */
  static async getClient(uuid: string): Promise<Client> {
    try {
      return await ApiClient.get<Client>(`/api/v1/clients/${uuid}/`)
    } catch (error) {
      console.error(`Failed to fetch client ${uuid}:`, error)
      throw error
    }
  }

  /**
   * Create a new client
   */
  static async createClient(clientData: CreateClientRequest): Promise<Client> {
    try {
      return await ApiClient.post<Client>("/api/v1/clients/create/", clientData)
    } catch (error) {
      console.error("Failed to create client:", error)
      throw error
    }
  }

  /**
   * Delete a client by UUID
   */
  static async deleteClient(uuid: string): Promise<void> {
    try {
      await ApiClient.delete(`/api/v1/clients/${uuid}/`)
    } catch (error) {
      console.error(`Failed to delete client ${uuid}:`, error)
      throw error
    }
  }
}
