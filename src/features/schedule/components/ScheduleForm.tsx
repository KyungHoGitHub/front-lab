import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {createSchedule} from "../api/schedule.ts";
import {ScheduleRequestDto} from "../types/scheduleType.ts";


interface SelectOptions {
    name: string;
    value: string;
}
const ScheduleForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [backgroundColor, setBackgroundColor] = useState("");
    const [shoeMenu, setShowMenu] = useState(true);
    const {register, handleSubmit} = useForm<ScheduleRequestDto>({
        defaultValues: {
            category: "",
            startDate: "",
            startTime: "",
            endDate:"",
            endTime:"",
            content:"",
            color:"",
        },
        mode: 'onSubmit',
        reValidateMode: "onChange",
    })
    const colorOptions = [
        {name: '회색', value: '#f5f5f5'},
        {name: '노랑', value: '#fff9c4'},
        {name: '초록', value: '#c8e6c9'},
        {name: '파랑', value: '#bbdefb'},
        {name: '분홍', value: '#f8bbd0'},
    ];

    const selectOptions: SelectOptions[] = [
        {name: '회사', value: 'company'},
        {name: '개인', value: 'personal'},
    ]

    const handleColorChange = (color: string) => {
        setBackgroundColor(color);
        setShowMenu(false);
    };


    const onSubmit = async (data: ScheduleRequestDto) => {
        setLoading(true);
        try {
            // TODO ui 작업 완료후 적용예정
            // const res = createSchedule(data);
            // console.log(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="schedule-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="schedule-div-1">
                    <label htmlFor="category">분류</label>
                    <select>
                        {selectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <button className="">
                        색상 변경
                        <div className="color-palette">
                            {colorOptions.map((color) => (
                                <span
                                    key={color.value}
                                    className="color-swatch"
                                    style={{backgroundColor: color.value}}
                                    title={color.name}
                                    onClick={() => handleColorChange(color.value)}
                                />
                            ))}
                        </div>
                    </button>
                </div>
            </form>
        </div>
    )
}
export default ScheduleForm;