import React from "react";
import {useTranslation} from "react-i18next";
import './LabSideMenu.css';
import {NavLink} from "react-router";

const LabSideMenu: React.FC =() =>{
    const {t} = useTranslation();

    const menuItems = [
        {
            name: 'mock 파일 만들기', paht: 'file'
        },
        {
            name: '메일 보내기', paht: 'mail'
        },
        {
            name: '로그 통계', paht: 'log-statistics'
        },
        {
            name: 'url 줄이기', paht: 'url-short'
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