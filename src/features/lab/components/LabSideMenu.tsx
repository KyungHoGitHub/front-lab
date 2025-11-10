import React from "react";
import {useTranslation} from "react-i18next";
import './LabSideMenu.css';
import {NavLink} from "react-router";

interface MenuItem {
    name: string;
    path: string;
}

const LabSideMenu: React.FC =() =>{
    const {t} = useTranslation();

    const menuItems: MenuItem[] = [
        {
            name: 'mock 파일 만들기', path: 'file'
        },
        {
            name: '메일 보내기', path: 'mail'
        },
        {
            name: '로그 통계', path: 'log-statistics'
        },
        {
            name: 'url 줄이기', path: 'url-short'
        },
        {
            name: '맞춤법 수정', path: 'spelling-check'
        },
        {
            name: 'UI play ground', path: 'ui-playground'
        }
    ]

    return(
        <nav className="lab-menu">
            <ul>
                {
                    menuItems.map((item)=>(
                        <li key={item.path}
                            className={({isActive}) => (isActive ? 'active' : '')}
                        >
                            <NavLink to={`/lab/${item.path}`}>
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