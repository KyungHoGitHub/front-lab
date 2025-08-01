import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import './HomeMenuContainer.css';
import todoImg from '@assets/todo.png';
import chatImg from '@assets/chat.png';
import memoImg from '@assets/memo.png';
import scheduleImg from '@assets/schedule.png';
import mypageImg from '@assets/mypage.png';
import settingImg from '@assets/setting.gif';
import {excludedMenusByRole, MenuList} from "../enum/homeMenu.ts";
import {useAuth} from "../../contexts/components/AuthProvider.tsx";
import {jwtDecode} from "jwt-decode";

interface MenuItemList {
    icon: string;
    title: string;
    menuName: string;
    path: string;
};

const MenuTitle: React.FC<{ menuName: string }> = ({ menuName }) => {
    const [visible, setVisible] = useState(true);
    const [displayName, setDisplayName] = useState(menuName);

    useEffect(() => {
        setVisible(false);
        const timeout = setTimeout(() => {
            setDisplayName(menuName);
            setVisible(true);
        }, 300);

        return () => clearTimeout(timeout);
    }, [menuName]);

    return (
        <span className={`menu-title ${visible ? "visible" : "hidden"}`}>
      {displayName ? (
          <>
              <span className="menu-highlight">{displayName}</span> 메뉴로 이동해볼까요?
          </>
      ) : (
          "메뉴를 선택해 주세요"
      )}
    </span>
    );
};

const HomeMenuContainer: React.FC = () => {
    const [menuName, setMenuName] = useState<string>("");
    const {token} = useAuth();

    // 메뉴 아이콘 클릭 이동을 위한 locagtionApi 훅 사용
    const navigate = useNavigate();

    // 홈 화면 메뉴 선택 목록
    const menuItemList: MenuItemList[] = [
        {icon: todoImg, title: "Todo", menuName: "할일", path: "workspace/todo"},
        {icon: chatImg, title: "Chat", menuName: "채팅", path: "workspace/chat"},
        {icon: memoImg, title: "Memo", menuName: "메모", path: "workspace/memo"},
        {icon: scheduleImg, title: "Schedule", menuName: "스케줄", path: "schedule"},
        {icon: mypageImg, title: "Mypage", menuName: "마이페이지", path: "mypage"},
        {icon: settingImg, title: "Setting", menuName: "설정", path: "admin"},
    ];

    const getMenuByRole = (role:string, fullMenusList: MenuItemList[]):MenuItemList[] =>{
        const excluded = excludedMenusByRole[role] || [];
        return fullMenusList.filter(menu=> !excluded.includes(menu.title));
    }
    const decodeToken = jwtDecode(token);

    return (
        <div className="home-menu-container">
            <div className="home-menu-header">
                <MenuTitle menuName={menuName} />
            </div>
            <div className="home-menu-icon-select-bar">
                {menuItemList.map((menu) => (
                    <div
                        key={menu.title}
                        className="menu-card"
                        onClick={() => navigate(`/${menu.path}`)}
                        onMouseEnter={() => setMenuName(menu.menuName)}
                        onMouseLeave={() => setMenuName('')}
                    >
                        <img src={menu.icon} alt={menu.title} className="menu-card-icon"/>
                        <span className="menu-card-title">{menu.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default HomeMenuContainer;