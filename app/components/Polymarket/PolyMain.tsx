"use client"
/*GET https://gamma-api.polymarket.com/events?tag_id=100265&closed=false&order=volume24hr&ascending=false*/
import { PolyTypes } from '@/lib/types/polyTypes';
import React, { useEffect, useState } from 'react'
import PolyCard from './PolyCard';
import { demoData } from './demoData';

const PolyMain = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<PolyTypes[]>([demoData]);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function callPoly() {
      setLoading(true)
      setError(null) 
      try {
        const res = await fetch("/api/polymarket")
        if (!res.ok) throw new Error(await res.text())
        const json: PolyTypes[] = await res.json() 
        setData(json)
        console.log(json)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
  
    callPoly()
  }, [])
  
  return (
    <div className='flex flex-col gap-6'>
      {data.map(header => (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PolyCard header={header} key={header.id}/>
        </div>
      ))}
    </div>
  )
}

export default PolyMain