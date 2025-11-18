import dayjs, {Dayjs} from "dayjs";
import {useEffect, useState} from "react";
import WeeklyScheduleNavigation from "@/features/weekly-schedule/WeeklyScheduleNavigation.tsx";
import {Category} from "@/features/weekly-schedule/enum/WeekDay.ts";
import WeekDaysModal from "@/features/weekly-schedule/WeekDaysModal.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createWeekSchedule, getWeekSchedule} from "@/features/weekly-schedule/api/weeklySchedule.ts";
import {
    combineDateTime,
    getCurrentTimePosition,
    getDayColor,
    isCurrentTimeInCell
} from "@/features/weekly-schedule/utills/weekScheduleUtils.ts";
import ScheduleEventRenderItem from "@/features/weekly-schedule/components/ScheduleEventRenderItem.tsx";
import {FormData, ScheduleEvent, SelectedCell} from "@/features/weekly-schedule/types/week-schedule.ts";
import {useWeekSchedule} from "@/features/weekly-schedule/hooks/useWeekSchedule.ts";
import {AiOutlineCalendar} from "react-icons/ai";
import {DAYS, FIRST_HOUR_LABEL_INDEX, HOURS} from "@/features/weekly-schedule/constants/week-schedule.ts";

const WeekDaysContainer = () => {
    const queryClient = useQueryClient();
    const [weekDate, setWeekDate] = useState<Dayjs>(dayjs().startOf("week"));
    const [currentTime, setCurrentTime] = useState(dayjs());
    const [events, setEvents] = useState<ScheduleEvent[]>([]);
    const [testEvent, setTestEvent] = useState();
    const {
        handleCellClick,
        handleEventClick,
        setFormData,
        setIsModalOpen,
        resetForm,
        createOrUpdate,
        deleteEvent,
        selectedCell,
        formData,
        editingEvent,
        isModalOpen
    } = useWeekSchedule(weekDate);

    const {data, isLoading} = useQuery({
        queryKey: ['weekSchedule', weekDate],
        queryFn: async () => {
            // if (!weekDate) return []; // weekDate 없으면 빈 배열 반환

            const res = await getWeekSchedule(weekDate.format("YYYY-MM-DD"));

            return res.data;
        },
        onSuccess: (data) => {

            const events = data.map(transformServerData);
            setTestEvent(events);
        },
        enabled: !!weekDate,
        cacheTime: 0,          // 캐시를 오래 보관하지 않음
    });

    const transformServerData = (data: any) => {
        const start = dayjs(data.startDateTime);
        const end = dayjs(data.endDateTime);
        return {
            id: data.id.toString(),
            title: data.title,
            description: data.description,
            dayIndex: data.dayIndex,
            startHour: start.hour(),
            startMinute: start.minute(),
            endHour: end.hour(),
            endMinute: end.minute(),
            category: Category.company,
            weekDay: start.format("YYYY-MM-DD"),
        };
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
                category: formData.category
            };

            // 낙관적 업데이트 (UI 먼저 업데이트)
            setEvents(events.map(e => e.id === editingEvent.id ? updatedEvent : e));
            createOrUpdate(updatedEvent);
        } else {
            // 새 일정 추가
            // TODO 등록 API 추가 되면 id 값 할당되는 부분은 제거하기
            const newEvent: ScheduleEvent = {
                title: formData.title,
                description: formData.description,
                dayIndex: selectedCell.dayIndex,
                startHour: formData.startHour,
                startMinute: formData.startMinute,  // 추가
                startDateTime: combineDateTime(selectedDate, formData.startHour, formData.startMinute),
                endHour: formData.endHour,
                endMinute: formData.endMinute,      // 추가
                endDateTime: combineDateTime(selectedDate, formData.endHour, formData.endMinute),
                weekDay: selectedDate,
                category: formData.category
            };

            setEvents([...events, newEvent]);
            createOrUpdate(newEvent);
        }

        setIsModalOpen(false);
        resetForm();
    };

    // 일정 삭제 핸들러
    const handleDeleteEvent = () => {
        if (editingEvent) {

            const confirmDelete = window.confirm("해당 셀 위치의 일정을 삭제하시겠습니까?");
            if (!confirmDelete) return; // 사용자가 취소하면 종료

            setEvents(events.filter(e => e.id !== editingEvent.id));
            deleteEvent(editingEvent.id);
            setIsModalOpen(false);
            resetForm();
        }
    };

    // 해당 셀에 표시할 일정들 렌더링
    const renderEvents = (dayIndex: number, hour: number) => {
        const cellDate = weekDate.add(dayIndex, "day")
        return events
            .filter(e => e.dayIndex === dayIndex && e.startHour === hour && e.weekDay === cellDate.format("YYYY-MM-DD"))
            .map(event => (
                <ScheduleEventRenderItem
                    key={event.id}
                    event={event}
                    onClick={handleEventClick}
                />
            ));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs());
        }, 60000); // 1분마다 업데이트

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (data) {
            const transformedEvents = data.map(transformServerData);
            setEvents(transformedEvents); // Mock 데이터 대신 서버 데이터 사용
        }
    }, [data]);

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
                {HOURS.map((hour, index) => (
                    <div key={hour} className="grid grid-cols-8 h-[60px]">
                        {/* 시간 레이블 */}
                        <div
                            className={`border-r border- flex items-start justify-center ${index === FIRST_HOUR_LABEL_INDEX ? "pt-1" : "-mt-2"}`}>
                            <span className="text-xs text-gray-500">{hour}:00</span>
                        </div>

                        {/* 각 요일의 셀 */}
                        {Array.from({length: 7}).map((_, dayIndex) => {
                            const isCurrentCell = isCurrentTimeInCell(weekDate, dayIndex, hour, currentTime);
                            // weekDate -> 시작일  / dayIndex ( 0 :일요일, 1 : 월요일 ... ) 값 더해서 일자 반환
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
                                            : 'hover:bg-blue-100'
                                    }`} onClick={() => handleCellClick(dayIndex, hour)}
                                >
                                    {/* 호버 시 + 아이콘 표시 - 일정이 없을 때만 */}
                                    {!hasEvent && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                            <div
                                                className="absolute -bottom-2 -left-2 text-xl animate-ping delay-100">✨
                                            </div>
                                            <span className="text-gray-400 text-xl"><AiOutlineCalendar/></span>
                                            <div className="absolute -top-2 -right-2 text-xl animate-ping">✨</div>
                                        </div>
                                    )}
                                    {/* 현재 ( 오늘 날짜, 셀 60 을 해당하는 분 높이 만 조건부 렌더링 )*/}
                                    {getCurrentTimePosition(weekDate, dayIndex, currentTime) !== null && hour === Math.floor(currentTime.hour()) && (
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