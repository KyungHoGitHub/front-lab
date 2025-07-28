import React from "react";
import './IconAndTextButton.css';

interface IconAndTextButtonProps {
    icon?: React.ReactNode;
    text: string;
    onClick?: React.MouseEventHandler<HTMLSpanElement>
    style?: React.CSSProperties;
    className?: string;
}

const renderIcon = (icon?: string | React.ReactNode) => {
    if (!icon) {
        return null;
    }
    switch (typeof icon) {
        case "string": {
            return <img src={icon} alt={icon} className="icon-span"/>;
        }
        case "object": {
            return <span className="icon-span">{icon}</span>;
        }
        default: {
            return null;
        }
    }
};

const IconAndTextButton = ({
                               icon,
                               text,
                               onClick,
                               style = {},
                           }: IconAndTextButtonProps) => {


    return (
        <button type="button" className="icon-text-button" onClick={onClick} style={{
            ...style,
            cursor: onClick ? "pointer" : "default",
        }}>
            {renderIcon(icon)}
            <span className="text-span">{text}</span>
        </button>
    )
}
export default IconAndTextButton;