// src/components/Calendar.tsx
import React, { useState } from 'react';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    getDay,
    addMonths,
    subMonths,
    format,
    isSameDay, setYear, setMonth,
} from 'date-fns';
import './Calendar.css';

interface CalendarDate {
    date: Date;
    isCurrentMonth: boolean;
    isSelected?: boolean;
}

interface CalendarProps {
    selectedDate?: Date;
    onDateSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
    const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 연도 목록 생성 (2020~2030)
    const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
    // 월 목록 생성 (1~12)
    const months = Array.from({ length: 12 }, (_, i) => i);

    // 캘린더 날짜 생성 로직
    const getDaysInMonth = (year: number, month: number): CalendarDate[] => {
        const firstDayOfMonth = startOfMonth(new Date(year, month));
        const lastDayOfMonth = endOfMonth(new Date(year, month));
        const days: CalendarDate[] = [];

        const firstDayOfWeek = getDay(firstDayOfMonth);
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month, -i);
            days.push({ date, isCurrentMonth: false });
        }

        const currentMonthDays = eachDayOfInterval({
            start: firstDayOfMonth,
            end: lastDayOfMonth,
        });
        currentMonthDays.forEach((date) => {
            days.push({
                date,
                isCurrentMonth: true,
                isSelected: selectedDate && isSameDay(date, selectedDate),
            });
        });

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({ date, isCurrentMonth: false });
        }

        return days;
    };

    const days = getDaysInMonth(year, month);

    // 이전/다음 달 이동
    const goToPreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    // 연도/월 선택
    const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        setCurrentDate(setYear(currentDate, newYear));
        setIsYearSelectOpen(false);
    };

    const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        setCurrentDate(setMonth(currentDate, newMonth));
        setIsMonthSelectOpen(false);
    };

    // 날짜 선택
    const handleDateClick = (date: Date) => {
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

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
            <div className="grid">
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
                        {format(day.date, 'd')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;