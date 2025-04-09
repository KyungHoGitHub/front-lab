import React from "react";
import CustomLineChart from "../shared/component/common/CustomLineChart.tsx";
import Statistic from "../features/usage/components/Statistic.tsx";
import './Usage.css';
import {FcClock, FcConferenceCall, FcExpand, FcLowPriority} from "react-icons/fc";
import Table, {Column} from "../shared/component/common/Table.tsx";

interface MonthlyUsage {
    month: string; // 예: "2023-01"
    usage: number; // 사용량
}

const Usage: React.FC = () => {
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