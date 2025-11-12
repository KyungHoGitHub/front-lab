import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import WeeklyScheduleNavigation from "@/features/weekly-schedule/WeeklyScheduleNavigation.tsx";
import {Category, CategoryColor, WeekDay} from "@/features/weekly-schedule/enum/WeekDay.ts";
import WeekDaysModal from "@/features/weekly-schedule/WeekDaysModal.tsx";
import {Clock} from "lucide-react";

interface SelectedCell {
    dayIndex: number;
    hour: number;
}

// enum Category {
//     company = "COMPANY",
//     personal = "PERSONAL",
//     event = "EVENT"
// }
//
// const CategoryColor:Record<Category, string>={
//     [Category.company] : "bg-green-500",
//     [Category.event] : "bg-pink-500",
//     [Category.personal] : "bg-blue-300"
// }

interface ScheduleEvent {
    id: string;
    title: string;
    description?: string;
    dayIndex: number;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    color?: string;
    category?: Category;
    weekDay?: string;
}

interface FormData {
    title: string;
    description?: string;
    startHour: number;
    startMinute: number;
    endHour: number;
    endMinute: number;
    weekDay?: string;
}

const DAYS = ["MON", "TUE", "WED", "THJ", "FRI", "SAT", "SUN"];
const HOURS = Array.from({length: 12}, (_, i) => i + 8);

