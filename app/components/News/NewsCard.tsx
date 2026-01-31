import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Result } from "@/lib/types/newsTypes";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  article: Result;
}

const NewsCard = ({ article }: NewsCardProps) => {
  return (
    <Link href={article.link} className="w-full max-w-3xl">
      <Card
        className="cursor-pointer hover:shadow-xl transition-shadow duration-200 flex flex-col md:flex-row gap-4 m-2"
      >
        {/* Optional Image */}
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full md:w-48 h-48 object-cover rounded-md"
          />
        ) : (
          <div className="w-full md:w-48 h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{article.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-2">
            {article.category.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </CardContent>

          <CardFooter className="text-sm text-muted-foreground">
            Source: {article.source_name} • {new Date(article.pubDate).toLocaleDateString()}
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default NewsCard;
