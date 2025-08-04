import {useState} from "react";
import {createSchedule} from "../api/schedule.ts";
import {toast} from "react-toastify";

interface ScheduleRequestDto{
    title: string;
    category: string;
    startDateTime: string;
    endDateTime: string;
    content: string;
}


const useScheduleForm=()=>{
     const [loading, setLoading]  = useState<boolean>(false);

    const submitScheduleForm = async (data:ScheduleRequestDto)=>{
        setLoading(true);
        try{
            const res = await createSchedule(data);
            if(res!=null){
                toast.success("일정이 정상적으로 등록 되엇습니다.");
                return res.data;
            }
        }catch (error){
            console.error(error);
        }finally {
            setLoading(false);
        }
    }
    return {loading, submitScheduleForm};
}
export default useScheduleForm;