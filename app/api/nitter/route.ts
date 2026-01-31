import { NextResponse } from "next/server";
import type { Tweet, ApiResponse } from "@/lib/types/tweetTypes"; // adjust paths

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const fetchUserTweets = async (
  username: string,
  count = 15
): Promise<Tweet[]> => {
  try {
    const response = await fetch(
      "http://situation-monitor-api.vercel.app/nitter",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: [username] }),
        next: {
          revalidate: 60 * 60 * 3,
          tags: [`nitter:${username}`]
        }
      }
    );


    if (!response.ok) {
      console.warn(`Failed to fetch ${username}: HTTP ${response.status}`);
      return [];
    }

    const json: { success: boolean; count: number; tweets: Tweet[] } = await response.json();
    return json.tweets.slice(0, count); // respect max count
  } catch (err) {
    console.error(`Error fetching ${username}:`, err);
    return [];
  }
};

// --- POST handler ---
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { users }: { users: string[] } = body;

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { error: "`users` must be a non-empty array of usernames" },
        { status: 400 }
      );
    }

    const accumulator: Tweet[] = [];

    // --- Sequential with small delay (safe) ---
    for (const usr of users) {
      const tweets = await fetchUserTweets(usr);
      accumulator.push(...tweets);
      await sleep(2000); // avoid spamming Nitter instances
    }

    // --- Optional: sort by created_at descending ---
    const toTime = (t: Tweet) =>
      new Date(t.created_at.replace(" · ", " ")).getTime();

    accumulator.sort((a, b) => toTime(b) - toTime(a));


    return NextResponse.json({
      code: 200,
      msg: "success",
      data: accumulator
    } as ApiResponse<Tweet>);

  } catch (err: unknown) {
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
