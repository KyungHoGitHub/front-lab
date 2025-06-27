import {loginForm} from "../api/login.ts";
import React, {useState} from "react";
import {LoginFormData} from "../types/login.ts";

export const useLogin = () =>{
    const [loading, setLoading] = useState<boolean>(false);

    const validateFormData = (beforeData: LoginFormData)=>{
        const data ={
            userId : beforeData.userId.trim(),
            password: beforeData.password.trim(),
        };

        return data;
    }

    const onSubmit = async (formData: LoginFormData)=> {
        setLoading(true);
        const data = validateFormData(formData)

        try{
            const res = await  loginForm(data);
        }   catch (error){
            console.error(error)
        } finally {
            console.log("");
            setLoading(false);
        }
    }
    return{
        onSubmit,
        validateFormData,
    }
}