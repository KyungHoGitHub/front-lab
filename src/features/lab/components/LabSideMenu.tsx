import React from "react";
import {useTranslation} from "react-i18next";
import './LabSideMenu.css';
import {NavLink} from "react-router";

const LabSideMenu: React.FC =() =>{
    const {t} = useTranslation();

    const menuItems = [
        {
            name: '파일', paht: 'file'
        },
        {
            name: '메일', paht: 'mail'
        }
    ]

    return(
        <nav className="lab-menu">
            <ul>
                {
                    menuItems.map((item)=>(
                        <li key={item.paht}
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            <NavLink to={`/lab/${item.paht}`}>
                                <span className="lab-menu-text">{item.name}</span>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
export default LabSideMenu;