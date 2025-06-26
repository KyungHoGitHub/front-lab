import React, {useState} from "react";
import Calendar from "react-calendar";
import "./GenericCalendar.css";

interface Event {
    date: string;
    title: string;
    content: string;
}

const sampleEvents: Event[] = [
    { date: "2025-06-25", title: "회의",content:"2025 년 12월 31 일날 회의 일정이 예약 되어있다." },
    { date: "2025-06-28", title: "출장" ,content:"2025 년 12월 31 일날 출장 일정이 예약 되어있다."},
];

const GenericCalendar:React.FC =()=>{
    const [value, setValue] = useState<Date>(new Date());

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === "month") {
            const formattedDate = date.toISOString().slice(0, 10);
            const event = sampleEvents.find((e) => e.date === formattedDate);
            if (event) {
                return (
                    <div className="event-container" role="tooltip" aria-label={`${event.title}: ${event.content}`}>
                        <div className="event-dot"/>
                        <div className="event-tooltip">
                            <div className="event-title">{event.title}</div>
                        </div>
                    </div>
                );
            }
        }
        return null;
    };

    const tileClassName = ({date, view}: any) => {
        const match = sampleEvents.find(e => e.date === date.toISOString().slice(0, 10));
        if (view === 'month' && match) {
            return 'has-event';
        }
        return '';
    };

    return (
        <div className="calendar-wrapper">
            <Calendar
                locale="ko-KR"
                onChange={setValue}
                value={value}
                tileContent={tileContent}
                tileClassName={tileClassName}
                formatDay={(locale, date) => date.getDate().toString()}
                formatMonthYear={(locale, date) =>
                    `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`
                }
            />
        </div>
    )
}
export default GenericCalendar;