import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import userIcon from '@assets/userIcon.png';
import './UserAvatar.css';
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
}

const UserAvatar: React.FC<UserAvatarProps> = ({userData, dropdownItem}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }

    const dropdownItemClick = (item: DropdownItem) => {
        navigate(item.path);
        setIsOpen(false);
    }


   useEffect(() => {
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
                <img src={userIcon} alt="alt"/>
                <span>{userData.name}</span>
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