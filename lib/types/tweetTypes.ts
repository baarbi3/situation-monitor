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

interface ValidationErrorDetail {
  loc: string[];
  msg: string;
  type: string;
}

export interface ValidationErrorResponse {
  detail: ValidationErrorDetail[];
}


export function isValidationError(
  err: unknown
): err is { response: { status: number; data: ValidationErrorResponse } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as any).response?.status === "number" &&
    (err as any).response?.status === 422 &&
    Array.isArray((err as any).response?.data?.detail)
  );
}
