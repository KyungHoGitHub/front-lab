import React from "react";
import './Card.css';


interface CardProps {
    title?: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({title, children}) => {

    return (
        <div className="custom-card">
            {title && <div className="card-header">{title}</div>}
            <div className="card-content">{children}</div>
        </div>
    )
}
export default Card;