import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import WeeklyScheduleNavigation from "@/features/weekly-schedule/WeeklyScheduleNavigation.tsx";
import {Category, CategoryColor, WeekDay} from "@/features/weekly-schedule/enum/WeekDay.ts";
import WeekDaysModal from "@/features/weekly-schedule/WeekDaysModal.tsx";
import {Clock} from "lucide-react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createWeekSchedule, getWeekSchedule} from "@/features/weekly-schedule/api/weeklySchedule.ts";

interface SelectedCell {
    dayIndex: number;
    hour: number;
}

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

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const HOURS = Array.from({length: 12}, (_, i) => i + 8);

const WeekDaysContainer = () => {
    const queryClient = useQueryClient();
    const [weekDate, setWeekDate] = useState<Dayjs>(dayjs().startOf("week"));
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [events, setEvents] = useState<ScheduleEvent[]>([]);

    const [testEvent, setTestEvent] = useState();


    const [formData, setFormData] = useState<FormData>({
        title: "",
        description: "",
        startHour: 9,
        startMinute: 0,   // 추가
        endHour: 10,
        endMinute: 0,
        weekDay: "",
    });


    const {data,isLoading} = useQuery({
        queryKey: ['weekSchedule', weekDate],
        queryFn: async () => {
            // if (!weekDate) return []; // weekDate 없으면 빈 배열 반환
            console.log("queryFn 호출됨");
            const res = await getWeekSchedule(weekDate.format("YYYY-MM-DD"));
            console.log("server data", res);
            return res.data;
        },
        onSuccess: (data) => {
            console.log("onSuccess 실행됨:", data);
            const events = data.map(transformServerData);
            setTestEvent(events);
        },
        enabled: !!weekDate,
        cacheTime: 0,          // 캐시를 오래 보관하지 않음
    });

    const createMutation = useMutation({
        mutationFn: createWeekSchedule,
        onMutate: (data) => {
            console.log("⏳ Mutation 시작:", data);
        },
        onSuccess: (data) => {
            console.log("✅ 일정 저장 성공:", data);
            // Query 무효화하여 데이터 다시 가져오기
            queryClient.invalidateQueries({ queryKey: ['weekSchedule', weekDate] })
            setIsModalOpen(false);
            resetForm();
        },
        onError: (error) => {
            console.error("❌ 일정 저장 실패:", error);
            alert("일정 저장에 실패했습니다.");
        },
        onSettled: () => {
            console.log("🏁 Mutation 완료 (성공/실패 무관)");
        }
    });

    const transformServerData = (data:any) => {
       const start = dayjs(data.startDateTime);
        const end = dayjs(data.endDateTime);
        return {
            id : data.id.toString(),
            title : data.title,
            description : data.description,
            dayIndex : data.dayIndex,
            startHour: start.hour(),
            startMinute: start.minute(),
            endHour: end.hour(),
            endMinute: end.minute(),
            category: Category.company,
            weekDay: start.format("YYYY-MM-DD"),
        };
    };

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
            const updatedEvent = {
                ...editingEvent,
                title: formData.title,
                description: formData.description,
                startHour: formData.startHour,
                startMinute: formData.startMinute,
                endHour: formData.endHour,
                endMinute: formData.endMinute,
                dayIndex: selectedCell.dayIndex,
                weekDay: selectedDate,
            };

            // 낙관적 업데이트 (UI 먼저 업데이트)
            setEvents(events.map(e => e.id === editingEvent.id ? updatedEvent : e));
            createMutation.mutate(updatedEvent);
        } else {
            // 새 일정 추가
            // TODO 등록 API 추가 되면 id 값 할당되는 부분은 제거하기
            const newEvent: ScheduleEvent = {
                title: formData.title,
                description: formData.description,
                dayIndex: selectedCell.dayIndex,
                startHour: formData.startHour,
                startMinute: formData.startMinute,  // 추가
                startDateTime : combineDateTime(selectedDate, formData.startHour, formData.startMinute),
                endHour: formData.endHour,
                endMinute: formData.endMinute,      // 추가
                endDateTime :combineDateTime(selectedDate, formData.endHour, formData.endMinute),
                weekDay: selectedDate
            };

            setEvents([...events, newEvent]);
            createMutation.mutate(newEvent);
        }

        setIsModalOpen(false);
        resetForm();
    };

    const combineDateTime = (day:string, hour:number, minute:number):string => {
        const [year, month, dayOfMonth] = day.split("-").map(Number);

        const pad = (n: number) => n.toString().padStart(2, "0");

        return `${year}-${pad(month)}-${pad(dayOfMonth)}T${pad(hour)}:${pad(minute)}:00`;
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
        const cellDate = weekDate.add(dayIndex, "day")
        return events
            .filter(e => e.dayIndex === dayIndex && e.startHour === hour && e.weekDay === cellDate.format("YYYY-MM-DD"))
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

    useEffect(() => {
        if (data) {
            console.log("데이터 받음:", data);
            const transformedEvents = data.map(transformServerData);
            setEvents(transformedEvents); // Mock 데이터 대신 서버 데이터 사용
        }
    }, [data]);
    console.log("이게>???",events)
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
                            const cellDate = weekDate.add(dayIndex, "day")

                            const hasEvent = events.some(
                                e => e.dayIndex === dayIndex && e.startHour === hour && e.weekDay === cellDate.format(("YYYY-MM-DD"))
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