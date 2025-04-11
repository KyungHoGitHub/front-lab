import React from 'react';
import BasicHeader from './shared/component/layout/header/BasicHeader';
import { Outlet } from 'react-router';
import './App.css';
import WeatherWidget from "./features/widget/components/WeatherWidget.tsx";

const App: React.FC = () => {
    return (
        <div className="main-layout">
            <BasicHeader />
            <div className="content-row">
                <aside className="left-sidebar">
                    {/* 왼쪽 사이드바 콘텐츠 (예시로 텍스트 추가) */}
                    <h3>Left Sidebar</h3>
                    <p>여기에 메뉴 또는 위젯을 추가할 수 있습니다.</p>
                </aside>
                <main className="main-content">
                    <Outlet />
                </main>
                <aside className="right-sidebar">
                    <WeatherWidget/>
                </aside>
            </div>
        </div>
    );
};

export default App;