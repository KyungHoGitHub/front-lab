import {useState} from "react";
import {createDummyFile} from "@/features/lab/api/fileForm.ts";

export const useFileForm = ()=>{
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async (data) =>{
        setLoading(true);
        try {
            const res = await createDummyFile(data);
        } catch (error){
            console.error(error)
        }finally {
            setLoading(false);
        }
    }

    return{
            onSubmit,
    }
}