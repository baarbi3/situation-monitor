import { ApiResponse, Tweet } from "@/lib/types/tweetTypes";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const API_KEY = process.env.TWITTER_X_API_KEY;
    const body = await req.json();

    const accumulator: ApiResponse<Tweet> = {
      code: 200,
      msg: "success",
      data: []
    }

    const fetchUserData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      };
    
      try {
        const response = await fetch(
          'https://api.twexapi.io/twitter/{screen_name}/tweets-replies/{count}', 
          options
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        accumulator.data.push(data)
        console.log(data);
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

  } catch (err: any) {
    console.error("[api] fatal error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
