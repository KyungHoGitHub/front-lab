import React, {useRef} from "react";
import './Avatar.css';
import {postUserProfile} from "../../../features/mypage/api/Mypage.ts";


interface AvatarProps {
    size?: number;
    src?: string;
    onFileChange?: (file: File) => void;
}

const Avatar: React.FC<AvatarProps> = ({size, src, onFileChange}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        // 버튼 클릭 시 파일 입력 창 열기
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        onFileChange?.(file); // 부모 컴포넌트의 콜백 호출
    };
    return (
        <div className="avatar-container">
            <img className="avatar-image" src={src} style={{width: size, height: size}}/>
            <input
                type="file"
                className="avatar-upload-input"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }} // input 태그 숨김
            />
            <button className="avatar-change-btn" onClick={handleButtonClick}>
                프로필 이미지 변경
            </button>

        </div>
    )
}
export default Avatar;