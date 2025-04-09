import React, {useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomLineChart.css';

interface MonthlyUsage {
    month: string; // 예: "2023-01"
    usage: number;
}

interface CustomLineChartProps {
    data: MonthlyUsage[];
    width?: number;
    height?: number;
    lineColor?: string;
    xAxisFormatter?: (value: string) => string;
    showMonthSelector?: boolean;
}

// 커스텀 툴팁 컴포넌트
const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload; // 데이터 객체 가져오기
        return (
            <div className="custom-tooltip">
                <p>{`월: ${label}`}</p>
                <p>{`사용량: ${data.usage}`}</p>
            </div>
        );
    }
    return null;
};

const CustomLineChart: React.FC<CustomLineChartProps> = ({
                                                             data,
                                                             width = 600,
                                                             height = 400,
                                                             lineColor = '#10b981',
                                                             xAxisFormatter = (value) => value,
                                                             showMonthSelector = false,
                                                         }) => {
    const [selectedMonth, setSelectedMonth] = useState<Date>(() => new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [chartData, setChartData] = useState<MonthlyUsage[]>(data);

    // 목데이터 생성 함수 (API 시뮬레이션)
    const fetchMockData = (date: Date): MonthlyUsage[] => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const mockData: MonthlyUsage[] = [
            {month: `${year}-${month}`, usage: Math.floor(Math.random() * 200) + 50},
        ];
        return mockData; // 단일 월 데이터 반환 (테스트용)
    };

    // 월 이동 핸들러
    const handlePrevMonth = () => {
        setSelectedMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() - 1);
            const newData = fetchMockData(newDate);
            setChartData(newData);
            return newDate;
        });
        setShowDatePicker(false);
    };

    const handleNextMonth = () => {
        setSelectedMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + 1);
            const newData = fetchMockData(newDate);
            setChartData(newData);
            return newDate;
        });
        setShowDatePicker(false);
    };

    // 데이터피커로 월 선택 시
    const handleDateChange = (date: Date) => {
        setSelectedMonth(date);
        const newData = fetchMockData(date);
        setChartData(newData);
        setShowDatePicker(false);
    };

    // 월 포맷팅
    const formatMonth = (date: Date) => {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    };

    return (
        <div className="custom-line-chart-container">
            <div className="custom-line-chart-title">접속현황</div>
            {showMonthSelector && (
                <div className="month-selector">
                    <button onClick={handlePrevMonth} className="month-button">
                        &lt;
                    </button>
                    <div
                        className="month-display"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        {formatMonth(selectedMonth)}
                    </div>
                    <button onClick={handleNextMonth} className="month-button">
                        &gt;
                    </button>
                    {showDatePicker && (
                        <DatePicker
                            selected={selectedMonth}
                            onChange={handleDateChange}
                            showMonthYearPicker
                            dateFormat="yyyy-MM"
                            inline
                            className="custom-datepicker"
                        />
                    )}
                </div>
            )}
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    width={width}
                    height={height}
                    data={chartData}
                    margin={{top: 20, right: 30, left: 20, bottom: 10}}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                    <XAxis
                        dataKey="month"
                        tickFormatter={xAxisFormatter}
                        stroke="#6b7280"
                        fontSize={12}
                        fontFamily="'nanumche', sans-serif"
                    />
                    <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        fontFamily="'nanumche', sans-serif"
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        type="monotone"
                        dataKey="usage"
                        stroke={lineColor}
                        strokeWidth={2}
                        dot={{r: 4, stroke: lineColor, fill: '#fff'}}
                        activeDot={{r: 6, stroke: lineColor, fill: lineColor}}
                        animationDuration={500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;