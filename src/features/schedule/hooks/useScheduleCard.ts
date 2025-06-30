import {useEffect, useState} from "react";


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
                setTimeout(() => {
                    setSchedule(dummySchedule);
                },1000);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
            ;

        }
        fetchSchedule();
    }, []);


    return {schedule, loading};


}
export default useScheduleCard;