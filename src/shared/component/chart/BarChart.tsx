import {ResponsiveBar} from "@nivo/bar";
import './BarChart.css';

// 데이터 타입 정의
interface VisitStatsDto {
    date: string;
    month?: string;
    count: number;
}

interface BarChartProps {
    data: VisitStatsDto[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    return (
        <div className="chart-container">
            <ResponsiveBar
                data={data}
                keys={['count']} // 바 차트의 값으로 사용할 키
                indexBy="month" // X축에 사용할 키
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.1} // 바 간 간격
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'greens' }} // 색상 스킴
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '일자',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    format: (value: string) => {
                        // "2025-07-01" -> "1일"
                        const day = value.split('-')[2];
                        return `${parseInt(day)}`;
                    },
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '방문자수',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
};

export default BarChart;