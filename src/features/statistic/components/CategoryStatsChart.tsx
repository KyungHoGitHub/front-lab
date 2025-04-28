import React, { useState } from 'react';
import './CategoryStatsChart.css';
import Card from '../../../shared/component/common/Card.tsx';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';

interface PieData {
    name: string;
    value: number;
}

interface ActiveShapeProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: PieData;
    percent: number;
    value: number;
}

const data: PieData[] = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 200 },
    { name: 'Group D', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderActiveShape = (props: ActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="pie-chart-text">
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
                {payload.name}
            </text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`${value} (${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const CategoryStatsChart: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const onPieEnter = (_: PieData, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="category-stats-chart-container">
            <Card title="영역별통계빈도" noBorder>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                            onClick={undefined}
                        >
                            {data.map((_, index) => (
                                <Cell style={{outline: 'none'}} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default CategoryStatsChart;