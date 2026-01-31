import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tweet } from '@/lib/types/tweetTypes'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface InfiniteCardProps{
  tweet: Tweet,

}
const InfiniteTweets = ({ tweet }: InfiniteCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://unavatar.io/x/${tweet.user.screen_name}`} />
            <AvatarFallback>
              {tweet.user.screen_name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <CardTitle className="text-sm font-semibold">
              {tweet.user.name}
            </CardTitle>
            <CardDescription className="text-xs">
              @{tweet.user.screen_name}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

    <CardContent className="pt-2">
      <blockquote className="border-l-2 pl-4 italic text-sm">
        {tweet.full_text.length > 200
          ? tweet.full_text.slice(0, 200) + '…'
          : tweet.full_text
        }
      </blockquote>
    </CardContent>

     <CardFooter className="flex items-center justify-between">
      <p className="text-muted-foreground text-xs">🔴 Breaking</p>
      
      <Button variant="outline" size="icon" className="rounded-full p-2" asChild>
        <Link
          href={`https://x.com/${tweet.user.screen_name}/status/${tweet.tweet_id}`}
          className="flex items-center justify-center"
        >
          <Link2 className="w-4 h-4" />
        </Link>
      </Button>
    </CardFooter>
   </Card>
  )
}


export default InfiniteTweets