
// 날짜 시간을 문자열로 결합
import {WeekDay} from "@/features/weekly-schedule/enum/WeekDay.ts";
import {basic} from "@/constants/color.ts";
import dayjs, {Dayjs} from "dayjs";

export const combineDateTime = (day:string, hour:number, minute:number):string  =>{
    const [year, month, dayOfMonth] = day.split("-").map(Number);
    const pad = (n:number) => n.toString().padStart(2,"0");

    return `${year}-${pad(month)}-${pad(dayOfMonth)}T${pad(hour)}:${pad(minute)}:00`;
}

// 요일값(dayIndex: 0 일요일) 따른 색상갑 반환
export const getDayColor = (dayIndex:number) =>{
    switch (dayIndex) {
        case WeekDay.Sat :
            return basic.blue;
        case WeekDay.Sun:
            return basic.red;
        default:
            return basic.gray;
    }
}

// 현재 시간이 해당 셀 범위 안에 있는지 체크
export const isCurrentTimeInCell =(weekDate: Dayjs ,dayIndex:number, hour:number,currentTime:Dayjs):boolean=>{

    console.log(typeof weekDate)
    console.log(weekDate)
    const baseDate = dayjs(weekDate)
    console.log(typeof weekDate)
    console.log("basedate 타입",baseDate)
    const cellDate =  baseDate.add(dayIndex,"day");
    const isToday = cellDate.isSame(currentTime, 'day');
    const currentHour = currentTime.hour();

    return  isToday && currentHour ===hour;
};

// 현재 시간 인디케이터 위치 계산
export const getCurrentTimePosition = (weekDate: Dayjs,dayIndex: number,currentTime: Dayjs):number|null=>{

    const baseDate = dayjs(weekDate)
    const cellDate = baseDate.add(dayIndex, "day");
    const isToday = cellDate.isSame(currentTime, 'day');

    if (!isToday) return null;

    const currentHour = currentTime.hour();
    const currentMinute = currentTime.minute();

    // 8시부터 시작하므로 offset 계산
    if (currentHour < 8 || currentHour >= 20) return null;

    const hourOffset = currentHour - 8;
    return hourOffset * 60 + currentMinute;
}
