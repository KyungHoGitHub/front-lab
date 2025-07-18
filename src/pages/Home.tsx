import React, {useEffect} from "react";
import './Home.css';

import ScheduleCardContainer from "../features/schedule/components/ScheduleCardContainer.tsx";
import {Outlet, useOutletContext} from "react-router";
import HomeMenuContainer from "../features/home/component/HomeMenuContainer.tsx";
import HomeTodoWidgetContainer from "../features/home/component/HomeTodoWidgetContainer.tsx";
import HomeBanner from "../features/home/component/HomeBanner.tsx";
import useVisitLog from "../shared/hooks/useVisitLog.ts";
import BarChart from "../shared/component/chart/BarChart.tsx";
import HomeScheduleWidgetContainer from "../features/home/component/HomeScheduleWidgetContainer.tsx";
import {useAuth} from "../features/contexts/components/AuthProvider.tsx";


type RightSidebarContextType = {
    setRightSidebarContent: (content: React.ReactNode) => void;
};

const Home:React.FC =()=>{
    const context = useOutletContext<RightSidebarContextType | undefined>();
    const {user} =useAuth();
    const {loading,visitLog} = useVisitLog();
    console.log('ddddddddddddddddddddd',user)
    useEffect(() => {
        if (context?.setRightSidebarContent) {
            context?.setRightSidebarContent(<ScheduleCardContainer/>);
            return () => context.setRightSidebarContent(null);
        }
    }, [context]);

    useEffect(() => {
        visitLog(); // ✅ 마운트 시 방문 기록 전송
    }, []);

    const data =
        [
            { "date": "2025-07-01", "count": 3 },
            { "date": "2025-07-02", "count": 7 },
            { "date": "2025-07-03", "count": 4 },
            { "date": "2025-07-04", "count": 10 },
            { "date": "2025-07-05", "count": 2 },
            { "date": "2025-07-06", "count": 8 },
            { "date": "2025-07-07", "count": 6 },
            { "date": "2025-07-08", "count": 12 },
            { "date": "2025-07-09", "count": 9 },
            { "date": "2025-07-10", "count": 5 },
            { "date": "2025-07-11", "count": 15 },
            { "date": "2025-07-12", "count": 3 },
            { "date": "2025-07-13", "count": 7 },
            { "date": "2025-07-14", "count": 11 },
            { "date": "2025-07-15", "count": 4 },
            { "date": "2025-07-16", "count": 6 },
            { "date": "2025-07-17", "count": 5 },
            { "date": "2025-07-18", "count": 9 },
            { "date": "2025-07-19", "count": 13 },
            { "date": "2025-07-20", "count": 8 },
            { "date": "2025-07-21", "count": 10 },
            { "date": "2025-07-22", "count": 4 },
            { "date": "2025-07-23", "count": 6 },
            { "date": "2025-07-24", "count": 7 },
            { "date": "2025-07-25", "count": 11 },
            { "date": "2025-07-26", "count": 3 },
            { "date": "2025-07-27", "count": 5 },
            { "date": "2025-07-28", "count": 9 },
            { "date": "2025-07-29", "count": 12 },
            { "date": "2025-07-30", "count": 6 },
            { "date": "2025-07-31", "count": 8 }
    ];
    return(
        <main className="home-page-main">
            <div className="home-header">
                <HomeMenuContainer/>

            </div>
            <div>
                {/*<BarChart data={data}/>*/}
                <HomeBanner/>
            </div>
            <div className="home-board-main">
            <HomeTodoWidgetContainer/>
            <HomeScheduleWidgetContainer/>
            </div>
            <Outlet/>
        </main>
    )
}
export default Home;