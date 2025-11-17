// 주간 일정 개별 셀 인터페이스
// dayIndex -> 0 : 일요일 ~ 6 :토요일
// hour -> 08,09 ... 시간대
import {Category} from "@/features/weekly-schedule/enum/WeekDay.ts";

export interface SelectedCell {
    dayIndex: number;
    hour: number
}

export interface ScheduleEvent {
    id: string;
    title: string;
    description?: string;
    dayIndex: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    color?: string;
    category?: Category;
    weekDay?: string;
}

export interface FormData {
    title: string;
    description?: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay?: string;
    category: Category;
}

