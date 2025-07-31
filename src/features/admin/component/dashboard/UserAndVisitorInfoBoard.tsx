import Statistic from "../../../usage/components/Statistic.tsx";
import {FcClock, FcComboChart, FcExpand, FcRating} from "react-icons/fc";
import React, {useEffect, useState} from "react";
import './UserAndVisitorInfoBoard.css';
import {getUserCountList} from "../../api/admin.ts";

const UserAndVisitorInfoBoard:React.FC =() =>{
    const [loading, setLoding] = useState<boolean>(false);
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async ()=>{
           setLoding(true);
            try {
                const res = await getUserCountList();
                    setData(res.data.data);
                    console.log(res.data.data)
            }catch (error){
                console.log(error);
            }finally {
                setLoding(false)
            }
        }
        fetchData();
    }, []);

    if(loading) {return null};
    return(
        <div className="info-board-container">
            <div className="info-board-header">
                <Statistic title="총 가입자 수" value={data?.totalUserCount?data.totalUserCount:0 } prefix={<FcRating />} suffix="명"/>
                <Statistic title="Today 방문자 수" value={data?.todayVisitUserCount?data.todayVisitUserCount:0 } prefix={<FcComboChart />} suffix="명"/>
            </div>
        </div>
    )
}
export default UserAndVisitorInfoBoard;