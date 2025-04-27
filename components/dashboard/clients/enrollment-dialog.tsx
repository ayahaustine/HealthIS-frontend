"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { useEffect, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Client } from "@/lib/client-service"

// Form schema for enrolling a client in a program
const enrollmentFormSchema = z.object({
  program: z.string({
    required_error: "Please select a program",
  }),
})

type EnrollmentFormValues = z.infer<typeof enrollmentFormSchema>

interface EnrollmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: Client | null
  programs: any[]
  loadingPrograms: boolean
  isEnrolling: boolean
  onSubmit: (values: EnrollmentFormValues) => void
}

export function EnrollmentDialog({
  open,
  onOpenChange,
  client,
  programs,
  loadingPrograms,
  isEnrolling,
  onSubmit,
}: EnrollmentDialogProps) {
  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      program: "",
    },
  })

  // Reset form when dialog opens or client changes
  useEffect(() => {
    if (open) {
      form.reset({ program: "" })
    }
  }, [open, client, form])

  // Memoize available programs to prevent recalculation on every render
  const availablePrograms = useMemo(() => {
    if (!client) return programs

    const clientProgramIds = client.programs.map((p) => p.uuid)
    return programs.filter((program) => !clientProgramIds.includes(program.uuid))
  }, [client, programs])

  // Memoize whether there are available programs
  const hasAvailablePrograms = useMemo(() => {
    return availablePrograms.length > 0
  }, [availablePrograms])

  const handleFormSubmit = (values: EnrollmentFormValues) => {
    onSubmit(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enroll Client in Program</DialogTitle>
          <DialogDescription>
            {client && (
              <span>
                Enroll {client.first_name} {client.last_name} in a program.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loadingPrograms || isEnrolling}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a program" />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingPrograms ? (
                          <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Loading programs...</span>
                          </div>
                        ) : !hasAvailablePrograms ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            {client && client.programs.length > 0
                              ? "Client is already enrolled in all available programs"
                              : "No programs available"}
                          </div>
                        ) : (
                          availablePrograms.map((program) => (
                            <SelectItem key={program.uuid} value={program.uuid}>
                              {program.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the program you want to enroll this client in.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isEnrolling}>
                Cancel
              </Button>
              <Button type="submit" disabled={loadingPrograms || isEnrolling || !hasAvailablePrograms}>
                {isEnrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enroll Client
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
