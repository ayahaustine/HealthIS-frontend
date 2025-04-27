type EventCallback = (data: any) => void

class EventBus {
  private events: Record<string, EventCallback[]> = {}

  subscribe(event: string, callback: EventCallback): () => void {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }

  publish(event: string, data: any): void {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data))
    }
  }
}

// Create a singleton instance
export const eventBus = new EventBus()

// Event names as constants
export const EVENTS = {
  PROGRAM_CREATED: "program:created",
  PROGRAM_UPDATED: "program:updated",
  PROGRAM_DELETED: "program:deleted",
}
