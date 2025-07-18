import React from "react";

import scheduleCalendarImg from '@assets/schedule-calendar.gif';
import './HomeScheduleWidgetContainer.css'
import ScheduleCardContainer from "../../schedule/components/ScheduleCardContainer.tsx";
import Calendar from "../../../shared/component/calendar/Calendar.tsx";

const mockData = [
    {
        category: 'PERSONAL',
        content: 'rttest',
        startDateTime: '2025-07-03T15:48:00',
        endDateTime: '2025-07-03T15:52:00',
    },
    {
        category: 'COMPANY',
        content: '오늘의 일정',
        startDateTime: '2025-07-04T15:00:00',
        endDateTime: '2025-07-04T15:30:00',
    },
    {
        category: 'COMPANY',
        content: '데이터 서밋 참석',
        startDateTime: '2025-07-14T09:29:00',
        endDateTime: '2025-07-14T17:00:00',
    },
    {
        category: 'COMPANY',
        content: 'K-AI 커뮤니티 서밋',
        startDateTime: '2025-07-23T14:00:00',
        endDateTime: '2025-07-23T17:00:00',
    },
    {
        category: 'PERSONAL',
        content: '테스트',
        startDateTime: '2025-07-07T16:50:00',
        endDateTime: '2025-07-07T16:50:00',
    },
    {
        category: 'PERSONAL',
        content: '오늘의 일정',
        startDateTime: '2025-07-11T11:20:00',
        endDateTime: '2025-07-11T11:21:00',
    },
];

const HomeScheduleWidgetContainer:React.FC =()=>{

    return(
        <div className="schedule-widget-container">
            <div className="schedule-widget-container-header">
                <img src={scheduleCalendarImg}></img>
                <h3 style={{marginLeft: "10px"}} className="todo-tilte">일정</h3>

            </div>
            <div className="schedule-widget-container-main">
                <div className="calendar-container">
                    <Calendar data={mockData}/>
                </div>
                {/*<div className="vertical-line"></div>*/}

                {/*<div className="schedule-conatiner">*/}
                {/*    <ScheduleCardContainer/>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
export default HomeScheduleWidgetContainer;