import './scheduleCard.css';

interface ScheduleCardProps{
    item: {
        category: string;
        content: string;
    };
}

const ScheduleCard = ({item}: ScheduleCardProps)=>{

    return (

        <div className="scheduleCard-content">{item.content}</div>
    )
}
export default ScheduleCard;