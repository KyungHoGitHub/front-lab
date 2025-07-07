import React, {useEffect, useState} from "react";
import './Schedule.css';
import scheduleImg from '@assets/header-schedule.jpg';

import ScheduleCardContainer from "../features/schedule/components/ScheduleCardContainer.tsx";
import {Outlet, useOutletContext} from "react-router";
import ImageBlock from "../shared/component/image/ImageBlock.tsx";
import ScheduleFormContainer from "../features/schedule/components/ScheduleFormContainer.tsx";
import Calendar from "../shared/component/calendar/Calendar.tsx";
import useScheduleCalendar from "../features/schedule/hooks/useScheduleCalendar.ts";

type SidebarContextType = {
    setRightSidebarContent: (content: React.ReactNode) => void;
    setLeftSidebarContent: (content: React.ReactNode) => void;
}

const Schedule: React.FC = () => {
    const context = useOutletContext<SidebarContextType | undefined>();
    const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    const {currentMonthSchedules, getCurrentMonthSchedules, loading} = useScheduleCalendar();

    useEffect(() => {
        getCurrentMonthSchedules(String(currentYear), String(currentMonth));
    }, [currentYear, currentMonth]);

    useEffect(() => {
        if (context?.setRightSidebarContent) {
            context?.setRightSidebarContent(<ScheduleCardContainer/>);
        }

        if (context?.setLeftSidebarContent) {
            context?.setLeftSidebarContent(
                loading ? <div> 로딩중~~</div> : (
                    <Calendar data={currentMonthSchedules}
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

    return (
        <main className="schedule-page-main">
            <ImageBlock src={scheduleImg} width="200px" height="200px"/>
            <ScheduleFormContainer/>
            <Outlet/>
        </main>
    )
}
export default Schedule;