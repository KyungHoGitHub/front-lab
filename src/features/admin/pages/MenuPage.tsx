import React, {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../component/tab/Tabs.tsx";
import './menuPage.css';
import MenuList from "../component/MenuTable.tsx";
import MenuTable from "../component/MenuTable.tsx";
import {getAdminSideMenuList} from "../api/admin.ts";


interface TabData {
    id: string;
    label: string;
    content: React.ReactNode;
}

export interface SubMenu {
    name: string;
    path: string | null;
}

export interface MainMenu {
    name: string;
}

export interface Menus {
    category: string;
    path: string;
    mainMenu: MainMenu[];
    subMenus: SubMenu[];
}

interface MenuData {
    idx: number;
    key: string | null;
    path: string | null;
    menuName: string;
    icon: string | null;
    children: {
        idx: number;
        key: string | null;
        path: string | null;
        menuName: string;
        icon: string | null;
    }[];
}
enum MenuKey {
    ADMIN = 'admin',
    MAIN = 'main'
}
const MenuPage:React.FC =()=>{
    const [menuList, setMenuList] = useState([]);
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
                { name: '사용자 목록' ,path :'api/test'},
                { name: '사용자 등록',path :'api/test' },
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
                { name: '관리자 목록',path :'api/test' },
                { name: '관리자 등록',path :'api/test' },
            ],
        },
    ];

    const menuData = [
        {
            idx: 12,
            key: 'admin',
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
            key: 'admin',
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
    const getCategoryName = (key: string | null):string =>{
        const categoryMap: Record<MenuKey,string> ={
            [MenuKey.ADMIN] : '관리자메뉴',
            [MenuKey.MAIN] : '메인 상단 메뉴'
        };
        return key && key in categoryMap ? categoryMap[key as MenuKey] : `${key || 'unknown'} 메뉴`;
    }
    const transformMenuData = (menuData: MenuData[]): Menus[] => {
        // key별로 그룹화
        const groupedByKey = menuData.reduce((acc, item) => {
            const key = item.key || 'unknown'; // key가 null인 경우 'unknown'으로 처리
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {} as Record<string, MenuData[]>);

        // 결과를 저장할 배열
        const result: Menus[] = [];
        console.log('key 별 ', groupedByKey);
        // 각 key 그룹 처리
        Object.entries(groupedByKey).forEach(([key, items]) => {
            console.log('키값',key);
            console.log('아이템값',items);
            const mainMenu: MainMenu[] = items.map((item) => ({ name: item.menuName }));
            const subMenus: SubMenu[] = items.flatMap((item) =>
                item.children && item.children.length > 0 // children이 존재하고 비어있지 않은 경우만 처리
                    ? item.children.map((child) => ({
                        name: child.menuName,
                        path: child.path,
                    }))
                    : []
            );

            // category 매핑
            const categoryMap: Record<string, string> = {
                admin: '관리자 메뉴',
                main: '메인 상단 메뉴',
            };

            const category = getCategoryName(key); // 동적 category 생성

            // path는 첫 번째 유효한 path만 사용, 없으면 제외
            const validPath = items.find((item) => item.path)?.path;

            const menu: Menus = {
                category,
                mainMenu,
            };

            // path가 존재할 경우에만 추가
            if (validPath) {
                menu.path = validPath;
            }

            if (subMenus.length > 0) {
                menu.subMenus = subMenus;
            }
            result.push(menu);
        });

        return result;
    };


    const transformMenu = (menuList) =>
        menuList.map(({ subMenu, ...rest }) => {
            const transformedChildren = subMenu && subMenu.length > 0 ? transformMenu(subMenu) : undefined;
            return {
                ...rest,
                ...(transformedChildren && { children: transformedChildren }),
            };
        });


    const tabs: TabData[] = [
        { id: 'menu-list', label: '메뉴 목록', content: <MenuTable menus={transformMenuData(transformMenu(menuList))}/> },
        { id: 'menu-insert', label: '메뉴 등록', content:  '준비중'},
    ];

    useEffect(() => {
        const fetchMenuList  = async ()=>{
            const res = await getAdminSideMenuList();
            setMenuList(res.data);
        }
        fetchMenuList();
    }, []);

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