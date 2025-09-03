import React, {useEffect, useState} from "react";
import './Schedule.css';

import ScheduleCardContainer from "../features/schedule/components/ScheduleCardContainer.tsx";
import {Outlet, useOutletContext} from "react-router";
import Calendar from "../shared/component/calendar/Calendar.tsx";
import useScheduleCalendar from "../features/schedule/hooks/useScheduleCalendar.ts";
import {DataTable} from "@/shared/component/table/DataTable.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import dayjs from "dayjs";
import {Badge} from "@/components/ui/badge.tsx";

type SidebarContextType = {
    setRightSidebarContent: (content: React.ReactNode) => void;
    setLeftSidebarContent: (content: React.ReactNode) => void;
}

interface Schedules {
    idx: number;
    category: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
}

enum Category {
    PERSONAL = "PERSONAL",
    COMPANY = "COMPANY",
    EVENT = "EVENT",
    ETC = "ETC",
}

const Schedule: React.FC = () => {
    const context = useOutletContext<SidebarContextType | undefined>();
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [data, setData] = useState<Schedules | null>(null);
    const [modal, setModal] = useState<boolean>(false);

    // 스케줄 분류 Map 정의
    const categoryMap: Record<Category,{label:string; className: string}> = {
        [Category.PERSONAL]: { label: "개인", className: "bg-blue-100 text-blue-700" },
        [Category.COMPANY]: { label: "회사", className: "bg-green-100 text-green-700" },
        [Category.EVENT]: { label: "일정", className: "bg-red-100 text-red-700" },
        [Category.ETC]: { label: "기타", className: "bg-gray-100 text-gray-600" },
    };

    const renderCategoryTag = (category?: Category) => {
        const item = category ? categoryMap[category] : categoryMap[Category.ETC];
        return <Badge variant="outline" className={item.className}>{item.label}</Badge>;
    };

    const mockUsers = Array.from({ length: 20 }, (_, index) => {
        const id = (index + 1).toString(); // 고유한 id 생성
        const baseData =  [
            {
                id: "1",
                category: "company",
                title: "주간 스프린트 회의",
                startDateTime: "2025-07-14 09:00:00",
                endDateTime: "2025-07-14 10:30:00",
                createdAt: "2025-06-30T08:00:00Z",
            },
            {
                id: "2",
                category: "company",
                title: "고객사 미팅 (프로젝트 진행 보고)",
                startDateTime: "2025-07-15 14:00:00",
                endDateTime: "2025-07-15 15:30:00",
                createdAt: "2025-07-01T11:20:00Z",
            },
            {
                id: "3",
                category: "event",
                title: "Spring Boot 세미나 참석",
                startDateTime: "2025-07-16 13:00:00",
                endDateTime: "2025-07-16 17:00:00",
                createdAt: "2025-07-02T09:30:00Z",
            },
            {
                id: "4",
                category: "company",
                title: "분기 매출 보고서 작성 마감",
                startDateTime: "2025-07-17 09:00:00",
                endDateTime: "2025-07-17 18:00:00",
                createdAt: "2025-07-03T10:00:00Z",
            },
            {
                id: "5",
                category: "company",
                title: "보안 점검 결과 회의",
                startDateTime: "2025-07-18 11:00:00",
                endDateTime: "2025-07-18 12:00:00",
                createdAt: "2025-07-04T13:15:00Z",
            },
        ];
        return baseData[index % 5]; // 5개 데이터 반복, id는 고유
    }).map((item, index) => ({ ...item, id: (index + 1).toString() })); // id 재설

    const columns = [
        {
            accessorKey: "title",
            id: "title",
            header: "제목",
            cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
            enableHiding: true,
        },
        {
            accessorKey: "category",
            id: "category",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    분류
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => renderCategoryTag(row.getValue("category")),
            enableHiding: true,
        },
       
        {
            accessorKey: "startDateTime",
            id: "startDateTime",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    시작일시
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) =>  {
                const value = row.getValue("startDateTime") as string;
                return <div>{value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-"}</div>;
            },
            enableHiding: true,
        },
        {
            accessorKey: "endDateTime",
            id: "endDateTime",
            header: "종료일시",
            cell: ({ row }) => {
              const value = row.getValue("endDateTime") as string;
              return <div>{value ? dayjs(value).format("YYYY-MM-DD HH:mm") : "-"}</div>
            },
            enableHiding: true,
        },
        {
            accessorKey: "createdAt",
            id: "createdAt",
            header: "생성일",
            cell: ({ row }) => {
                const value = row.getValue("createdAt") as string;
                return <div>{value ? dayjs(value).format("YYYY-MM-DD") : "-"}</div>
            },
            enableHiding: true,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {

                const user = row.original;
                const displayId = user.category === "personal" ? user.title : user.createdAt;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger >
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-50">
                            <DropdownMenuLabel>더보기</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    if (displayId) {
                                        navigator.clipboard.writeText(displayId);

                                    }
                                }}
                            >
                                일정 수정하기
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const handleDataUpdate = (newData:Schedules) => {
        setData(newData);
    };
    const {currentMonthSchedules, getCurrentMonthSchedules, loading} = useScheduleCalendar();

    useEffect(() => {
        getCurrentMonthSchedules(String(currentYear), String(currentMonth));
    }, [currentYear, currentMonth,data]);

    useEffect(() => {
        if (context?.setRightSidebarContent) {
            context?.setRightSidebarContent(<ScheduleCardContainer/>);
        }

        if (context?.setLeftSidebarContent) {
            context?.setLeftSidebarContent(
                loading ? <div> 로딩중~~</div> : (
                    <Calendar data={data || currentMonthSchedules}
                              onMonthChange={(year, month) => {
                                  setCurrentYear(year);
                                  setCurrentMonth(month);
                              }}
                    />));
        }
        return () => {
            context?.setRightSidebarContent(null);
            context?.setLeftSidebarContent(null);
        };
    }, [context, currentMonthSchedules]);
         console.log("currentMonthSchedules",currentMonthSchedules)
    return (
        <main className="schedule-page-main">
            <DataTable columns={columns} data={currentMonthSchedules} isDataAdd={true} setModal={setModal} />
            {/*<ImageBlock src={scheduleImg} width="200px" height="200px"/>*/}
            {/*<ScheduleFormContainer  onDataUpdate={handleDataUpdate}/>*/}
            <Outlet/>
        </main>
    )
}
export default Schedule;