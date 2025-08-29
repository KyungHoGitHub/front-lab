import React, {useState} from "react";
import './BasicHeader.css';
import {NavLink} from "react-router";
import UserAvatar from "../../common/UserAvatar.tsx";
import ToggleButton from "../../common/ToggleButton.tsx";
import Menu from "../../common/Menu.tsx";
import {useTranslation} from 'react-i18next';
import LanguageSelectorButton from "../../common/LanguageSelectorButton.tsx";
import logoImg from '@assets/mainLogo.png';
import {useAuth} from "../../../../features/contexts/components/AuthProvider.tsx";
import {useUserStore} from "../../../../storage/userStore.ts";
import {TokenTimer} from "@/shared/component/timer/TokenTimer.tsx";


// BasicHeader 프로젝트의 기본으로 사용되는 헤더 영역 컴포넌트
interface BasicHeaderProps {
    user?: {
        profileImage: string;
        userId: string;
    }
}

const BasicHeader: React.FC<BasicHeaderProps> = () => {
    const {t} = useTranslation();
    const {token, logout} = useAuth();
    // nav 열림 닫힘
    const [isNavOpen, setIsNavOpen] = useState(false);
    const {user} = useUserStore();



    const getMenuItems = () => {
        const commonMenuItems = [
            {menuName: t('header.menu-workspace'), path: '/workspace'},
            {menuName: t('header.menu-schedule'), path: '/schedule'},
            {menuName: t('header.menu-notice'), path: '/notice'},
            {menuName: "연구실", path: '/lab'},
        ];

        // admin 전용 메뉴
        const adminMenuItem = [
            {menuName: t('header.menu-admin'), path: '/admin'},
        ]

        if (user?.role === 'admin') {
            return [...commonMenuItems, ...adminMenuItem]
        }
        return commonMenuItems;
    }


    const menuItems = getMenuItems();
    const userData =
        {name: 'peng', img: ''}

    const dropdownItems = [
        {title: t('userInfo.user_settings'), path: '/mypage'},
        {title: t('userInfo.mode_select'), path: '/homedsd'},
        {
            title: t('userInfo.logout'),
            onClick: () => {
                logout();
            },
        },
    ]
    const languageItem = [
        {name: '한글', value: 'ko'},
        {name: '영어', value: 'en'},
    ]
    console.log('전역 유저 값 확인', user);
    return (
        <header className="basic-header">
            <div className="header-container">
                <div className="left-section">
                    <div className="logo-section">
                        <NavLink to="/home">
                            <img src={logoImg} alt=".." className="logo-img"/>
                        </NavLink>
                    </div>
                    <nav className={isNavOpen ? 'open' : ''}>
                        <Menu menuItems={menuItems}/>
                    </nav>
                </div>
                <TokenTimer exp={user?.exp}/>
                <LanguageSelectorButton dropdownItem={languageItem}/>
                <ToggleButton
                    setIsOpen={setIsNavOpen}
                    classElement="nav-toggle"
                    isOpen={isNavOpen}
                />
                <UserAvatar title="" dropdownItem={dropdownItems}/>
            </div>
        </header>
    )
}
export default BasicHeader;