const WeekDaysContainer = () => {
    const [weekDate, setWeekDate] = useState<Dayjs>(dayjs().startOf("week"));
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
    const [currentTime, setCurrentTime] = useState(dayjs());
    console.log("시작주차 날짜 확인이요", weekDate.format("YYYY-MM-DD"))
    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        startHour: 9,
        startMinute: 0,   // 추가
        endHour: 10,
        endMinute: 0,
        weekDay: "",
    });

    // Mock 일정 데이터
    const [events, setEvents] = useState<ScheduleEvent[]>([
        {
            id: "1",
            title: "자료조사",
            description: "주간 팀 회의",
            dayIndex: 0, // 월요일
            startHour: 13,
            startMinute: 0o0,
            endHour: 17,
            endMinute: 0o0,
            color: "bg-blue-500",
            category: Category.company,
            weekDay : "2025-11-09"
        },
        {
            id: "2",
            title: "점심 약속",
            description: "고객사 미팅",
            dayIndex: 2, // 수요일
            startHour: 12,
            startMinute: 0o0,
            endHour: 13,
            endMinute: 0o0,
            color: "bg-green-500",
            category: Category.company,
            weekDay : "2025-11-11"
        },
        {
            id: "3",
            title: "프로젝트 발표",
            description: "Q4 프로젝트 최종 발표",
            dayIndex: 4, // 금요일
            startHour: 14,
            startMinute: 0o0,
            endHour: 16,
            endMinute: 0o0,
            color: "bg-purple-500",
            category: Category.company,
            weekDay : "2025-11-13"
        },
        {
            id: "4",
            title: "요가 수업",
            description: "저녁 요가 클래스",
            dayIndex: 1, // 화요일
            startHour: 18,
            startMinute: 0o0,
            endHour: 19,
            endMinute: 0o0,
            color: "bg-pink-500",
            category: Category.event,
            weekDay : "2025-11-10"
        },
        {
            id: "5",
            title: "사이버 보안",
            description: "주간 팀 회의",
            dayIndex: 0, // 월요일
            startHour: 8,
            startMinute: 30,
            endHour: 10,
            endMinute: 0o0,
            color: "bg-blue-500",
            category: Category.company,
            weekDay : "2025-11-09"
        },
        {
            id: "6",
            title: "외부 요청",
            description: "주간 팀 회의",
            dayIndex: 3, // 월요일
            startHour: 10,
            startMinute: 30,
            endHour: 11,
            endMinute: 30,
            color: "bg-blue-500",
            category: Category.personal,
            weekDay : "2025-11-12"
        },
    ]);

    const getDayColor = (dayIndex: number) => {
        switch (dayIndex) {
            case WeekDay.Sat:
                return "text-blue-500";
            case WeekDay.Sun:
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    // 셀 클릭 핸들러
    const handleCellClick = (dayIndex: number, hour: number) => {
        setSelectedCell({dayIndex, hour});
        setFormData({
            title: "",
            description: "",
            startHour: hour,
            startMinute: 0,   // 추가
            endHour: hour + 1,
            endMinute: 0,
            weekDay: "",
        });
        setEditingEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (event: ScheduleEvent, e: React.MouseEvent) => {
        console.log("event 객체 -------->", event)
        e.stopPropagation(); // 셀 클릭 이벤트 전파 방지
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description ?? "",
            startHour: event.startHour,
            startMinute: event.startMinute ?? 0o0,
            endHour: event.endHour,
            endMinute: event.endMinute ?? 0o0,
            weekDay: event.weekDay ?? "",
        });
        setSelectedCell({dayIndex: event.dayIndex, hour: event.startHour});
        setIsModalOpen(true);
    };

    // 일정 저장 핸들러
    const handleSaveEvent = () => {
        if (!formData.title.trim() || !selectedCell) return;


        // 선택된 날짜 계산
        const selectedDate = weekDate.add(selectedCell.dayIndex, "day").format("YYYY-MM-DD");

        if (editingEvent) {
            // 기존 일정 수정
            setEvents(events.map(e =>
                e.id === editingEvent.id
                    ? {
                        ...e,
                        title: formData.title,
                        description: formData.description,
                        startHour: formData.startHour,
                        startMinute: formData.startMinute,  // 추가
                        endHour: formData.endHour,
                        endMinute: formData.endMinute,      // 추가
                        dayIndex: selectedCell.dayIndex,
                        weekDay: selectedDate,
                    }
                    : e
            ));
        } else {
            // 새 일정 추가
            // TODO 등록 API 추가 되면 id 값 할당되는 부분은 제거하기
            const newEvent: ScheduleEvent = {
                id: Date.now().toString(),
                title: formData.title,
                description: formData.description,
                dayIndex: selectedCell.dayIndex,
                startHour: formData.startHour,
                startMinute: formData.startMinute,  // 추가
                endHour: formData.endHour,
                endMinute: formData.endMinute,      // 추가
                weekDay: selectedDate
            };
            setEvents([...events, newEvent]);
        }
        setIsModalOpen(false);
        resetForm();
    };

    // 일정 삭제 핸들러
    const handleDeleteEvent = () => {
        if (editingEvent) {
            setEvents(events.filter(e => e.id !== editingEvent.id));
            setIsModalOpen(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({endMinute: 0, startMinute: 0, weekDay: "", title: "", description: "", startHour: 9, endHour: 10});
        setSelectedCell(null);
        setEditingEvent(null);
    };

    // 해당 셀에 표시할 일정들 렌더링
    const renderEvents = (dayIndex: number, hour: number) => {
        const cellDate = weekDate.add(dayIndex,"day")
        return events
            .filter(e => e.dayIndex === dayIndex && e.startHour === hour && e.weekDay ===  cellDate.format("YYYY-MM-DD"))
            .map(event => {
                const startTotalMinutes = event.startHour * 60 + event.startMinute;
                const endTotalMinutes = event.endHour * 60 + event.endMinute;
                const durationMinutes = endTotalMinutes - startTotalMinutes;
                const height = durationMinutes;
                const topOffset = event.startMinute;
                return (
                    <div
                        key={event.id}
                        className={`absolute inset-x-1 ${CategoryColor[event.category]} text-white rounded p-2 text-xs cursor-pointer hover:opacity-90 transition-opacity z-10 overflow-hidden shadow-md`}
                        style={{
                            height: `${height}px`,
                            top: `${topOffset}px`
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event, e);
                        }}
                    >
                        <div className="font-semibold truncate mb-1">{event.title}</div>
                        <div className="text-[10px] opacity-90 flex items-center gap-1">
                            <Clock size={10}/>
                            {event.startHour}:{event.startMinute.toString().padStart(2, '0')} - {event.endHour}:{event.endMinute.toString().padStart(2, '0')}
                        </div>
                    </div>
                );
            });
    };

    // 현재 시간이 해당 셀 범위 안에 있는지 체크
    const isCurrentTimeInCell = (dayIndex: number, hour: number) => {
        const cellDate = weekDate.add(dayIndex, "day");
        const isToday = cellDate.isSame(currentTime, 'day');
        const currentHour = currentTime.hour();

        return isToday && currentHour === hour;
    };

    // 현재 시간 인디케이터 위치 계산
    const getCurrentTimePosition = (dayIndex: number) => {
        const cellDate = weekDate.add(dayIndex, "day");
        const isToday = cellDate.isSame(currentTime, 'day');

        if (!isToday) return null;

        const currentHour = currentTime.hour();
        const currentMinute = currentTime.minute();

        // 8시부터 시작하므로 offset 계산
        if (currentHour < 8 || currentHour >= 20) return null;

        const hourOffset = currentHour - 8;
        const top = hourOffset * 60 + currentMinute;

        return top;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 60000); // 1분마다 업데이트

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-col h-screen bg-white">
            <WeekDaysModal hours={HOURS}
                           weekDate={weekDate}
                           isModalOpen={isModalOpen}
                           setIsModalOpen={setIsModalOpen}
                           formData={formData}
                           setFormData={setFormData}
                           editingEvent={editingEvent}
                           selectedCell={selectedCell}
                           handleSaveEvent={handleSaveEvent}
                           handleDeleteEvent={handleDeleteEvent}
            />
            {/* 요일 네비게이터 */}
            <WeeklyScheduleNavigation setWeekDate={setWeekDate} weekDate={weekDate}/>


            <div className="grid grid-cols-8 border-b  sticky top-0 z-10">
                {/* 시간 열 빈 공간 */}
                <div className="w-20"></div>

                {/* 요일들 */}
                {Array.from({length: 7}).map((_, i) => {
                    const date = weekDate.add(i, "day");

                    const dayIndex = (date.day() + 6) % 7;

                    return (
                        <div key={i} className="flex flex-col items-center justify-center p-3">
                            <span className={`text-xs font-medium ${getDayColor(dayIndex)}`}>
                                {DAYS[dayIndex]}
                            </span>
                            <span className={`text-lg font-semibold ${getDayColor(dayIndex)}`}>
                                {date.date()}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* 시간대별 그리드 */}
            <div className="flex-1 overflow-auto">
                {HOURS.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 h-[60px]">
                        {/* 시간 레이블 */}
                        <div className="border-r border-b  flex items-start justify-center pt-1 ">
                            <span className="text-xs text-gray-500">{hour}:00</span>
                        </div>

                        {/* 각 요일의 셀 */}
                        {Array.from({length: 7}).map((_, dayIndex) => {
                            const isCurrentCell = isCurrentTimeInCell(dayIndex, hour);
                            const cellDate = weekDate.add(dayIndex,"day")
                            console.log("셀 날짜 데이터 객체 ", cellDate.format("YYYY-MM-DD"))

                            const hasEvent = events.some(
                                e => e.dayIndex === dayIndex && e.startHour === hour && e.weekDay ===cellDate.format(("YYYY-MM-DD"))
                            );

                            return (
                                <div
                                    key={dayIndex}
                                    className={`border-r border-b cursor-pointer transition-colors relative group ${
                                        isCurrentCell
                                            ? 'bg-blue-50/50'
                                            : 'hover:bg-blue-50'
                                    }`} onClick={() => handleCellClick(dayIndex, hour)}
                                >
                                    {/* 호버 시 + 아이콘 표시 - 일정이 없을 때만 */}
                                    {!hasEvent && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <span className="text-gray-400 text-xl">+</span>
                                        </div>
                                    )}
                                    {getCurrentTimePosition(dayIndex) !== null && hour === Math.floor(currentTime.hour()) && (
                                        <div
                                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-red-300 via-red-500 to-red-600 z-20 transition-all duration-500"
                                            style={{top: `${currentTime.minute()}px`}}
                                        >
                                            {/* 포인트 원 */}
                                            <div
                                                className="absolute -left-1 -top-1 w-3 h-3 bg-red-300 rounded-full shadow-lg animate-pulse"></div>
                                        </div>
                                    )}
                                    {renderEvents(dayIndex, hour)}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekDaysContainer;