import dayjs, {Dayjs} from "dayjs";
import {ScheduleEvent} from "@/features/weekly-schedule/types";
import {CategoryColor} from "@/features/weekly-schedule/enum/WeekDay.ts";
import {Clock} from "lucide-react";


interface ScheduleEventRenderItemProps {
    event: ScheduleEvent;
    onClick: (event: ScheduleEvent, e: React.MouseEvent) => void;
}


const ScheduleEventRenderItem = ({ event, onClick }:ScheduleEventRenderItemProps) => {
    const startTotalMinutes = event.startHour * 60 + event.startMinute;
    const endTotalMinutes = event.endHour * 60 + event.endMinute;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    const height = durationMinutes;
    const topOffset = event.startMinute;

    return (
        <div
            className={`absolute inset-x-1 ${CategoryColor[event.category]} text-white rounded p-2 text-xs cursor-pointer hover:opacity-90 transition-opacity z-10 overflow-hidden shadow-md`}
            style={{
                height: `${height}px`,
                top: `${topOffset}px`
            }}
            onClick={(e) => {
                e.stopPropagation();
                onClick(event, e);
            }}
        >
            <div className="font-semibold truncate mb-1">{event.title}</div>
            <div className="text-[10px] opacity-90 flex items-center gap-1">
                <Clock size={10} />
                {event.startHour}:{event.startMinute.toString().padStart(2, '0')} - {event.endHour}:{event.endMinute.toString().padStart(2, '0')}
            </div>
        </div>
    );
};

export default ScheduleEventRenderItem;