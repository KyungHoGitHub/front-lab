import {useEffect, useState} from "react";
import {getScheduleList} from "../api/schedule.ts";


const dummySchedule = [
    {category: "work",date:"20205-01 ~20205-02", content: "다음달 업무 미팅 예정"},
    {category: "personal",date:"20205-01 ~20205-02", content: "다음달 업무 미팅 예정"},
    {category: "personal",date:"20205-01 ~20205-02", content: "다음달 업무 미팅 예정"},
    {category: "event",date:"20205-01 ~20205-02", content: "다음달 업무 미팅 예정"},
]

interface ScheduleData {
    category : string;
    date: string;
    content: string;
}

const useScheduleCard = () => {
    const [schedule, setSchedule] = useState<ScheduleData[]| null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true);
            try {
                const res = getScheduleList();
                console.log(res)
                setSchedule(res.data.data);

            } catch (error) {

            } finally {
                setLoading(false);
            }
        }
        fetchSchedule();
    }, []);


    return {schedule, loading};


}
export default useScheduleCard;