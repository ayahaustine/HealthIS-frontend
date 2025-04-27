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
import { Loader2 } from "lucide-react"
import type { ChangeEvent, FormEvent } from "react"

interface ProgramCreateFormData {
  name: string
  description: string
}

interface ProgramCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: ProgramCreateFormData
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent) => void
  isSubmitting: boolean
}

export function ProgramCreateDialog({
  open,
  onOpenChange,
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
}: ProgramCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Program</DialogTitle>
            <DialogDescription>Add a new health program to the system</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                placeholder="Enter program name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={onInputChange}
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
                  Creating...
                </>
              ) : (
                "Create Program"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
