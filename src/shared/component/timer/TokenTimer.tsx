import React, {useEffect, useState} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {FcAlarmClock} from "react-icons/fc";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

interface TokenTimerProps {
    exp: number; // 만료 시간 (Unix timestamp, 초 단위)
}

export function TokenTimer({exp}: TokenTimerProps) {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        const now = Math.floor(Date.now() / 1000); // 현재시간 (초 단위)
        const diff = exp - now;
        setTimeLeft(diff > 0 ? diff : 0);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [exp]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Tooltip>
            <TooltipTrigger>
                <div
                    className="flex justify-between items-center w-28 h-10 bg-white border border-gray-300 px-4 py-2 rounded-md">
                    <FcAlarmClock size={24} className="shrink-0"/>
                    <Badge
                        variant={timeLeft < 60 ? "destructive" : "secondary"}
                        className=""
                    >
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </Badge>
                </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="z-1000">
                <p>토큰 만료 남은 시간</p>
            </TooltipContent>
        </Tooltip>
    );
}