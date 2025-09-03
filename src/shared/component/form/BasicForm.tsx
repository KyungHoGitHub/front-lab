import React from "react";
import './basicForm.css';
import {Button} from "@/components/ui/button.tsx";

interface BasicFormProps {
    children: React.ReactNode;
    onSubmit : (e: React.FormEvent) => void;
    loading: boolean;
}

const BasicForm:React.FC<BasicFormProps> = ({children,onSubmit,loading}) =>{

    return(
        <form className="base-form" onSubmit={onSubmit}>
            <div className="base-form-content">{children}</div>
            <Button className="ml-auto item w-[100px]" type="submit"> {loading ? "submit중~" : "등록"}</Button>
        </form>
    )
}
export default BasicForm;