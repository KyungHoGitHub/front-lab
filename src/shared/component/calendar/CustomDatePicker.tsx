import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import './CustomDatePicker.css';
import DatePicker from "react-datepicker";

type Props = {
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
};

const CustomDateInput = React.forwardRef<HTMLDivElement, { value?: string; onClick?: () => void }>(
    ({ value, onClick }, ref) => {
        return (
            <div className="custom-date-input" onClick={onClick} ref={ref as any}>
                <FaCalendarAlt className="calendar-icon" />
                <span className="date-value">{value || '날짜 선택'}</span>
            </div>
        );
    }
);

const CustomDatePicker: React.FC<Props> = ({ startDate, setStartDate }) => {
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDateInput />}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜를 선택하세요"
        />
    );
};

export default CustomDatePicker;
