import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import './UserAvatar.css';
import {useAuth} from "../../../features/contexts/components/AuthProvider.tsx";
import {getUserInfo} from "../../api/user.ts";
import {jwtDecode} from "jwt-decode";
import {useUserStore} from "../../../storage/userStore.ts";
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
interface UserData {
    idx: number;
    id: string;
    username: string;
    imageUrl: string;
    createdAt: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ dropdownItem}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [usersData, setUsersData] = useState<UserData|null>(null);
    const user = useUserStore((state) => state.user);
    const {logout} = useAuth();
    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }

    const dropdownItemClick = (item: DropdownItem) => {
        if(item.onClick){
            logout();
        }
        navigate(item.path);
        setIsOpen(false);
    }

   useEffect(() => {
       const fetchUser = async ()=>{
           try {
               const response = await getUserInfo();
               setUsersData(response.data.data);
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


    }, []);


    return (
        <div className="user-avatar-container" ref={dropdownRef}>
            <div
                className="user-avatar"
                onClick={handleOnClick}
                role="button"
            >
                <img src={usersData?.imageUrl} alt="alt"/>
                <span>{user?.userId}</span>
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