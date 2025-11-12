import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

interface WeeklyScheduleHeaderProps {
    setWeekDate : React.Dispatch<React.SetStateAction<any>>;
    weekDate : any;
}

const WeeklyScheduleNavigation =({setWeekDate,weekDate}:WeeklyScheduleHeaderProps)=>{
    const formatted = `${weekDate.format("YYYY년 MM월 DD")} ~ ${weekDate.add(6,"day").format("DD일")}`;

    const handlePreviousWeekButtonClick = ()=>{
      const lastWeekStart = weekDate.subtract(7,"day");
        setWeekDate(lastWeekStart);
    };

    const handleNextWeekButtonClick = () =>{
        const nextWeekStart = weekDate.add(7,"day");
        setWeekDate(nextWeekStart);
    };
    return (
        <div className="flex items-center justify-between p-3 md:px-6 md:py-4 bg-gray-30 rounded-md shadow-sm">
            <Button
                variant="outline"
                className="bg-white text-black border-gray-300 hover:bg-gray-100"
                onClick={()=> handlePreviousWeekButtonClick()}
            >
                다음주<LuChevronLeft/>
            </Button>
            <span className="font-semibold">{formatted}</span>
            <Button
                variant="outline"
                className="bg-white text-black border-gray-300 hover:bg-gray-100"
                onClick={()=> handleNextWeekButtonClick()}
            >
                다음주<LuChevronRight/>
            </Button>
        </div>
    )
}
export default WeeklyScheduleNavigation;
