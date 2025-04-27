import { Skeleton } from "@/components/ui/skeleton"

export default function ProgramLoading() {
  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-20 ml-2" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <div className="border rounded-lg p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-9 w-[200px]" />
          <Skeleton className="h-9 w-[120px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
