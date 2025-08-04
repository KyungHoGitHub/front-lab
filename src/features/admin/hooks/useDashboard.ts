import {useCallback, useEffect, useState} from "react";
import {getUserCountList} from "../api/admin.ts";

interface Data {
    totalUserCount : number;
    todayVisitUserCount: number;
}
export const useDashboard = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData]  = useState<Data | null>(null);

   const fetchData = useCallback(async ()=>{
       setLoading(true);
       try{
           const res = await getUserCountList();
           setData(res.data.data);

       }catch (e){
           console.log(e);
       }finally {
           setLoading(false);
       }
   },[]);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    return { loading, data };
};

