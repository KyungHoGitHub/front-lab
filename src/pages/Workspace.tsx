import {Outlet, useOutletContext} from "react-router";
import React, {useEffect} from "react";
import WorkspaceMenu from "../features/workspace/components/WorkspaceMenu.tsx";

type LeftSidebarContextType = {
    setLeftSidebarContent: (content: React.ReactNode) => void;
};

const Workspace: React.FC = () => {
    const context = useOutletContext<LeftSidebarContextType | undefined>();

    useEffect(() => {
        if (context?.setLeftSidebarContent) {
            context.setLeftSidebarContent(<WorkspaceMenu/>);
            return () => context.setLeftSidebarContent(null);
        }
    }, [context]);


    return (
        <div className="workspace-content">
            <Outlet/>
        </div>
    )
}
export default Workspace;