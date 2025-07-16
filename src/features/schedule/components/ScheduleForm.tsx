import React, {useState} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {ScheduleRequestDto} from "../types/scheduleType.ts";
import GenericForm from "../../../shared/component/form/GenericForm.tsx";
import './ScheduleForm.css';

interface ScheduleFormProps {
    form: UseFormReturn<ScheduleRequestDto>;
    onSubmit: (data: ScheduleRequestDto) => void;
    loading: boolean;
}

interface SelectOptions {
    name: string;
    value: string;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({form, onSubmit, loading}) => {
    const {register, setValue} = form;

    // 스케줄 종류 목록
    const selectCategoryOptions: SelectOptions[] = [
        {name: '회사', value: 'company'},
        {name: '개인', value: 'personal'},
    ]

    return (
        <GenericForm form={form} onSubmit={onSubmit} loading={loading}>
            <div className="form-row">
                <div className="schedule-form-field">
                    <label htmlFor="startDate">시작일</label>
                    <input
                        type="date"
                        id="startDate"
                        {...register('startDate', {required: '시작일을 입력하세요'})}
                    />

                </div>
                <div className="schedule-form-field">
                    <label htmlFor="startTime">시작 시간</label>
                    <input
                        type="time"
                        id="startTime"
                        {...register('startTime', {required: '시작 시간을 입력하세요'})}
                    />

                </div>
                <div className="schedule-form-field">
                    <label htmlFor="endDate">종료일</label>
                    <input
                        type="date"
                        id="endDate"
                        {...register('endDate', {required: '종료일을 입력하세요'})}
                    />

                </div>
                <div className="schedule-form-field">
                    <label htmlFor="endTime">종료 시간</label>
                    <input
                        type="time"
                        id="endTime"
                        {...register('endTime', {required: '종료 시간을 입력하세요'})}
                    />

                </div>
            </div>
            <div className="form-row">
                <div className="schedule-form-field category">
                    <label htmlFor="category">분류</label>
                    <select
                        id="category"
                        {...register('category', {required: '분류를 선택하세요'})}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            선택하세요
                        </option>
                        {selectCategoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                </div>
            </div>
            <div className="schedule-form-field title">
                <label htmlFor="title">제목</label>
                <input
                    id="title"
                    {...register('title', {required: '제목을 입력하세요'})}
                />
            </div>
            <div className="schedule-form-field content">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    {...register('content', {required: '내용을 입력하세요'})}
                />
            </div>
        </GenericForm>
    )
}
export default ScheduleForm;