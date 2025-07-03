import React, {useEffect} from "react";
import './Schedule.css';
import scheduleImg from '@assets/header-schedule.jpg';

import ScheduleCardContainer from "../features/schedule/components/ScheduleCardContainer.tsx";
import {Outlet, useOutletContext} from "react-router";
import ImageBlock from "../shared/component/image/ImageBlock.tsx";
import ScheduleFormContainer from "../features/schedule/components/ScheduleFormContainer.tsx";


type RightSidebarContextType = {
    setRightSidebarContent: (content: React.ReactNode) => void;
};

const Schedule:React.FC =()=>{
    const context = useOutletContext<RightSidebarContextType | undefined>();

    useEffect(() => {
        if (context?.setRightSidebarContent) {
            context?.setRightSidebarContent(<ScheduleCardContainer/>);
            return () => context.setRightSidebarContent(null);
        }
    }, [context]);

    return(
        <main className="schedule-page-main">
            <ImageBlock src={scheduleImg} width="200px" height="200px"/>
            <ScheduleFormContainer/>
            <Outlet/>
        </main>
    )
}
export default Schedule;