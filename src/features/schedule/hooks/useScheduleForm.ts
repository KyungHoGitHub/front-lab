import {useState} from "react";
import {createSchedule} from "../api/schedule.ts";

interface ScheduleRequestDto{
    category: string;
    startDateTime: string;
    endDateTime: string;
    content: string;
}


const useScheduleForm=()=>{
     const [loading, setLoading]  = useState<boolean>(false);

    const scheduleSubmit = async (data:ScheduleRequestDto)=>{
        setLoading(true);
        try{
            const res = await createSchedule(data);

        }catch (error){
            console.error(error);
        }finally {
            setLoading(false);
        }
    }
    return {loading, scheduleSubmit};
}
export default useScheduleForm;