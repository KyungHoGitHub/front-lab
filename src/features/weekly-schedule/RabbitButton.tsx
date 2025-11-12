import {Button} from "@/components/ui/button.tsx";
import React, {useState} from "react";
import { LuChevronLeft } from "react-icons/lu";



const RabbitButton: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        // 이전 주로 이동하는 로직
        console.log("이전 주로 이동!");
        // 실제로는 router.push() 또는 상태 변경
    };
    return (
        <div className="flex items-center justify-centerbg-gradient-to-br from-blue-50 to-purple-50">
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                <Button
                    variant="outline"
                    className="bg-white text-black border-gray-300 hover:bg-gray-100"
                    onClick={handleClick}
                >
                    <LuChevronLeft/>
                    이전주
                </Button>

                {/* 토끼 애니메이션 */}
                <div
                    className={`absolute -top-12 left-1/4 -translate-x-1/2 transition-all duration-500 ${
                        isHovered
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
                >
                    {/* 말풍선/팻말 */}
                    <div
                        className="relative bg-white rounded-lg shadow-lg px-4 py-2 mb-2 border-2 border-gray-800 z-[9999]">
                        <div className="text-sm font-bold text-gray-800 whitespace-nowrap">
                            이전 주로 이동
                        </div>
                        {/* 말풍선 꼬리 */}
                        <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-800 z-[9999]"></div>
                        <div
                            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-7 border-l-transparent border-r-7 border-r-transparent border-t-7 border-t-white z-[9999]"></div>
                    </div>

                    {/* 토끼 */}
                    <div className={`text-6xl transition-transform duration-300 ${
                        isHovered ? 'animate-bounce' : ''
                    }`}>
                        {/*<img src={rabbitImg} className="menu-card-icon"/>*/}
                    </div>
                </div>

                {/* 장식 효과 */}
                {/*{isHovered && (*/}
                {/*    <>*/}
                {/*        <div className="absolute -top-2 -right-2 text-xl animate-ping">✨</div>*/}
                {/*        <div className="absolute -bottom-2 -left-2 text-xl animate-ping delay-100">✨</div>*/}
                {/*    </>*/}
                {/*)}*/}
            </div>

            {/* 설명 텍스트 */}
            {/*<div className="absolute bottom-10 text-center text-gray-600">*/}
            {/*    <p className="text-sm">마우스를 올려보세요! 🐰</p>*/}
            {/*</div>*/}
        </div>
    );
};

export default RabbitButton;