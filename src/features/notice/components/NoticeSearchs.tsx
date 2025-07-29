import React, {ReactNode} from "react";
import'./NoticeSearchs.css';
import * as FaIcons from "react-icons/fa";

interface NoticeSearchsProps {
    children: ReactNode;
    className: string;
}

type OptionItems = {
    label: string;
    value: string;
}

interface SearchSelectProps {
    value: string;
    onChange: (value: string) => void;
    options?: OptionItems[];
    className?: string;
}

interface SearchInputProps {
    value : string;
    placeholder?: string;
    onChange : (value: string) => void;
    className?: string;
}

interface ButtonProps {
    onClick: () => void;
    title: string;
    className?: string;
}

const dynamicIcon  = (text: string) =>{
    const IconComponent = FaIcons[text as keyof typeof FaIcons];
    return IconComponent ? <IconComponent /> : null;
}

const NoticeSearchs = ({children, className = ""}: NoticeSearchsProps) => {

    return (
        <div className={`notice-search-container ${className}`}>{children}</div>
    )
}

const SearchSelect = ({value, onChange, options = [],className=""}: SearchSelectProps) => {
    return (
        <select className={`search-select ${className}`} value={value} onChange={(e) => onChange(e.target.value)}>
            {
                options.map((item) => (
                    <option key={item.label} value={item.value}>{item.label}</option>
                ))}
        </select>
    )
}

const SearchInput = ({value,placeholder = "",onChange,className}:SearchInputProps) =>{
    return(
        <input
            type="text"
            className={`search-input ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}
const SearchButton = ({onClick, title,className}: ButtonProps) => {
    return (
        <button onClick={onClick} className={`search-button ${className}`}>
            <span>{dynamicIcon(title)}</span>
        </button>
    )
}

const CreateButton = ({onClick, title,className}: ButtonProps) => {
    return (
        <button onClick={onClick} className={`create-button ${className}`}><span>{dynamicIcon(title)}</span></button>
    )
}

export {NoticeSearchs, SearchSelect,SearchInput, SearchButton, CreateButton};