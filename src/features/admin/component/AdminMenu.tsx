import './adminMenu.css';
import {NavLink} from "react-router";
import React from "react";

const AdminMenu: React.FC = () => {

    const menuItems = [
        { name: "dddd", path: "/admin/users" },
        { name: "dddd", path: "/admin/notifications" },
        { name: "dddd", path: "/admin/settings" },
    ];

    return (
        <div className="admin-menu-container">
            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path} // /admin 경로로 수정
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            <span className="menu-text">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default AdminMenu;