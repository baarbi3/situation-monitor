import NewsAPI from "@/app/components/News/NewsAPI";
import { NewsTypes, Result } from "@/lib/types/newsTypes";
import { NextResponse } from "next/server";

const fetchData = async (page?: string): Promise<Result[]> => {
  const API_KEY = process.env.NEWS_API_KEY;
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 * 60 * 3 }
  };

  let url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&language=en&category=politics`;
  if (page) url += `&page=${page}`;

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const json: NewsTypes = await response.json();
  return json.results; // array of politics articles
};


export async function GET(req: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch News data' }, 
      { status: 500 }
    );
  }
}
