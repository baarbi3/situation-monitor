import { ApiResponse, Tweet } from "@/lib/types/tweetTypes";
import { NextResponse } from "next/server";

const sleep = (ms: number) =>
  new Promise(res => setTimeout(res, ms))

export async function POST(req: Request) {
  try {
    const API_KEY = process.env.TWITTER_X_API_KEY;
    const body = await req.json();
    const { users }: { users: string[] } = body;
    
    if (!Array.isArray(users)) {
      return NextResponse.json(
        { error: "`users` must be an array of usernames" },
        { status: 400 }
      )
    }
    if (!API_KEY) {
      throw new Error("TWITTER_X_API_KEY is not configured")
    }


    const accumulator: ApiResponse<Tweet> = {
      code: 200,
      msg: "success",
      data: []
    }

    const fetchUserData = async (
      username: string,
      count = 10
    ): Promise<Tweet[]> => {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      };
    
      try {
        const response = await fetch(
          `https://api.twexapi.io/twitter/${username}/tweets-replies/${count}`, 
          options
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json: ApiResponse<Tweet> = await response.json()
        return json.data
      } catch (error) {
        console.error('Request failed:', error)
        throw error
      }
    };

    for (const usr of users) {
      const tweets = await fetchUserData(usr, 10)
      accumulator.data.push(...tweets)
      await sleep(300)
    }

    return NextResponse.json(accumulator)
  } catch (err: any) {
    console.error("[api] fatal error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
