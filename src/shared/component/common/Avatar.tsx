import React from "react";
import './Avatar.css';


interface AvatarProps {
    size?: number;
    src?: string;
    onChange?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({size, src, onChange}) => {

    return (
        <div className="avatar-container">
            <img className="avatar-image" src={src} style={{width: size, height: size}}/>
            {onChange && (
                <button className="avatar-change-btn" onClick={onChange}>
                    프로필 이미지 변경
                </button>
            )}
        </div>
    )
}
export default Avatar;