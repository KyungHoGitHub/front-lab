import Card from "@/shared/component/common/Card";
import React, {useEffect, useState} from "react";

import {ChartBarStacked} from "@/features/lab/components/ChartBarStacked.tsx";
import {ChartPieDonutText} from "@/features/lab/components/ChartPieDonutText.tsx";
import resourceClient from "@/shared/api/resourceClient.ts";


const LogStatistics = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [logData, setLogData] = useState();

    useEffect(() => {

            const fetchLogList = async () => {
                try {
                    setLoading(true)
                    const res = await resourceClient.get("/log");
                    setLogData(res.data);


                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            }

            fetchLogList();


        }, []);
    console.log(logData);
    return (
        <div>
            <LogStatisticsTitleHeader/>
            <DisplayByStatus/>

            <ChartBarStacked data={logData}/>

            <ChartPieDonutText/>
        </div>
    )
}
export default LogStatistics;


const DisplayByStatus = () => {
    return (
        <div className="!grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">요청 건수</h3>
                <p className="text-2xl font-bold text-blue-600">100</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">성공처리</h3>
                <p className="text-2xl font-bold text-green-600">2000</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-red-500">실패처리</h3>
                <p className="text-2xl font-bold text-white-600">2000</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-sm font-medium text-gray-500">평균 진행률</h3>
                <p className="text-2xl font-bold text-orange-600">30%</p>
            </div>

        </div>
    )
}

const LogStatisticsTitleHeader = () => {
    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                로그 통계 대시보드
            </h1>
            <p className="text-gray-600">
                프로젝트의 서비스 요청 처리에 대한 통계 페이지
            </p>
        </div>
    )
}