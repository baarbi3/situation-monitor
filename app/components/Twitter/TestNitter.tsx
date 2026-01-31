'use client'
import { ApiResponse, Tweet } from '@/lib/types/tweetTypes'
import React, { useEffect, useState } from 'react'
import { demoData } from './SampleData'

const TestNitter = () => {
  const [data, setData] = useState<ApiResponse<Tweet>>({
    code: 200,
    msg: "success",
    data: [
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
        body: JSON.stringify({ users: ["elonmusk"] })
      })

      if (!res.ok) throw new Error(await res.text())
      const json: ApiResponse<Tweet> = await res.json()
      setData(json)
      console.log(json) // log updated tweets
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  callTweets()
}, [])

  return (
    <div>TestNitter</div>
  )
}

export default TestNitter