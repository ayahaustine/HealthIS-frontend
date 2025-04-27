"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Program } from "@/lib/program-service"
import { Loader2 } from "lucide-react"
import { useState, useEffect, type FormEvent } from "react"

interface ProgramEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  program: Program
  onSubmit: (data: { description: string }) => Promise<void>
}

export function ProgramEditDialog({ open, onOpenChange, program, onSubmit }: ProgramEditDialogProps) {
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update description when program changes or dialog opens
  useEffect(() => {
    if (open && program) {
      setDescription(program.description || "")
    }
  }, [open, program])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!program) return

    try {
      setIsSubmitting(true)
      await onSubmit({ description })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!program) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>Update program details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Program Name</Label>
              <Input id="edit-name" name="name" value={program.name} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Program name cannot be changed</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter program description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Program"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
