"use client"
import { Result } from '@/lib/types/newsTypes';
import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard';

const NewsAPI = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Result[]>();
    const [error, setError] = useState<string | null>(null)
  
    useEffect(() => {
      async function callNews() {
        setLoading(true)
        setError(null) 
        try {
          const res = await fetch("/api/news")
          if (!res.ok) throw new Error(await res.text())
          const json: Result[] = await res.json() 
          setData(json)
          console.log(json)
        } catch (err) {
          console.error(err)
          setError(err instanceof Error ? err.message : 'Failed to fetch data')
        } finally {
          setLoading(false)
        }
      }
    
      callNews()
    }, [])
  
  return (
<div className="p-4 flex flex-col items-start gap-4"> 
  {/* items-start ensures cards don't stretch to full width if they have a max-width */}
  {data && data.map(article => ( 
    <NewsCard key={article.article_id} article={article}/>
  ))}
</div>
  )
}

export default NewsAPI