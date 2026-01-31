import { ApiResponse, Tweet } from '@/lib/types/tweetTypes'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import InfiniteTweets from './InfiniteTweets'
import { demoData } from './SampleData'
import Autoplay from "embla-carousel-autoplay"

const InfiniteTweetCarousal = () => {
    const [data, setData] = useState<ApiResponse<Tweet>>({
      code: 200,
      msg: "success",
      data: [
        demoData
      ]
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
      async function callTweets() {
        setLoading(true)
        try {
      const res = await fetch(`${window.location.origin}/api/nitter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: ["Conflict_Radar", "Natsecjeff", "sentdefender", "Osint613", "MenchOsint"] })
      })
        if (!res.ok) throw new Error(await res.text())
          const json: ApiResponse<Tweet> = await res.json()
          setData(json)
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    
      callTweets()
    }, [])

    
  return (
    <Carousel opts={{ align: "start" }}  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full max-w-7xl mx-auto">
      <CarouselContent>
        {data.data.map(tweet => (
          <CarouselItem
            key={tweet.tweet_id}
            className="basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <InfiniteTweets tweet={tweet} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default InfiniteTweetCarousal