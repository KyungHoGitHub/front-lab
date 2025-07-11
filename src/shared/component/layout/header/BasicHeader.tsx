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


// BasicHeader 프로젝트의 기본으로 사용되는 헤더 영역 컴포넌트
interface BasicHeaderProps {
    user?: {
        profileImage: string;
        userId: string;
    }
}

const BasicHeader: React.FC<BasicHeaderProps> = () => {
    const {t} = useTranslation();
    const {logout} = useAuth();
    // nav 열림 닫힘
    const [isNavOpen, setIsNavOpen] = useState(false);

    const menuItems = [
        {menuName: t('header.menu1'), path: '/usage'},
        {menuName: t('header.menu2'), path: '/user-info'},
        {menuName: t('header.menu3'), path: '/statistics-page'},
        {menuName: t('header.menu4'), path: '/workspace'},
        {menuName: t('header.menu5'), path: '/schedule'},
    ];
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

                <LanguageSelectorButton dropdownItem={languageItem}/>

                <ToggleButton
                    setIsOpen={setIsNavOpen}
                    classElement="nav-toggle"
                    isOpen={isNavOpen}
                />

                <UserAvatar title="" userData={userData} dropdownItem={dropdownItems}/>
            </div>
        </header>
    )
}
export default BasicHeader;