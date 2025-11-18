import {FormData} from "@/features/weekly-schedule/types/week-schedule.ts";
import {Category} from "@/features/weekly-schedule/enum/WeekDay.ts";

export const DAYS: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const HOURS: Array<number> = Array.from({length: 12}, (_, i) => i + 8);

export const FIRST_HOUR_LABEL_INDEX = 0;

export const INITIAL_FORM_DATA: FormData = {
    title: "",
    description: "",
    startHour: 9,
    startMinute: 0,   // 추가
    endHour: 10,
    endMinute: 0,
    weekDay: "",
    category: Category.company,
};
