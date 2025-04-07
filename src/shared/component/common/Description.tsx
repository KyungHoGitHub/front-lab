import React from "react";
import './Description.css';

interface DescriptionItems{
    label : string;
    value: string;
}

interface DescriptionProps{
    items : DescriptionItems[];
}

const Description:React.FC<DescriptionProps> =({items})=>{
    return(
        <div className="descriptions-container">
            {items.map((item, index)=> (
                <div key={index} className="description-item">
                    <span className="description-label">{item.label}:</span>
                    <span className="description-value">{item.value}</span>
                </div>
            ))}
        </div>
    )
}
export default Description;