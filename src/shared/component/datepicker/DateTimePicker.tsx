"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
    title?: string;
    value?: Date; // react-hook-form에서 전달된 값
    onChange?: (date: Date) => void; // react-hook-form으로 값 전달
}

export function DateTimePicker({ title, value, onChange }: DateTimePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);
    const [selectedTime, setSelectedTime] = React.useState<string>(
        value ? value.toTimeString().slice(0, 8) : "10:30:00"
    );

    // 날짜와 시간을 결합해 onChange 호출
    const handleDateTimeChange = (date: Date | undefined, time: string) => {
        if (date) {
            const [hours, minutes, seconds] = time.split(":");
            const newDate = new Date(date);
            newDate.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds || "0"));
            onChange?.(newDate);
        }
    };

    // 날짜 변경 핸들러
    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
        setOpen(false);
        handleDateTimeChange(date, selectedTime);
    };

    // 시간 변경 핸들러
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setSelectedTime(time);
        handleDateTimeChange(selectedDate, time);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 엔터 키로 폼 제출 방지
        }
    };

    return (
        <div>
            <Label>{title}</Label>
            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-3">
                    {/*<Label htmlFor="date-picker" className="px-1">*/}
                    {/*    날짜*/}
                    {/*</Label>*/}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger>
                            <Button
                                type="button"
                                variant="outline"
                                id="date-picker"
                                className="w-32 justify-between font-normal"
                            >
                                {selectedDate ? selectedDate.toLocaleDateString() : "일자선택"}
                                <ChevronDownIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                captionLayout="dropdown"
                                onSelect={handleDateChange}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-3">
                    {/*<Label htmlFor="time-picker" className="px-1">*/}
                    {/*    시간*/}
                    {/*</Label>*/}
                    <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        onKeyDown={handleKeyDown}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                </div>
            </div>
        </div>
    );
}