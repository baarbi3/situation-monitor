import { ApiResponse, isValidationError, Tweet } from "@/lib/types/tweetTypes";
import { NextResponse } from "next/server";

const sleep = (ms: number) =>
  new Promise(res => setTimeout(res, ms))

const fetchUserData = async (
  username: string,
  API_KEY: string | undefined,
  shouldCache: boolean,
  count = 10,
): Promise<Tweet[]> => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    ...(shouldCache && {
      next: {
        revalidate: 60 * 60 * 24 * 3,
      },
    }),
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

    for (const usr of users) {
      const tweets = await fetchUserData(usr, API_KEY, false, 10)
      accumulator.data.push(...tweets)
      await sleep(3000)
    }
    const toTime = (t: Tweet) => new Date(t.created_at).getTime()
    accumulator.data.sort((a, b) => toTime(b) - toTime(a))

    return NextResponse.json(accumulator)
  } catch (err: unknown) {
  if (isValidationError(err)) {
    return NextResponse.json(
      { error: err.response.data.detail },
      { status: 422 }
    );
  }

  if (err instanceof Error) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { error: "Unknown error" },
    { status: 500 }
  );
}
}

export async function GET(req: Request) {
    try {
      const API_KEY = process.env.TWITTER_X_API_KEY;
      const { users }: { users: string[] } = {users:["Conflict_Radar", "Natsecjeff", "sentdefender", "Osint613", "MenchOsint"]};

      if (!API_KEY) {
        throw new Error("TWITTER_X_API_KEY is not configured")
      }

      const accumulator: ApiResponse<Tweet> = {
        code: 200,
        msg: "success",
        data: []
      }

      for (const usr of users) {
        const tweets = await fetchUserData(usr, API_KEY, true, 10)
        accumulator.data.push(...tweets)
        await sleep(3000)
      }
      const toTime = (t: Tweet) => new Date(t.created_at).getTime()
      accumulator.data.sort((a, b) => toTime(b) - toTime(a))


      return NextResponse.json(accumulator)
  } catch (err: unknown) {
    if (isValidationError(err)) {
      return NextResponse.json(
        { error: err.response.data.detail },
        { status: 422 }
      );
    }

    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Unknown error" },
      { status: 500 }
    );
  }
}