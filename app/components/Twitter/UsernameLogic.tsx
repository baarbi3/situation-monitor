"use client"
import React, { useState } from 'react'
import AccountInput from './AccountInput'
import { Button } from '@/components/ui/button';
import { ApiResponse, Tweet } from '@/lib/types/tweetTypes';
import TweetCard from './TweetCard';
import { demoData } from './SampleData';
import InfiniteTweetCarousal from './InfiniteTweetCarousal';

const UsernameLogic = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [data, setData] = useState<ApiResponse<Tweet>>({
    code: 200,
    msg: "success",
    data: [
      demoData
    ]
  })

  async function handleSubmit() {
    const res = await fetch("/api/twitterx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users }),
    })

    if (!res.ok) {
      console.error("Request failed", await res.text())
      return
    }

    const json: ApiResponse<Tweet> = await res.json()
    setData(json)
  }

return (
<div className="flex flex-col gap-6">
  {/* 1. Carousel at the very top */}
  <div className="w-full">
    <InfiniteTweetCarousal />
  </div>

  {/* 2. Search row */}
  <div className="flex items-center gap-3">
    <div className="w-full max-w-md">
      <AccountInput value={users} onChange={setUsers} />
    </div>

    <Button onClick={handleSubmit} disabled={users.length === 0}>
      Submit
    </Button>
  </div>

  {/* 3. Tweet grid */}
  <div className="grid gap-4 
                  grid-cols-1 
                  sm:grid-cols-2 
                  lg:grid-cols-3 
                  xl:grid-cols-4">
    {data?.data.map(tweet => (
      <TweetCard key={tweet.tweet_id} tweet={tweet} />
    ))}
  </div>
</div>
)
}

export default UsernameLogic