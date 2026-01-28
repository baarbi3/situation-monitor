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
    <Card className="w-full border border-border p-3 sm:p-4 hover:bg-muted/50 transition-colors cursor-pointer bg-card">
      {/* Header with Avatar, Name, Handle, and Timestamp */}
      <div className="flex gap-2 sm:gap-3 mb-3">
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
            <AvatarImage src={tweet.user.profile_image_url || "/placeholder.svg"} alt={tweet.user.name} />
            <AvatarFallback>{tweet.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <span className="font-bold text-card-foreground hover:underline truncate">
              {tweet.user.name}
            </span>
            <span className="text-muted-foreground text-sm sm:text-base truncate">@{tweet.user.screen_name}</span>
            <span className="text-muted-foreground hidden sm:inline">·</span>
            <span className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">{tweet.created_at}</span>
          </div>
        </div>
      </div>

      {/* Tweet Content */}
      <div className="mb-3 text-card-foreground text-sm sm:text-base leading-relaxed break-words">
        {tweet.text}
      </div>

      {/* Tweet Image */}
      {tweet.media && tweet.media[0] && (
        <div className="mb-3 rounded-2xl overflow-hidden border border-border">
          <img
            src={tweet.media[0] || "/placeholder.svg"}
            alt="Tweet media"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 py-2 sm:py-3 border-t border-b border-border text-xs sm:text-sm text-muted-foreground">
        <span className="hover:text-primary cursor-pointer whitespace-nowrap">
          {tweet.reply_count} {tweet.reply_count === 1 ? 'Reply' : 'Replies'}
        </span>
        <span className="hover:text-primary cursor-pointer whitespace-nowrap">
          {tweet.retweet_count} {tweet.retweet_count === 1 ? 'Retweet' : 'Retweets'}
        </span>
        <span className="hover:text-destructive cursor-pointer whitespace-nowrap">
          {tweet.favorite_count} {tweet.favorite_count === 1 ? 'Like' : 'Likes'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-1 sm:gap-2 text-muted-foreground">
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