"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartData = [
    { month: "1월", get: 186, post: 80, delete: 100,put: 200 },
    { month: "2월", get: 305, post: 200 },
    { month: "3월", get: 237, post: 120 },
    { month: "4월", get: 73, post: 190 },
    { month: "5월", get: 209, post: 130 },
    { month: "6월", get: 214, post: 140 },
]

const chartConfig = {
    get: {
        label: "get",
        color: "#4ca9ff",
    },
    post : {
        label: "post",
        color: "#6dde46",
    },
    delete : {
        label: "delete",
        color: "rgba(241,57,57,0.77)",
    },
    put : {
        label: "get",
        color: "#3521e5",
    },
} satisfies ChartConfig

export function ChartBarStacked({data}:any) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>

                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    className="w-48 h-12"   // 원하는 너비/높이 지정
                                />
                            }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="get"
                            stackId="a"
                            fill="var(--color-get)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="post"
                            stackId="a"
                            fill="var(--color-post)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="delete"
                            stackId="a"
                            fill="var(--color-delete)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="put"
                            stackId="a"
                            fill="var(--color-put)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
