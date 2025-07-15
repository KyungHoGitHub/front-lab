import React from "react";
import {useForm} from "react-hook-form";
import {ScheduleRequestDto} from "../types/scheduleType.ts";
import ScheduleForm from "./ScheduleForm.tsx";
import useScheduleForm from "../hooks/useScheduleForm.ts";
import './ScheduleCardContainer.css';

interface ScheduleRequestDto {
    category: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    content: string;
    color: string;
}

const ScheduleFormContainer: React.FC = () => {
    const {loading, scheduleSubmit} = useScheduleForm();

    // 스케줄 폼 속성값
    const form = useForm<ScheduleRequestDto>({
        defaultValues: {
            category: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            content: '',
            color: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const onSubmit = async (data: ScheduleRequestDto) => {
        try {
            const serverData ={
                category: data.category,
                startDateTime : `${data.startDate}T${data.startTime || '00:00'}:00`,
                endDateTime: `${data.endDate}T${data.endTime || '00:00'}:00`,
                content: data.content,
            }

            await scheduleSubmit(serverData);
            // form.reset();
        } catch (error) {
            console.error('Failed to create schedule:', error);
        }
    };

    const {handleSubmit, formState: {isSubmitting}} = form;

    return (
        <div className="schedule-form-container">
            <ScheduleForm form={form} onSubmit={onSubmit} loaidng={loading}/>
        </div>
    )

}
export default ScheduleFormContainer;