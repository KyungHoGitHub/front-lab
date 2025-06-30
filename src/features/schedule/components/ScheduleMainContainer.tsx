import ImageBlock from "../../../shared/component/image/ImageBlock.tsx";
import scheduleImg from "*.jpg";
import React from "react";

const ScheduleMainContainer:React.FC =()=>{

    return(
        <div className="schedule-container-header">
            <ImageBlock src={scheduleImg} width="200px" height="200px"/>
        </div>
    )
}
export default ScheduleMainContainer;
