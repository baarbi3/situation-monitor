"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import React, { useEffect, useState } from 'react'
import PizzaCardLoad from "./PizzaCardLoad"

const chartConfig = {
  popularity: {
    label: "Popularity",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const PizzaCard = ({ name, link }: { name: string, link: string }) => {
  const [chartData, setChartData] = useState<{timeLabel: string, popularity: number}[]>([]);
  const [day, setDay] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  fetch(`/api/popular-times?url=${encodeURIComponent(link)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(res => res.json())
    .then(res => {
      if (res.success && res.results.length > 0) {
        setLoading(false)
        // The HTML you provided has exactly 19 bars.
        // Index 0 = 6am, Index 1 = 7am ... Index 18 = 12am
        const rawValues = res.results[0].data; 

        const labels = [
          "6a", "7a", "8a", "9a", "10a", "11a", "12p", 
          "1p", "2p", "3p", "4p", "5p", "6p", 
          "7p", "8p", "9p", "10p", "11p", "12a"
        ];

        const formatted = rawValues.map((val: number, i: number) => ({
          timeLabel: labels[i],
          popularity: val,
        }));
        const day = res.results[0].day;
        const formattedDay =
          typeof day === "string"
            ? day.trim().split(/\s+/)[0]
            : null;
        if (formattedDay) {
          setDay(formattedDay); 
        }

        setChartData(formatted);
      }
    });
}, [link]);

  return (
    <Card className="w-full max-w-sm">
      {loading ? (<>
        <PizzaCardLoad/>
      </>) : (<>
      <CardHeader>
<CardTitle className="text-sm font-semibold">{name}</CardTitle>
<CardDescription className="text-xs">Popularity by hour ({day})</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[160px] w-full">
          <BarChart 
            data={chartData} 
            margin={{ top: 16, left: 16, right: 16 }}
          >
            <CartesianGrid vertical={false} stroke="#333" strokeDasharray="3 3" />
            <XAxis 
              dataKey="timeLabel" 
              // Explicitly tell Recharts which labels to print on the axis
              ticks={["6a", "9a", "12p", "3p", "6p", "9p", "12a"]}
              tickLine={false} 
              axisLine={false} 
              tickMargin={10}
              // This is crucial: it prevents Recharts from skipping labels or auto-calculating
              interval={0} 
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <ChartTooltip cursor={{fill: 'transparent'}} content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="popularity"
              fill="var(--chart-1)"
              radius={[2, 2, 0, 0]}
              barSize={18}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>      
      </>)}

    </Card>
  )
}

export default PizzaCard