import React, { useState } from 'react';
import './MenuTable.css';

interface SubMenu {
    name: string;
}

interface  MainMenu{
    name: string;
}
interface MenuData {
    category: string;
    path: string;
    mainMenu: MainMenu[];
    subMenus: SubMenu[];
}

interface MenuTableProps {
    menus: MenuData[];
}

const MenuTable: React.FC<MenuTableProps> = ({ menus }) => {
    const [expandedRows, setExpandedRows] = useState<string[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    console.log(menus)
    // 화살표 클릭 시 하위 메뉴 토글
    const toggleSubMenu = (category: string) => {
        setExpandedRows((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };

    // 대메뉴 버튼 클릭 시 선택 상태 업데이트
    const handleSelectMenu = (category: string) => {
        setSelectedMenu(category);
        toggleSubMenu(category)
    };

    return (
        <div className="menu-table-container">
            {/* 헤더 */}
            <div className="menu-table-header">
                <div className="menu-table-header-item">메뉴 분류</div>
                <div className="menu-table-header-item">대메뉴</div>
                <div className="menu-table-header-item">하위메뉴</div>
                <div className="menu-table-header-item">이동 경로</div>
            </div>
            {/* 메뉴 목록 */}
            {menus.map((menu) => (
                <div key={menu.category} className="menu-row">
                    <div className="menu-table-item">{menu.category}</div>
                    <div className="menu-table-select-item">
                        <select
                            className={`select-button ${selectedMenu === menu.category ? 'active' : ''}`}
                            onClick={() => handleSelectMenu(menu.category)}
                        >
                            {menu.mainMenu.map((mainMenu) => (
                                <option key={mainMenu.name} value={mainMenu.name}>{mainMenu.name}</option>
                            ))
                            }
                        </select>
                    </div>
                    {expandedRows.includes(menu.category) && (
                        <div className="submenu-table-container">
                            <ul className="submenu-list">
                                {menu.subMenus.map((subMenu, index) => (
                                    <li key={index} className="submenu-table-item">
                                        {subMenu.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="menu-table-item">{menu.path}</div>
                </div>
            ))}
        </div>
    );
};

export default MenuTable;