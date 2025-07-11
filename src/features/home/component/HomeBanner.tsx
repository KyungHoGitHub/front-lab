import React, {useEffect, useRef, useState} from "react";
import './HomeBanner.css';
import githubImg from '@assets/github&react.png';
import javascriptImg from '@assets/javascript.png';
const messages = [
    {
        text:  "📢 새로운 공지사항이 등록되었습니다",
        imageUrl : githubImg
    },
    {
        text:  "📢 새로운 공지사항이 등록되었습니다",
        imageUrl : javascriptImg
    },
    {
        text:  "📢 새로운 공지사항이 등록되었습니다",
        imageUrl : githubImg
    },
];
const HomeBanner:React.FC =()=>{
    const [index, setIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 3000); // 3초마다 변경

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const togglePause = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else {
            intervalRef.current = setInterval(() => {
                setIndex((prev) => (prev + 1) % messages.length);
            }, 3000);
        }
    };

    return (
        <div className="vertical-banner-wrapper" onClick={togglePause}>
            <div className="vertical-banner-content" style={{transform: `translateY(-${index * 170}px)`}}>
                {messages.map((msg, idx) => (
                    <div className="vertical-banner-item" key={idx}>
                        <img src={msg.imageUrl} alt="" className="banner-image"/>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default HomeBanner;