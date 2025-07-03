import React from "react";
import './basicForm.css';

interface BasicFormProps {
    children: React.ReactNode;
    onSubmit : (e: React.FormEvent) => void;
    loading: boolean;
}

const BasicForm:React.FC<BasicFormProps> = ({children,onSubmit,loading}) =>{

    return(
        <form className="base-form" onSubmit={onSubmit}>
            <div className="base-form-content">{children}</div>
            <button type="submit" className="base-form-submit-button">
                {loading ? "submit중~" : "sumit"}
            </button>
        </form>
    )
}
export default BasicForm;