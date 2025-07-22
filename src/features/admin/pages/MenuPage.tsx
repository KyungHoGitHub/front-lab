import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../component/tab/Tabs.tsx";
import './menuPage.css';
import MenuList from "../component/MenuTable.tsx";
import MenuTable from "../component/MenuTable.tsx";


interface TabData {
    id: string;
    label: string;
    content: React.ReactNode;
}

const MenuPage:React.FC =()=>{
    const menus = [
        {
            category: '관리자 메뉴',
            path: 'api/admin/menu-list',
            mainMenu: [
                {name : '사용자 관리'},
                {name : '알림 관리'},
                {name : '설정 관리'},
            ],
            subMenus: [
                { name: '사용자 목록' },
                { name: '사용자 등록' },
            ],
        },
        {
            category: '메인 상단 메뉴',
            path: 'api/main/menu-list',
            mainMenu: [
                {name : '사용자 관리'},
                {name : '알림 관리'},
                {name : '설정 관리'},
            ],
            subMenus: [
                { name: '관리자 목록' },
                { name: '관리자 등록' },
            ],
        },
    ];

    const menuItems = [
        {
            idx: 12,
            key: null,
            path: "",
            menuName: "사용자관리",
            icon: "FaUser",
            children: [
                {
                    idx: 13,
                    key: null,
                    path: "memo",
                    menuName: "사용자목록",
                    icon: "FaUser"
                }
            ]
        },
        {
            idx: 14,
            key: null,
            path: null,
            menuName: "설정",
            icon: "FaCog",
            children: [
                {
                    idx: 15,
                    key: null,
                    path: "menu-list",
                    menuName: "메뉴 조회",
                    icon: null
                }
            ]
        }
    ];

    const tabs: TabData[] = [
        { id: 'menu-list', label: '메뉴 목록', content: <MenuTable menus={menus}/> },
        { id: 'menu-insert', label: '메뉴 등록', content:  '준비중'},
    ];

    return(
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}
export default MenuPage;