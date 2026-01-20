"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { mockUser } from "@/lib/data";

const chartData = mockUser.skills;

const chartConfig = {
  score: {
    label: "Your Score",
    color: "hsl(var(--chart-1))",
  },
  targetScore: {
    label: "Target Score",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function SkillGaps() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Skill Gap Analysis</CardTitle>
        <CardDescription>Your current skills vs. target proficiency</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis domain={[0, 5]} allowDecimals={false} />
              <ChartTooltip
                content={<ChartTooltipContent />}
              />
              <Legend />
              <Bar dataKey="score" fill="var(--color-score)" radius={4} />
              <Bar dataKey="targetScore" fill="var(--color-targetScore)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
