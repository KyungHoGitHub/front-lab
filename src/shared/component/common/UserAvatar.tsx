import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import userIcon from '@assets/userIcon.png';
import './UserAvatar.css';
import {useAuth} from "../../../features/contexts/components/AuthProvider.tsx";
import {getUserInfo} from "../../api/user.ts";
interface UserInfo {
    name: string;
    img: string;
}

interface UserAvatarProps {
    title: string;
    userData: UserInfo;
    dropdownItem: DropdownItem[];
}

interface DropdownItem {
    title: string;
    path: string;
    onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({userData, dropdownItem}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [usersData, setUsersData] = useState({});

    console.log('유저 정보 확인 해보기----------------->', usersData);
    const {logout} = useAuth();
    const navigate = useNavigate();

    console.log('드랍 다운 아이템', dropdownItem);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }

    const dropdownItemClick = (item: DropdownItem) => {
        if(item.onClick){
            console.log('onclick 실행됨'); // ✅ 디버깅 로그 추가
            logout();
        }
        navigate(item.path);


        setIsOpen(false);
    }


   useEffect(() => {

       const fetchUser = async ()=>{
           try {
               const response = await getUserInfo();
               setUsersData(response.data);
           }catch (error){
               console.log(error)
           }
       }

       fetchUser();
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && event.target instanceof Node && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };


    }, [isOpen]);


    return (
        <div className="user-avatar-container" ref={dropdownRef}>
            <div
                className="user-avatar"
                onClick={handleOnClick}
                role="button"
            >
                <img src={usersData?.data?.imageUrl} alt="alt"/>
                {/*<span>{usersData.data.id}</span>*/}
            </div>
            {
                isOpen && (
                    <ul className="dropdown-menu">
                        {dropdownItem.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => dropdownItemClick(item)}
                                className="dropdown-item"
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default UserAvatar;