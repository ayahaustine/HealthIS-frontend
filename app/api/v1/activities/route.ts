import { type NextRequest, NextResponse } from "next/server"

// Mock activities data
const activities = [
  {
    id: "act-1",
    type: "registration",
    title: "New Client Registered",
    description: "Sarah Johnson was registered in the system",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    user: {
      uuid: "usr-1",
      name: "Dr. Emily Chen",
      email: "emily.chen@example.com",
    },
    entity_type: "client",
    entity_uuid: "cl-1",
  },
  {
    id: "act-2",
    type: "enrollment",
    title: "Program Enrollment",
    description: "Michael Davis was enrolled in HIV Care Program",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    user: {
      uuid: "usr-2",
      name: "Dr. John Doe",
      email: "john.doe@example.com",
    },
    entity_type: "client",
    entity_uuid: "cl-2",
  },
  {
    id: "act-3",
    type: "update",
    title: "Client Information Updated",
    description: "Contact information updated for Robert Smith",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    user: {
      uuid: "usr-3",
      name: "Nurse Wilson",
      email: "nurse.wilson@example.com",
    },
    entity_type: "client",
    entity_uuid: "cl-3",
  },
  {
    id: "act-4",
    type: "alert",
    title: "High Risk Client Flagged",
    description: "AI system flagged Elizabeth Brown as high risk",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    entity_type: "client",
    entity_uuid: "cl-4",
  },
  {
    id: "act-5",
    type: "enrollment",
    title: "Program Enrollment",
    description: "James Wilson was enrolled in TB Treatment Program",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    user: {
      uuid: "usr-4",
      name: "Dr. Maria Garcia",
      email: "maria.garcia@example.com",
    },
    entity_type: "client",
    entity_uuid: "cl-5",
  },
  {
    id: "act-6",
    type: "login",
    title: "User Login",
    description: "Dr. James Wilson logged into the system",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    user: {
      uuid: "usr-5",
      name: "Dr. James Wilson",
      email: "james.wilson@example.com",
    },
    // No entity_type for system activities
  },
  {
    id: "act-7",
    type: "update",
    title: "Program Updated",
    description: "HIV Care Program description was updated",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    user: {
      uuid: "usr-6",
      name: "Admin User",
      email: "admin@example.com",
    },
    entity_type: "program",
    entity_uuid: "pg-1",
  },
  {
    id: "act-8",
    type: "registration",
    title: "New Program Created",
    description: "TB Treatment Program was created",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    user: {
      uuid: "usr-6",
      name: "Admin User",
      email: "admin@example.com",
    },
    entity_type: "program",
    entity_uuid: "pg-2",
  },
  {
    id: "act-9",
    type: "logout",
    title: "User Logout",
    description: "Dr. Emily Chen logged out of the system",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
    user: {
      uuid: "usr-1",
      name: "Dr. Emily Chen",
      email: "emily.chen@example.com",
    },
    // No entity_type for system activities
  },
  {
    id: "act-10",
    type: "update",
    title: "Program Metrics Updated",
    description: "Monthly targets updated for HIV Care Program",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    user: {
      uuid: "usr-6",
      name: "Admin User",
      email: "admin@example.com",
    },
    entity_type: "program",
    entity_uuid: "pg-1",
  },
]

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined
  const entityTypes = searchParams.getAll("entity_type")
  const entityUuid = searchParams.get("entity_uuid")

  // Filter activities based on query parameters
  let filteredActivities = [...activities]

  // Filter by entity type(s) if specified
  if (entityTypes.length > 0) {
    filteredActivities = filteredActivities.filter(
      (activity) => activity.entity_type && entityTypes.includes(activity.entity_type),
    )
  }

  // Filter by entity UUID if specified
  if (entityUuid) {
    filteredActivities = filteredActivities.filter((activity) => activity.entity_uuid === entityUuid)
  }

  // Sort by timestamp (newest first)
  filteredActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Apply limit if specified
  if (limit) {
    filteredActivities = filteredActivities.slice(0, limit)
  }

  // Return paginated response
  return NextResponse.json({
    results: filteredActivities,
    count: filteredActivities.length,
    next: null,
    previous: null,
  })
}
