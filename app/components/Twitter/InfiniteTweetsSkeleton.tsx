import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const InfiniteTweetsSkeleton = () => {
  return (
    <Card className="mx-auto w-full max-w-sm overflow-hidden min-w-0">
      {/* Header */}
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Skeleton className="h-8 w-8 rounded-full" />

          {/* Name + handle */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="pt-2">
        <div className="space-y-2 border-l-2 pl-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[75%]" />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-8 w-8 rounded-full mb-2" />
      </CardFooter>
    </Card>
  )
}

export default InfiniteTweetsSkeleton
