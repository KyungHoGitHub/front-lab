import {ResponsiveLine} from "@nivo/line";
import React from "react";

const LineChart:React.FC = ({data}) => {

    const transformed = [
        {
            id: '방문자',
            data: data.map(item => ({
                x: `${item.month}월`,
                y: item.totalVisitors,
            })),
        }
    ];

    console.log('ddddd',transformed)
   const  dataa= [


                {
                    id: '방문자',
                    data: [
                        { x: '1월', y: 1200 },
                        { x: '2월', y: 1800 },
                        { x: '3월', y: 1500 },
                        { x: '4월', y: 2000 },
                        { x: '5월', y: 1700 },
                        { x: '6월', y: 2200 },
                        { x: '7월', y: 2500 },
                        { x: '8월', y: 2300 },
                        { x: '9월', y: 1900 },
                        { x: '10월', y: 2100 },
                        { x: '11월', y: 1600 },
                        { x: '12월', y: 1800 },
                    ],
                },


    ]


    return (
        <div style={{height: 400}}>
            <ResponsiveLine
                data={transformed}
                margin={{top: 50, right: 110, bottom: 50, left: 60}}
                xScale={{type: 'point'}}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',

                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    orient: 'left',
                    legend: '접속 수',
                    legendOffset: -50,
                    legendPosition: 'middle',
                }}
                colors={['rgba(51,139,255,0.91)']}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'seriesColor'}}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                    },
                ]}
            />
        </div>
    )
}
export default LineChart;