import React, {ReactNode, useEffect, useState} from "react";
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
import {useScheduleStore} from "@/storage/scheduleStore.ts";
import resourceClient from "@/shared/api/resourceClient.ts";
import {deleteSchedule, deleteScheduleData} from "@/features/schedule/api/schedule.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {FaCalendarDay, FaMale, FaMapPin, FaRegBuilding} from "react-icons/fa";

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

enum Status {
    SCHEDULED = "SCHEDULED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
}

const Schedule: React.FC = () => {
    const context = useOutletContext<SidebarContextType | undefined>();
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
    const [calendarData, setCalendarData] = useState<Schedules | null>(null);
    const [modal, setModal] = useState<boolean>(false);

    const [dataCheck, setDataCheck] = useState(false);
    const { data } = useScheduleStore();


    // 스케줄 분류 Map 정의
    const categoryMap: Record<Category,{icon: ReactNode; label:string; className: string}> = {
        [Category.PERSONAL]: { icon: <FaMale />, label: "개인", className: "bg-blue-100 text-blue-700" },
        [Category.COMPANY]: { icon : <FaRegBuilding /> ,label: "회사", className: "bg-green-100 text-green-700" },
        [Category.EVENT]: {icon:<FaCalendarDay />, label: "일정", className: "bg-red-100 text-red-700" },
        [Category.ETC]: { icon: <FaMapPin />, label: "기타", className: "bg-gray-100 text-gray-600" },
    };

    // 스케줄 상태 Map 정의
    const statusMap: Record<Status, { label:string; className: string}> = {
        [Status.SCHEDULED] : {label: "예정", className: "bg-green-300 text-white"},
        [Status.IN_PROGRESS] : {label: "진행중", className: "bg-blue-200 text-white"},
        [Status.COMPLETED] : {label: "완료", className: "bg-green-300 text-white"},
    }
    const renderCategoryTag = (category?: Category) => {
        const item = category ? categoryMap[category] : categoryMap[Category.ETC];
        return <Badge variant="outline" className={item.className}>{item?.icon}{item.label}</Badge>;
    };

    const renderStatusTag = (status?: Status) => {
        const item  = status ? statusMap[status] : "";
        return <Badge variant="outline" className={item.className}>{item.label}</Badge>;
    }

    console.log('dddddata',data);

    const deleteSchedule = async (idx:number)=>{

        try{
            const res = await deleteScheduleData(idx)   ;
            console.log(res);
        }catch (error){
            console.log(error)
        }
    }
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
            accessorKey: "status",
            id: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    상태
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => renderStatusTag(row.getValue("status")),
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
                console.log('로우 데이터',row)
                const user = row.original;
                const displayId = user.category === "personal" ? user.title : user.createdAt;
                const scheduleIdx = user.idx;

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
                                    deleteSchedule(scheduleIdx);
                                }}
                            >
                                <Badge variant="default" className="bg-red-500 text-white ">
                                    일정 삭제
                                </Badge>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    // const handleDataUpdate = (newData:Schedules) => {
    //     setData(newData);
    // };
    const {currentMonthSchedules, getCurrentMonthSchedules, loading} = useScheduleCalendar();
    useEffect(() => {
        getCurrentMonthSchedules(String(currentYear), String(currentMonth));
    }, [currentYear, currentMonth,calendarData,data]);

    useEffect(() => {
        if (context?.setRightSidebarContent) {
            context?.setRightSidebarContent(<ScheduleCardContainer/>);
        }

        if (context?.setLeftSidebarContent) {
            context?.setLeftSidebarContent(
                loading ? <div> 로딩중~~</div> : (
                    <Calendar data={calendarData || currentMonthSchedules}
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

    const tableData = data && data.length > 0 ? data : currentMonthSchedules;
    return (
        <main className="schedule-page-main">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">일정목록</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent className="w-[1000px]" value="account">
                    <DataTable columns={columns} data={tableData ?? []} isDataAdd={true} setModal={setModal} setDataCheck={setDataCheck} />

                </TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>

            {/*<ImageBlock src={scheduleImg} width="200px" height="200px"/>*/}
            {/*<ScheduleFormContainer  onDataUpdate={handleDataUpdate}/>*/}
            <Outlet/>
        </main>
    )
}
export default Schedule;