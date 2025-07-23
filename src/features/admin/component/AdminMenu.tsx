import './adminMenu.css';
import {NavLink} from "react-router";
import React, {useEffect, useState} from "react";
import {FaBell, FaChevronDown, FaCog,  FaUser} from "react-icons/fa";
import {useAdminMenu} from "../hooks/useAdminMenu.ts";
import {getAdminSideMenuList} from "../api/admin.ts";
import * as FaIcons from "react-icons/fa";

interface MenuItem {
    idx: number;
    key: string | null;
    path: string;
    menuName: string;
    icon: string;
    subMenu?: MenuItem[];
}

interface TransformedMenuItem {
    idx: number;
    key: string | null;
    path: string;
    menuName: string;
    icon: string;
    children?: TransformedMenuItem[];
}

const AdminMenu: React.FC = () => {
    const [menuList, setMenuList] = useState<TransformedMenuItem[]>([]);
    const {openDropdown, toggleDropdown} = useAdminMenu();

    const transformMenu = (menuList: MenuItem[]): TransformedMenuItem[] =>
        menuList.map(({ subMenu, ...rest }) => {
            const transformedChildren = subMenu && subMenu.length > 0 ? transformMenu(subMenu) : undefined;
            return {
                ...rest,
                ...(transformedChildren && { children: transformedChildren }),
            };
        });

    const dynamicIcon = (iconName:string) =>{
        const IconComponent = FaIcons[iconName as keyof typeof FaIcons];
        return IconComponent ? <IconComponent /> : null;
    };

    useEffect(() => {
        const menuFetch = async () =>{
            const res  = await getAdminSideMenuList("admin");
            setMenuList(transformMenu(res.data));
        }
        menuFetch();
    }, []);

    console.log('관리자 왼쪽 메뉴 리스트',menuList)
    return (
        <div className="admin-menu-container">
            <ul className="menu-list">
                {menuList.map((item) => (
                    <li key={item.idx} className="menu-item">
                        <div className="menu-link-wrapper">
                            <NavLink
                                to={item.path}
                                className={({isActive}) =>
                                    `menu-link${isActive ? ' active' : ''}`
                                }
                                onClick={() => item.children && toggleDropdown(item.idx)} // Toggle dropdown if children exist
                            >
                                <span className="menu-icon">{dynamicIcon(item.icon)}</span>
                                <span className="menu-text">{item.menuName}</span>
                                {item.children  && (
                                    <span className={`dropdown-icon ${openDropdown === item.idx ? 'open' : ''}`}>
                                        <FaChevronDown/>
                                    </span>
                                )}
                            </NavLink>
                        </div>
                        {/* Render dropdown for children */}
                        {item.children  && openDropdown === item.idx && (
                            <ul className="submenu-list">
                                {item.children.map((child) => (
                                    <li key={child.idx} className="submenu-item">
                                        <NavLink
                                            to={child.path}
                                            className={({isActive}) =>
                                                `submenu-link${isActive ? ' active' : ''}`
                                            }
                                        >
                                            <span className="submenu-icon">{dynamicIcon(child.icon)}</span>
                                            <span className="submenu-text">{child.menuName}</span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default AdminMenu;