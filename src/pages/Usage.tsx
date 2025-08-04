import React from "react";
import CustomLineChart from "../shared/component/common/CustomLineChart.tsx";
import Statistic from "../features/usage/components/Statistic.tsx";
import './Usage.css';
import {FcClock, FcConferenceCall, FcExpand, FcLowPriority} from "react-icons/fc";
import Table, {Column} from "../shared/component/common/Table.tsx";
import {useNavigate} from "react-router";
import WeatherWidget from "../features/widget/components/WeatherWidget.tsx";
import BarChart from "../shared/component/chart/BarChart.tsx";

interface MonthlyUsage {
    month: string; // 예: "2023-01"
    usage: number; // 사용량
}

const Usage: React.FC = () => {
    const navigate = useNavigate();

    const data =
        [
            { "date": "2025-07-01", "count": 3 },
            { "date": "2025-07-02", "count": 7 },
            { "date": "2025-07-03", "count": 4 },
            { "date": "2025-07-04", "count": 10 },
            { "date": "2025-07-05", "count": 2 },
            { "date": "2025-07-06", "count": 8 },
            { "date": "2025-07-07", "count": 6 },
            { "date": "2025-07-08", "count": 12 },
            { "date": "2025-07-09", "count": 9 },
            { "date": "2025-07-10", "count": 5 },
            { "date": "2025-07-11", "count": 15 },
            { "date": "2025-07-12", "count": 3 },
            { "date": "2025-07-13", "count": 7 },
            { "date": "2025-07-14", "count": 11 },
            { "date": "2025-07-15", "count": 4 },
            { "date": "2025-07-16", "count": 6 },
            { "date": "2025-07-17", "count": 5 },
            { "date": "2025-07-18", "count": 9 },
            { "date": "2025-07-19", "count": 13 },
            { "date": "2025-07-20", "count": 8 },
            { "date": "2025-07-21", "count": 10 },
            { "date": "2025-07-22", "count": 4 },
            { "date": "2025-07-23", "count": 6 },
            { "date": "2025-07-24", "count": 7 },
            { "date": "2025-07-25", "count": 11 },
            { "date": "2025-07-26", "count": 3 },
            { "date": "2025-07-27", "count": 5 },
            { "date": "2025-07-28", "count": 9 },
            { "date": "2025-07-29", "count": 12 },
            { "date": "2025-07-30", "count": 6 },
            { "date": "2025-07-31", "count": 8 }
        ];
// 월별 사용량 데이터 (예시)
    const monthlyUsageData: MonthlyUsage[] = [
        {month: '2023-01', usage: 120},
        {month: '2023-02', usage: 150},
        {month: '2023-03', usage: 80},
        {month: '2023-04', usage: 200},
        {month: '2023-05', usage: 170},
        {month: '2023-06', usage: 130},
        {month: '2023-07', usage: 220},
        {month: '2023-08', usage: 190},
        {month: '2023-09', usage: 90},
        {month: '2023-10', usage: 250},
        {month: '2023-11', usage: 210},
        {month: '2023-12', usage: 180},
    ];

    const activityData= [
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
        { id: 1, name: '김길동',action: '로그인', initDate: '2023-10-01' ,currentDate:'2025-04-08'},
        { id: 2,name: '홍길동', action: '프로필 업데이트', initDate: '2023-10-02',currentDate:'2025-04-08' },
        { id: 3,name: '서초동', action: '로그아웃', initDate: '2023-10-03',currentDate:'2025-04-08' },
    ];
    // 상세 페이지로 이동하는 핸들러
    const handleCellClick = (record) => {
        navigate(`/activity/${record.id}`); // 예: /activity/1로 이동
        // 또는 간단히 테스트용으로 alert 사용:
        // alert(`Clicked activity: ${record.action} (ID: ${record.id})`);
    };


    const activityColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            // sorter: (a, b) => a.id - b.id, // 숫자 정렬
        },
        {
            title : '이름',
            dataIndex: 'name',
            sorter: (a, b) => a.id - b.id, // 숫자 정렬
            onCellClick: handleCellClick,
        },
        {

            title: '활동',
            dataIndex: 'action',
            sorter: (a, b) => a.action.localeCompare(b.action), // 문자열 정렬
        },
        {
            title: '생성일자',
            dataIndex: 'initDate',
            sorter: (a, b) => a.initDate.localeCompare(b.initDate), // 날짜 문자열 정렬
        },
        {
            title : '최근접속일자',
            dataIndex: 'currentDate',
        }
    ];

    return (
        <>

            <div className="statistic-grid">
                <Statistic title="월별접속현황" value="120" prefix={<FcExpand/>} suffix="건"/>
                <Statistic title="평균접속시간" value="1시간 20" prefix={<FcClock/>} suffix="분"/>
                <Statistic title="다운로드수" value="120" prefix={<FcLowPriority/>} suffix="회"/>
                <Statistic title="총 사용자" value="1200" prefix={<FcConferenceCall/>} suffix="명"/>

            </div>
            {/*<BarChart data={data}/>*/}
            <CustomLineChart
                data={monthlyUsageData}
                width={700}
                height={350}
                lineColor="#10b981"
                xAxisFormatter={(value) => `${parseInt(value.split('-')[1])}월`} // "1월" 형식
                showMonthSelector={true}
            />
            <div className="padding" style={{padding: "10px"}}/>
            <Table columns={activityColumns} dataSource={activityData}/>
        </>
    )
}
export default Usage;