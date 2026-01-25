import { CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PizzaCardLoad = () => {
  return (
    <>
      {/* Header */}
      <CardHeader className="space-y-2">
        {/* Title */}
        <Skeleton className="h-5 w-1/2" />
        {/* Description */}
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>

      {/* Content */}
      <CardContent>
        {/* Fake bar chart */}
        <div className="h-[160px] w-full flex items-end gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-5 rounded-sm"
              style={{
                height: `${40 + (i % 5) * 25}px`,
              }}
            />
          ))}
        </div>
      </CardContent>
    </>
  )
}

export default PizzaCardLoad
