// src/components/Calendar.tsx
import React, {useEffect, useRef, useState} from 'react';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    addMonths,
    subMonths,
    format,
    isSameDay, setYear, setMonth, parseISO, isValid, isWeekend,
} from 'date-fns';
import './Calendar.css';
import schedule from "../../../pages/Schedule.tsx";
import {Category} from "../../../features/schedule/api/enum/category.ts";

interface Schedule {
    category: string;
    title: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
}

interface CalendarDate {
    date: Date;
    isCurrentMonth: boolean;
    isSelected?: boolean;
    schedules: Schedule[];
}

interface CalendarProps {
    selectedDate?: Date;
    onDateSelect?: (date: Date) => void;
    data: Schedule[];
    onMonthChange?:(year:number, month:number) => void;
}

const Calendar: React.FC<CalendarProps> = ({selectedDate, onDateSelect, data,onMonthChange}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
    const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);
    const [tooltip, setTooltip] = useState<{
        schedule: Schedule | null;
        x: number;
        y: number;
    }>({schedule: null, x: 0, y: 0});
    const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    console.log(data)
    // 연도 목록 생성 (2020~2030)
    const years = Array.from({length: 11}, (_, i) => 2020 + i);
    // 월 목록 생성 (1~12)
    const months = Array.from({length: 12}, (_, i) => i);

    // 카테고리별 색상 매핑
    const categoryColors: Record<Category, string> = {
        [Category.COMPANY]: '#FF6B6B',
        [Category.PERSONAL]: '#4ECDC4',
        [Category.EVENT]: '#874ecd'
    };

    // 캘린더 날짜 생성 로직
    const getDaysInMonth = (year: number, month: number): CalendarDate[] => {
        const firstDayOfMonth = startOfMonth(new Date(year, month));
        const lastDayOfMonth = endOfMonth(new Date(year, month));
        const days: CalendarDate[] = [];

        const firstDayOfWeek = getDay(firstDayOfMonth);
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month, -i);
            days.push({date, isCurrentMonth: false, schedules: []});
        }

        const currentMonthDays = eachDayOfInterval({
            start: firstDayOfMonth,
            end: lastDayOfMonth,
        });

        currentMonthDays.forEach((date) => {
            const daySchedules = data.filter((schedule) => {
                const scheduleDate = parseISO(schedule.startDateTime);
                return isValid(scheduleDate) && isSameDay(scheduleDate, date);
            });
            days.push({
                date,
                isCurrentMonth: true,
                isSelected: selectedDate && isSameDay(date, selectedDate),
                schedules: daySchedules,
            });
        });

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({date, isCurrentMonth: false, schedules: []});
        }

        return days;
    };

    const days = getDaysInMonth(year, month);

    // 이전/다음 달 이동
    const goToPreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
        setTooltip({schedule: null, x: 0, y: 0});
    };

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
        setTooltip({schedule: null, x: 0, y: 0});
    };

    // 연도/월 선택
    const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(setYear(currentDate, newYear));
        setIsYearSelectOpen(false);
        setTooltip({schedule: null, x: 0, y: 0});
    };

    const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        setCurrentDate(setMonth(currentDate, newMonth));
        setIsMonthSelectOpen(false);
        setTooltip({schedule: null, x: 0, y: 0});
    };

    // 날짜 선택
    const handleDateClick = (date: Date) => {
        if (onDateSelect) {
            onDateSelect(date);
        }
        setTooltip({schedule: null, x: 0, y: 0});
    };
// 마커 클릭 시 툴팁 표시
    const handleMarkerClick = (
        schedule: Schedule,
        e: React.MouseEvent<HTMLDivElement>,
        index: number
    ) => {
        e.stopPropagation(); // 날짜 클릭 이벤트와 충돌 방지
        const marker = markerRefs.current[index];
        if (marker) {
            const rect = marker.getBoundingClientRect();
            setTooltip({
                schedule,
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height + window.scrollY + 5,
            });
        }
    };

    // 툴팁 닫기
    const closeTooltip = () => {
        setTooltip({schedule: null, x: 0, y: 0});
    };

    useEffect(() => {
        if(onMonthChange){
            onMonthChange(currentDate.getFullYear(), currentDate.getMonth() + 1);
        }
    }, [currentDate,onMonthChange]);
    return (
        <div className="calendar-wrapper">
            <div className="header">
                <button onClick={goToPreviousMonth}>{"<"}</button>
                <div className="header-title">
                    {isYearSelectOpen ? (
                        <select
                            value={year}
                            onChange={handleYearSelect}
                            className="year-select"
                            autoFocus
                            onBlur={() => setIsYearSelectOpen(false)}
                        >
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}년
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span onClick={() => setIsYearSelectOpen(true)} className="header-text">
              {format(currentDate, 'yyyy년')}
            </span>
                    )}
                    {isMonthSelectOpen ? (
                        <select
                            value={month}
                            onChange={handleMonthSelect}
                            className="month-select"
                            autoFocus
                            onBlur={() => setIsMonthSelectOpen(false)}
                        >
                            {months.map((m) => (
                                <option key={m} value={m}>
                                    {format(new Date(year, m), 'M월')}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span onClick={() => setIsMonthSelectOpen(true)} className="header-text">
              {format(currentDate, 'M월')}
            </span>
                    )}
                </div>
                <button onClick={goToNextMonth}>{">"}</button>
            </div>
            <div className="calendar-grid">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div key={day} className="day-header">
                        {day}
                    </div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${
                            day.isSelected ? 'selected' : ''
                        }`}
                        onClick={() => handleDateClick(day.date)}
                    >
                        <span className={`day-number ${isWeekend(day.date) ? 'weekend' : ''}`}>
                          {format(day.date, 'd')}
                        </span>
                        <div className="schedule-markers">
                            {day.schedules.map((schedule, idx) => (
                                <div
                                    key={idx}
                                    ref={(el) => (markerRefs.current[index * 100 + idx] = el)}
                                    className="schedule-marker"
                                    style={{backgroundColor: categoryColors[schedule.category] || '#ccc'}}
                                    onClick={(e) => handleMarkerClick(schedule, e, index * 100 + idx)}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {tooltip.schedule && (
                <div
                    className="tooltips"
                    style={{top: `${tooltip.y}px`, left: `${tooltip.x}px`}}
                    onClick={closeTooltip}
                >
                    <div className="tooltip-title">{tooltip.schedule.title}</div>
                    <div className="tooltip-time">
                        일시 :
                        {format(parseISO(tooltip.schedule.startDateTime), 'HH:mm')} -{' '}
                        {format(parseISO(tooltip.schedule.endDateTime), 'HH:mm')}
                    </div>
                    <div className="tooltip-category">{tooltip.schedule.category}</div>
                </div>
            )}
        </div>
    );
};

export default Calendar;