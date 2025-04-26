import { RegisterClientForm } from "@/components/clients/register-client-form"

export default function RegisterClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Register New Client</h1>
        <p className="text-muted-foreground">Add a new client to the health information system</p>
      </div>

      <RegisterClientForm />
    </div>
  )
}
