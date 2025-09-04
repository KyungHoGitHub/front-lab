import React, {useState} from "react";
import {useForm, UseFormReturn} from "react-hook-form";
import {ScheduleRequestDto} from "../types/scheduleType.ts";
import GenericForm from "../../../shared/component/form/GenericForm.tsx";
import './ScheduleForm.css';
import {DateTimePicker} from "@/shared/component/datepicker/DateTimePicker.tsx";
import {TypographyH3} from "@/components/ui/typography/TypographyH3.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {LuHighlighter} from "react-icons/lu";
import {Textarea} from "@/components/ui/textarea.tsx";
import {FcRight} from "react-icons/fc";

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
        {name: '일정', value: 'event'},
    ]

    const selectStatusOptions = [
        {
            name: "예정", value: 'scheduled',
        },
        {
            name: "진행", value: 'in_progress',
        },
        {
            name: "완료", value: 'completed',
        }
    ]

    return (
        <GenericForm form={form} onSubmit={onSubmit} loading={loading}>
            <Form {...form}>
                <div className="space-y-200">
                    <FormField
                        control={form.control}
                        name="title"
                        rules={{required: '제목을 입력하세요'}}
                        render={({field}) => (
                            <FormItem className=" w-[300px] flex justify-between">
                                <FormLabel>제목</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-[180px]"
                                        placeholder="제목를 입력해주세요" {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                {/*<FormMessage/>*/}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="form-row flex justify-between">
                    <FormField
                        control={form.control}
                        name="category"
                        rules={{required: '분류를 선택하세요'}}
                        render={({field}) => (
                            <FormItem className="schedule-form-field category w-[300px] flex justify-between ">
                                <FormLabel>분류</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px] "
                                        >
                                            <SelectValue placeholder="분류 선택"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectCategoryOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {/*<FormMessage/>*/}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="form-row flex justify-between">
                    <FormField
                        control={form.control}
                        name="status"
                        rules={{required: '상태를 선택하세요'}}
                        render={({field}) => (
                            <FormItem className="schedule-form-field category w-[300px] flex justify-between ">
                                <FormLabel>상태</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[180px] "
                                        >
                                            <SelectValue placeholder="상태 선택"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {selectStatusOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                {/*<FormMessage/>*/}
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row max-w-[425px]">
                    <FormLabel className="w-24 text-right pr-30 whitespace-nowrap">일정</FormLabel>
                    <div className="flex flex-row gap-4 flex-1 items-center">
                        <FormField
                            control={form.control}
                            name="startDateTime"
                            rules={{required: "시작일시를 입력하세요"}}
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-2 flex-1">
                                    <FormControl>
                                        <DateTimePicker value={field.value} onChange={field.onChange}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FcRight/>
                        <FormField
                            control={form.control}
                            name="endDateTime"
                            render={({field}) => (
                                <FormItem className="flex flex-col space-y-2 flex-1">
                                    <FormControl>
                                        <DateTimePicker value={field.value} onChange={field.onChange}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-row max-w-[425px]">
                    <FormLabel className="w-24 text-right pr-30 whitespace-nowrap">설명</FormLabel>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>

                                <FormControl>
                                    <Textarea
                                        className="w-[620px] h-[200px]"
                                        placeholder="내용을 입력하세요"
                                        {...field}
                                    />
                                </FormControl>
                                {/*<FormMessage className="text-xs text-red-500" />*/}
                            </FormItem>
                        )}
                    />
                </div>
            </Form>

        </GenericForm>
    )
}
export default ScheduleForm;