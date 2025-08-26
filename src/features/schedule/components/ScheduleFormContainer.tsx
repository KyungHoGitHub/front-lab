import React from "react";
import {useForm} from "react-hook-form";
import {ScheduleRequestDto} from "../types/scheduleType.ts";
import ScheduleForm from "./ScheduleForm.tsx";
import useScheduleForm from "../hooks/useScheduleForm.ts";
import './ScheduleCardContainer.css';
import {DateTimePicker} from "@/shared/component/datepicker/DateTimePicker.tsx";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
interface ScheduleRequestDto {
    category: string;
    startDateTime: Date;
    endDateTime: Date;
    title: string;
    content: string;
    color: string;
}

interface Schedules {
    idx: number;
    category: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
}

interface ScheduleFormContainerProps {
    onDataUpdate: (newData: Schedules) => void;
}

const ScheduleFormContainer = ({onDataUpdate}: ScheduleFormContainerProps) => {
    const {loading, submitScheduleForm} = useScheduleForm();
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // 스케줄 폼 속성값
    const form = useForm<ScheduleRequestDto>({
        defaultValues: {
            category: '',
            startDateTime: undefined,
            endDateTime: undefined,
            title: '',
            content: '',
            color: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const handleSubmitSchedule = async (data: ScheduleRequestDto) => {
        console.log("폼 데이터", data);

        try {
            const serverData = {
                category: data.category,
                startDateTime: dayjs(data.startDateTime).tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss"),
                endDateTime: dayjs(data.endDateTime).tz("Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss"),
                title: data.title,
                content: data.content,
            }

            console.log("전송 데이터",  serverData);
            const res = await submitScheduleForm(serverData);

            if (res) {
                onDataUpdate(res);
            }

            // form.reset();
        } catch (error) {
            console.error('Failed to create schedule:', error);
        }
    };

    const {handleSubmit, formState: {isSubmitting}} = form;

    return (
        <div className="schedule-form-container">
            <ScheduleForm form={form} onSubmit={handleSubmitSchedule} loaidng={loading}/>
        </div>
    )

}
export default ScheduleFormContainer;