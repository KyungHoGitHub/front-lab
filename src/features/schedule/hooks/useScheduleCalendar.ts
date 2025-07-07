import {useState} from "react";
import {getCurrentScheduleList} from "../api/schedule.ts";
import {extractData} from "../../../shared/utill/response.ts";

interface CurrentSchedules {
    idx: number;
    category: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
}

const useScheduleCalendar = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentMonthSchedules, setCurrentMonthSchedules] = useState<CurrentSchedules[]>([]);

    const getCurrentMonthSchedules = async (year: string, month: string) => {
        setLoading(true);
        try {
            const res = await getCurrentScheduleList(year, month);

            const data = extractData(res);
            setCurrentMonthSchedules(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return {loading, getCurrentMonthSchedules, currentMonthSchedules};
}

export default useScheduleCalendar;