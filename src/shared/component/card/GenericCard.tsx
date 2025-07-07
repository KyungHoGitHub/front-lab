import React, {ReactNode} from "react";
import './GenericCard.css';

interface GenericCardProps<T> {
    data: T;
    CardComponent: React.FC<{ item: T }>;
    leftHeader?: string | ReactNode;
    rightHeader?: string | ReactNode;
}

const GenericCard = <T, >({
                              data,
                              CardComponent,
                              leftHeader,
                              rightHeader
                          }: GenericCardProps<T>) => {

    // 헤더 타입 체크
    // 타입에 따른 반환값
    // string : 제목
    // ReactNode  : <html> 태그
    const renderHeaderContent = (header: string | React.ReactNode) => {
        if(typeof header === "string"){
            return <span>{header}</span>
        }
        return <>{header}</>;
    };

    return (
        <div className="schedule-card-container">

            {(leftHeader || rightHeader) && (
                <div className="schedule-card-header">
                    {leftHeader && (
                        <div className="card-left-header">
                            {renderHeaderContent(leftHeader)}
                        </div>
                    )}
                    {rightHeader && (
                        <div className="card-right-header">
                            {renderHeaderContent(rightHeader)}
                        </div>
                    )}
                </div>
            )}
            <div className="card-grid">
                        <CardComponent key={data.index} item={data}/>
            </div>
        </div>
    )
}
export default GenericCard;