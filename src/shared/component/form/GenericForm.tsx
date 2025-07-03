import React from "react";
import BasicForm from "./BasicForm.tsx";
import {UseFormReturn} from "react-hook-form";

interface GenericFormProps<T>{
    form: UseFormReturn<T>;
    onSubmit : (data:T) => void;
    children: React.ReactNode;
    loading: boolean;
}

const GenericForm =<T,>({form, onSubmit,children,loading}:GenericFormProps<T>)=>{
    const {handleSubmit} = form;
    return(
        <BasicForm onSubmit={handleSubmit(onSubmit)} loading={loading}>
            {children}
        </BasicForm>
    )
}
export  default GenericForm;