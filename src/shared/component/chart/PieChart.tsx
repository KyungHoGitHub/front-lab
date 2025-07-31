import {ResponsivePie} from "@nivo/pie";

const PieChart = () => {
    const data = [
        {
            id: "sucess",
            label: "success",
            value: 250,
            color: "hsl(100, 70%, 50%)"
        },
        {
            id: "fail",
            label: "fail",
            value: 190,
            color: "hsl(50, 70%, 50%)"
        },
    ]

    return (
        <div style={{height: 400}}>
            <ResponsivePie
                data={data}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                innerRadius={0.5} // 도넛 차트 형태
                padAngle={0.7}
                cornerRadius={3}
                colors={['rgba(51,139,255,0.91)','rgba(241,57,57,0.85)']}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
            />
        </div>
    )
}
export default PieChart;