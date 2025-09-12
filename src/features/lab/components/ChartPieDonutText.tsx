"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
    Card, CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import dayjs from "dayjs";
import {SelectValue} from "@radix-ui/react-select";

export const description = "A donut chart with text"

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "성공",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ChartPieDonutText() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    const months = Array.from({length:12},(_, i)=>({
        label: dayjs().month(i).format("M월"),
        value: i + 1,
    }));
    
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0  flex justify-between">
                <CardTitle>월별 처리 성공 실패 </CardTitle>
                {/*<CardDescription>January - June 2024</CardDescription>*/}
                <CardAction>
                    
                    <Select>
                        <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="월"/>
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Visitors
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
                <CategoryCard/>
            </CardFooter>
        </Card>
    )
}

export const CategoryCard = ()=>{
    const taskColors = {
        planning: "#3B82F6", // 파란색 - 기획
        analysis: "#10B981", // 초록색 - 분석
        development: "#F59E0B", // 주황색 - 개발
        frontend: "#8B5CF6", // 보라색 - 프론트엔드
        backend: "#EF4444", // 빨간색 - 백엔드
        database: "#06B6D4", // 청록색 - 데이터베이스
        testing: "#F97316", // 주황빨간색 - 테스팅
        deployment: "#84CC16", // 라임색 - 배포
        summary: "#6B7280", // 회색 - 요약
    };
    return (
        <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-3">작업 유형별 색상 범례</h3>
            <div className="!grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: taskColors.deployment}}></div>
                    <span>200번대</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: taskColors.development}}></div>
                    <span>400번대</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: taskColors.frontend}}></div>
                    <span>프론트엔드 개발</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: taskColors.backend}}></div>
                    <span>500번대</span>
                </div>
            </div>
            <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded">
                <strong>사용법:</strong><br/>
                • 각 작업은 고유한 색상으로 구분됩니다<br/>
                • 작업을 클릭하여 편집할 수 있습니다<br/>
                • 드래그하여 일정을 조정할 수 있습니다<br/>
                • 작업 간 연결선을 그려 의존성을 설정할 수 있습니다<br/>
                • 진행률에 따라 작업 바 내부의 채움 정도가 달라집니다
            </div>
        </div>

    )
}