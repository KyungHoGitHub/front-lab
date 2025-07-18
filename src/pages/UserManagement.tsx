import {Outlet, useOutletContext} from "react-router";
import React, {useEffect} from "react";
import WorkspaceMenu from "../features/workspace/components/WorkspaceMenu.tsx";
import AdminMenu from "../features/admin/component/AdminMenu.tsx";

type LeftSidebarContextType = {
    setLeftSidebarContent: (content: React.ReactNode) => void;
};

const UserManagement:React.FC = ()=>{
    const context = useOutletContext<LeftSidebarContextType | undefined>();

    useEffect(() => {
        console.log("Context in UserManagement:", context);
        if (context?.setLeftSidebarContent) {

            context.setLeftSidebarContent(<AdminMenu/>);
            return () => context.setLeftSidebarContent(null);
        }
    }, [context]);

    return (
        <div className="workspace-content">
  \
        </div>
    )
}
export default UserManagement;