import React, {useEffect} from "react";
import {Outlet, useOutletContext} from "react-router";
import WorkspaceMenu from "@/features/workspace/components/WorkspaceMenu.tsx";
import LabSideMenu from "@/features/lab/components/LabSideMenu.tsx";
type LeftSidebarContextType = {
    setLeftSidebarContent: (content: React.ReactNode) => void;
};

const Lab:React.FC =()=>{
    const context = useOutletContext<LeftSidebarContextType | undefined>();

    useEffect(() => {
        if (context?.setLeftSidebarContent) {
            context.setLeftSidebarContent(<LabSideMenu/>);
            return () => context.setLeftSidebarContent(null);
        }
    }, [context]);
    return (

        <div className="workspace-content">
            <Outlet/>
        </div>

    )
}
export default Lab;