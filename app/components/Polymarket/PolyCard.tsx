import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PolyTypes } from '@/lib/types/polyTypes'
import Link from 'next/link'
import React from 'react'

interface PolyCardProps {
  header: PolyTypes
}

const PolyCard = (props: PolyCardProps) => {
  const {header} = props;
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={header.image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant={"destructive"}>Live</Badge>
        </CardAction>
        <CardTitle>{header.title}</CardTitle>
        <CardDescription>
        {header.description.length > 200
          ? header.description.slice(0, 200) + '…'
          : header.description
        }
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`https://polymarket.com/event/${header.slug}`} target='_blank'>View Markets</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PolyCard