export interface User {
  id: string
  name: string
  screen_name: string
  location?: string
  followers_count: number
  following_count: number
  verified?: boolean
  profile_image_url: string
}

export interface Tweet {
  tweet_id: string
  text: string
  created_at: string
  created_at_datetime: string
  bookmark_count: number
  bookmarked: boolean
  community_note: string | null
  edit_tweet_ids: string[]
  favorite_count: number
  favorited: boolean
  full_text: string
  has_card: boolean
  has_community_notes: boolean
  hashtags: string[]
  cashtags: string[]
  lang: string
  media: unknown[]
  possibly_sensitive: boolean
  quote_count: number
  reply_count: number
  retweet_count: number
  user: User
  target_count: number
}

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T[]
}