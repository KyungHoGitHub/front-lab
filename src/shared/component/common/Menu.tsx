import React from "react";
import {Link} from "react-router";


interface MenuItems {
    menuName: string,
    path: string,
}

interface MenuProps {
    menuItems: MenuItems[]
}

const Menu: React.FC<MenuProps> = ({menuItems}) => {

    return (
        <ul>
            {menuItems.map((item, index) => (
                <li key={index}>
                    <Link to={item.path}>{item.menuName}</Link>
                </li>
            ))}
        </ul>
    )
}
export default Menu;