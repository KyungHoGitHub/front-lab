import './adminMenu.css';
import {NavLink} from "react-router";
import React, {useState} from "react";
import {FaBell, FaChevronDown, FaCog, FaUser} from "react-icons/fa";
import {useAdminMenu} from "../hooks/useAdminMenu.ts";

const AdminMenu: React.FC = () => {
    const {openDropdown, toggleDropdown} = useAdminMenu();

    const menuItems = [
        {
             name: "사용자 관리", icon: <FaUser/>,
            children: [
                {name: "사용자 목록", path: "/admin/users/list", icon: <FaUser/>},
                {name: "사용자 설정", path: "/admin/users/settings", icon: <FaUser/>},
            ],
        },
        {
             name: "알림", icon: <FaBell/>,
            children: [
                {name: "알림 목록", path: "/admin/users/list", icon: <FaUser/>},
                {name: "알림 설정", path: "/admin/users/settings", icon: <FaUser/>},
            ],
        },
        {
            name: "설정", icon: <FaCog/>,
            children: [
                {name: "프로젝트 설정", path: "/admin/users/list", icon: <FaUser/>},
            ],
        },
    ];

    return (
        <div className="admin-menu-container">
            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li key={item.name} className="menu-item">
                        <div className="menu-link-wrapper">
                            <NavLink
                                to={item.path}
                                className={({isActive}) =>
                                    `menu-link${isActive ? ' active' : ''}`
                                }
                                onClick={() => item.children && toggleDropdown(item.name)} // Toggle dropdown if children exist
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-text">{item.name}</span>
                                {item.children && (
                                    <span className={`dropdown-icon ${openDropdown === item.name ? 'open' : ''}`}>
                                        <FaChevronDown/>
                                    </span>
                                )}
                            </NavLink>
                        </div>
                        {/* Render dropdown for children */}
                        {item.children && openDropdown === item.name && (
                            <ul className="submenu-list">
                                {item.children.map((child) => (
                                    <li key={child.name} className="submenu-item">
                                        <NavLink
                                            to={child.path}
                                            className={({isActive}) =>
                                                `submenu-link${isActive ? ' active' : ''}`
                                            }
                                        >
                                            <span className="submenu-icon">{child.icon}</span>
                                            <span className="submenu-text">{child.name}</span>
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