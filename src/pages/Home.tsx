import React, {useEffect} from "react";
import './Home.css';

import ScheduleCardContainer from "../features/schedule/components/ScheduleCardContainer.tsx";
import {Outlet, useOutletContext} from "react-router";
import Test from "../shared/component/common/Test.tsx";


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
            <Test/>
        <Outlet/>
        </main>
    )
}
export default Home;