import {useState} from "react";
import {postVisitLog} from "../api/log.ts";

const useVisitLog =()=>{
    const [loading, setLoading] = useState<boolean>(false);

    const visitLog = async ()=>{
        setLoading(true)
        try{
            const res = await postVisitLog();
            console.log(res);
        }catch (error){
            console.log(error);
        }finally {
            setLoading(false);
        }
    }
    return {loading,visitLog};

}
export default useVisitLog;