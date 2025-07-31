import './DashBoard.css';
import UserAndVisitorInfoBoard from "../component/dashboard/UserAndVisitorInfoBoard.tsx";
import LineChart from "../../../shared/component/chart/LineChart.tsx";
import Divider from "../../../shared/component/lines/Divider.tsx";
import DatePicker from "react-datepicker";
import React, {useEffect, useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePicker from "../../../shared/component/calendar/CustomDatePicker.tsx";
import PieChart from "../../../shared/component/chart/PieChart.tsx";
import Card from "../../../shared/component/common/Card.tsx";
import BarChart from "../../../shared/component/chart/BarChart.tsx";
import {getUserVisitList} from "../api/admin.ts";

const DashBoard = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const monthlyApiCallData = [
        {month: "1", count: 1200},
        {month: "2", count: 1450},
        {month: "3", count: 1720},
        {month: "4", count: 980},
        {month: "5", count: 2100},
        {month: "6", count: 1870},
        {month: "7", count: 2000},
        {month: "8", count: 2340},
        {month: "9", count: 1980},
        {month: "10", count: 2210},
        {month: "11", count: 1650},
        {month: "12", count: 1920}
    ];

    // useEffect(() => {
    //     const fetchData = async () => {
    //        setLoading(true);
    //         try {
    //             const result = await getUserVisitList();
    //                 setData(result.data.data);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false;)
    //         }
    //
    //     }
    // }, []);
    return (
        <div className="dashboard-container">
            <div className="dashboard-first-layer">
                <UserAndVisitorInfoBoard/>
                <LineChart/>
                <Divider/>
            </div>
            <div className="dashboard-second-layer">
                <CustomDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                />
                <div className="second-layer-group">
                    <PieChart/>
                    <Card
                        title={"test"}>
                        <p>test</p>
                    </Card>
                </div>
                <BarChart data={monthlyApiCallData}/>
            </div>
        </div>
    )
}
export default DashBoard;