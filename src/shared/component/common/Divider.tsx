import React from "react";
import './Divider.css';

interface DividerProps {
    className?: string;
}
const Divider: React.FC<DividerProps> = ({className=''}) => {

    return (
        <hr className={`divider ${className}`}/>

    )
}
export default Divider;