import {useAuth} from "../../contexts/components/AuthProvider.tsx";
import React, {ReactNode, useMemo, useState} from "react";
import BasicHeader from "../../../shared/component/layout/header/BasicHeader.tsx";
import {Outlet} from "react-router";
import './adminDashboard.css';

export type LeftSidebarContextType = {
    setLeftSidebarContent: (content: ReactNode) => void;
    leftSidebarContent: ReactNode;
};

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();
    const [leftSidebarContent, setLeftSidebarContent] = useState<ReactNode>(null);
    const [rightSidebarContent, setRightSidebarContent] = useState<React.ReactNode>(null);
    const outletContext = useMemo(() => ({
        setLeftSidebarContent,
    }), [setLeftSidebarContent, setRightSidebarContent]);


    if (user?.role !== "admin") return null;

    return (
        <div className="main-layout">
            <BasicHeader />
            <div className="content-row">
                <aside className="left-sidebar">
                    {/* 왼쪽 사이드바 콘텐츠 (예시로 텍스트 추가) */}
                    {leftSidebarContent || (
                        <></>
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

export default AdminDashboard;