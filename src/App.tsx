import React, {useMemo, useState} from 'react';
import BasicHeader from './shared/component/layout/header/BasicHeader';
import {Outlet} from 'react-router';
import './App.css';
import WeatherWidget from "./features/widget/components/WeatherWidget.tsx";
import GenericCalendar from "./shared/component/calendar/GenericCalendar.tsx";
import Calendar from "./shared/component/calendar/Calendar.tsx";


type LeftSidebarContextType = {
    setLeftSidebarContent: (content: React.ReactNode) => void;
};

const App: React.FC = () => {
    const [leftSidebarContent, setLeftSidebarContent] = useState<React.ReactNode>(null);
    const [rightSidebarContent, setRightSidebarContent] = useState<React.ReactNode>(null);
// context 객체를 useMemo로 안정화
    const outletContext = useMemo(() => ({
        setLeftSidebarContent,
        setRightSidebarContent,
    }), [setLeftSidebarContent, setRightSidebarContent]);
    const schedules = [
        {
            category: 'company',
            content: '오늘의 일정',
            startDateTime: '2025-07-04T15:00:00',
            endDateTime: '2025-07-04T15:30:00',
        },
        {
            category: 'event',
            content: '오늘의 일정',
            startDateTime: '2025-07-11T15:00:00',
            endDateTime: '2025-07-04T15:30:00',
        },
        {
            category: 'company',
            content: '오늘의 일정',
            startDateTime: '2025-07-04T15:00:00',
            endDateTime: '2025-07-04T15:30:00',
        },
        {
            category: 'company',
            content: '오늘의 일정',
            startDateTime: '2025-07-04T15:00:00',
            endDateTime: '2025-07-04T15:30:00',
        },
    ];
    return (

        <div className="main-layout">
            <BasicHeader/>
            <div className="content-row">
                <aside className="left-sidebar">
                    {/* 왼쪽 사이드바 콘텐츠 (예시로 텍스트 추가) */}
                    {leftSidebarContent || (
                        <>
                            <Calendar
                                data={schedules}
                            />
                            {/*<button onClick={() => setOpen(true)}>모달 열기</button>*/}
                            {/*<GenericFormModal*/}
                            {/*    title="test"*/}
                            {/*    isOpen={open}*/}
                            {/*    FormComponent={TestForm}*/}
                            {/*    onClose={() => console.log('닫기')}*/}
                            {/*/>*/}
                        </>
                    )
                    }
                </aside>
                <main className="main-content">
                    <Outlet context={outletContext}/>
                </main>
                <aside className="right-sidebar">
                    {rightSidebarContent || (
                        <></>
                    )}
                </aside>
            </div>

        </div>
    );
};

export default App;