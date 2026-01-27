import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tweet } from '@/lib/types/tweetTypes';
import { Heart, MessageCircle, Repeat2, Share2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface TweetProps{
  tweet: Tweet,
}
const TweetCard = (props: TweetProps) => {
  const {tweet} = props;

    const handleLike = () => {
      console.log("Shabbat SHalom")
  }

  return (
    <Card className="w-full max-w-md border border-border p-4 hover:bg-muted/50 transition-colors cursor-pointer bg-card">
      {/* Header with Avatar, Name, Handle, and Timestamp */}
      <div className="flex gap-3 mb-3">
        <Avatar>
          <AvatarImage src={tweet.user.profile_image_url || "/placeholder.svg"} alt={tweet.user.name} />
          <AvatarFallback>{tweet.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-card-foreground hover:underline">
              {tweet.user.name}
            </span>
            <span className="text-muted-foreground">@{tweet.user.screen_name}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground text-sm">{tweet.created_at}</span>
          </div>
        </div>
      </div>

      {/* Tweet Content */}
      <div className="mb-3 text-card-foreground text-base leading-normal break-words">
        {tweet.text}
      </div>

      {/* Tweet Image */}
      {tweet.media && tweet.media[0] && (
        <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-border">
          <Image
            src={tweet.media[0] || "/placeholder.svg"}
            alt="Tweet media"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex gap-4 mb-3 py-3 border-t border-b border-border text-sm text-muted-foreground">
        <span className="hover:text-primary cursor-pointer">
          {tweet.reply_count} {tweet.reply_count === 1 ? 'Reply' : 'Replies'}
        </span>
        <span className="hover:text-primary cursor-pointer">
          {tweet.retweet_count} {tweet.retweet_count === 1 ? 'Retweet' : 'Retweets'}
        </span>
        <span className="hover:text-destructive cursor-pointer">
          {tweet.favorite_count} {tweet.favorite_count === 1 ? 'Like' : 'Likes'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between text-muted-foreground">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:text-primary hover:bg-primary/10"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:text-primary hover:bg-primary/10"
        >
          <Repeat2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:text-destructive hover:bg-destructive/10"
          onClick={handleLike}
        >
          <Heart
            className="w-4 h-4"
            fill={tweet.favorited ? 'currentColor' : 'none'}
            color={tweet.favorited ? 'hsl(var(--destructive))' : 'currentColor'}
          />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:text-primary hover:bg-primary/10"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

export default TweetCard