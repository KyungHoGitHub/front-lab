import React, {useEffect} from "react";
import './Home.css';

import ScheduleCardContainer from "../features/schedule/components/ScheduleCardContainer.tsx";
import {Outlet, useOutletContext} from "react-router";
import Test from "../shared/component/common/Test.tsx";
import HomeMenuContainer from "../features/home/component/HomeMenuContainer.tsx";
import HomeTodoWidgetContainer from "../features/home/component/HomeTodoWidgetContainer.tsx";
import HomeBanner from "../features/home/component/HomeBanner.tsx";


type RightSidebarContextType = {
    setRightSidebarContent: (content: React.ReactNode) => void;
};

const Home:React.FC =()=>{
    const context = useOutletContext<RightSidebarContextType | undefined>();

    useEffect(() => {
        if (context?.setRightSidebarContent) {
            context?.setRightSidebarContent(<ScheduleCardContainer/>);
            return () => context.setRightSidebarContent(null);
        }
    }, [context]);

    return(
        <main className="home-page-main">
            <div className="home-header">
                <HomeMenuContainer/>
            </div>
            <div>
                <HomeBanner/>
            </div>
            <div className="home-board-main">
            <HomeTodoWidgetContainer/>
            <HomeTodoWidgetContainer/>
            </div>
            <Outlet/>
        </main>
    )
}
export default Home;