import React from "react";
import './basicForm.css';

interface BasicFormProps {
    children: React.ReactNode;
    onSubmit : (e: React.FormEvent) => void;
}

const BasicForm:React.FC<BasicFormProps> = ({children,onSubmit}) =>{

    return(
        <form className="base-form" onSubmit={onSubmit}>
            <div className="base-form-content">{children}</div>
        </form>
    )
}
export default BasicForm;