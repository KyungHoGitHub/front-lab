import React, {useMemo, useState} from 'react';
import BasicHeader from './shared/component/layout/header/BasicHeader';
import {Outlet} from 'react-router';
import './App.css';

const App: React.FC = () => {
    const [leftSidebarContent, setLeftSidebarContent] = useState<React.ReactNode>(null);
    const [rightSidebarContent, setRightSidebarContent] = useState<React.ReactNode>(null);
// context 객체를 useMemo로 안정화
    const outletContext = useMemo(() => ({
        setLeftSidebarContent,
        setRightSidebarContent,
    }), [setLeftSidebarContent, setRightSidebarContent]);

    return (

        <div className="main-layout">
            <BasicHeader/>
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

export default App;