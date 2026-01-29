import { PolyTypes } from "@/lib/types/polyTypes";
import { NextResponse } from "next/server";

const fetchData = async (): Promise<PolyTypes[]> => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { 
      revalidate: 60 * 60 * 3
    }
  };

  try {
    const response = await fetch(
      `https://gamma-api.polymarket.com/events?tag_id=100265&closed=false&order=volume24hr&ascending=false`, 
      options
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json: PolyTypes[] = await response.json();
    return json;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

export async function GET(req: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch Polymarket data' }, 
      { status: 500 }
    );
  }
}