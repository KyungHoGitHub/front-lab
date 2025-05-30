import React, {useMemo, useState} from 'react';
import BasicHeader from './shared/component/layout/header/BasicHeader';
import { Outlet } from 'react-router';
import './App.css';
import WeatherWidget from "./features/widget/components/WeatherWidget.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type LeftSidebarContextType = {
    setLeftSidebarContent: (content: React.ReactNode) => void;
};

const App: React.FC = () => {
   const [leftSidebarContent, setLeftSidebarContent] = useState<React.ReactNode>(null);

// context 객체를 useMemo로 안정화
    const outletContext = useMemo(() => ({
        setLeftSidebarContent,
    }), [setLeftSidebarContent]);
    return (

        <div className="main-layout">
            <BasicHeader />
            <div className="content-row">
                <aside className="left-sidebar">
                    {/* 왼쪽 사이드바 콘텐츠 (예시로 텍스트 추가) */}
                    {leftSidebarContent ||(
                        <>
                            <p>왼쪽 위젯 영역</p>
                        </>
                    )
                    }
                </aside>
                <main className="main-content">
                    <Outlet context={outletContext}  />
                </main>
                <aside className="right-sidebar">
                    <WeatherWidget/>
                </aside>
            </div>
        </div>
    );
};

export default App;