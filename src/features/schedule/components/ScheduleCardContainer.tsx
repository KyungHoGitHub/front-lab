import GenericCard from "../../../shared/component/card/GenericCard.tsx";
import ScheduleCard from "./ScheduleCard.tsx";
import useScheduleCard from "../hooks/useScheduleCard.ts";
import {FaBriefcase, FaBuilding, FaCalendarAlt, FaHome, FaUser} from "react-icons/fa";
import {IconType} from "react-icons";

const categoryMap: Record<
    string,
    { icon: IconType; color: string; label: string }
> = {
    work: {icon: FaBriefcase, color: "#bbdefb", label: "Work"},
    personal: {icon: FaUser, color: "#c8e6c9", label: "Personal"},
    company: {icon: FaBuilding, color: "rgba(44,66,96,0.62)", label: "Company"},
    event: {icon: FaCalendarAlt, color: "#f8bbd0", label: "Event"},
};

const getCategoryIcon = (category: string): React.ReactNode => {
    const data = categoryMap[category];

    if (!data) return <span>{category}</span>;

    const {icon: IconComponent, color, label} = data;

    return (
        <span>
      <IconComponent style={{marginRight: "4px", color, fontSize: "14px"}}/>
      <span style={{fontSize: "14px"}}>{label}</span>
    </span>
    );
};

const ScheduleCardContainer = () => {
    const {schedule, loading} = useScheduleCard();
    if (loading || !schedule) return <div>Loading...</div>; // 또는 스피너 컴포넌트


    return (
        <div>
            {schedule.map((item, index) => (
                <GenericCard
                    key={index}
                    data={item ?? []}
                    CardComponent={ScheduleCard}
                    leftHeader={getCategoryIcon(item.category)}
                    rightHeader={item.date}
                />

            ))}
            {/*<GenericCard*/}
            {/*    data={schedule ?? []}*/}
            {/*    CardComponent={ScheduleCard}*/}
            {/*    // leftHeader="사용자 목록"*/}
            {/*    // rightHeader="test"*/}
            {/*/>*/}
        </div>
    )
}
export default ScheduleCardContainer;