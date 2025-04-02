import React, {useEffect, useRef, useState} from "react";
import trasferIcon from '@assets/googletransfer.svg';
import {useTranslation} from "react-i18next";
import './LanguageSelectorButton.css';

interface LanguageDropdownItem {
    name: string;
    value: string;
}

interface LanguageDropdownProps {
    dropdownItem: LanguageDropdownItem[]
}

const LanguageSelectorButton: React.FC<LanguageDropdownProps> = ({dropdownItem}) => {
    // 노출 여부
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        setIsOpen(!isOpen);
    }

    const {i18n} = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
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

        <div className="language-button-container" ref={dropdownRef}>
            <button className="language-button" onClick={() => handleOnClick()}>
                <img src={trasferIcon} alt="test"/>
            </button>
            {
                isOpen && (
                    <ul className="language-dropdown-menu">
                        {dropdownItem.map((item, index) => (
                            <li
                                className="language-dropdown-item"
                                key={index}
                                onClick={() => changeLanguage(item.value)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}
export default LanguageSelectorButton;