import {useMutation, useQueryClient} from "@tanstack/react-query";
import dayjs, {Dayjs} from "dayjs";
import {createWeekSchedule, deleteWeekSchedule} from "@/features/weekly-schedule/api/weeklySchedule.ts";
import {Category} from "@/features/weekly-schedule/enum/WeekDay.ts";
import {FormData, ScheduleEvent, SelectedCell} from "@/features/weekly-schedule/types/week-schedule.ts";
import {useState} from "react";
import {INITIAL_FORM_DATA} from "@/features/weekly-schedule/constants/week-schedule.ts";


/**
 * 서버 데이터를 UI용 ScheduleEvent로 변환
 */
const transformServerData = (data: any): ScheduleEvent => {
    const start = dayjs(data.startDateTime);
    const end = dayjs(data.endDateTime);
    const dayIndex = (start.day() + 6) % 7; // 월요일=0, 일요일=6

    return {
        id: data.id.toString(),
        title: data.title,
        description: data.description,
        dayIndex,
        startHour: start.hour(),
        startMinute: start.minute(),
        endHour: end.hour(),
        endMinute: end.minute(),
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        category: data.category || Category.company,
        color: data.color,
        weekDay: start.format("YYYY-MM-DD"),
    };
};

/**
 * 주간 일정 관리 커스텀 훅
 */
export const useWeekSchedule = (weekDate: Dayjs) => {
    const queryClient = useQueryClient();
    const queryKey = ['weekSchedule', weekDate];
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const createOrUpdateMutation = useMutation({
        mutationFn: async (data: any) => {
            if (data.id && !data.id.toString().startsWith('temp-')) {
                // return await updateWeekSchedule(data.id, data);
            } else {
                return await createWeekSchedule(data);
            }
        },
        onMutate: async (newEvent) => {
            // 낙관적 업데이트
            await queryClient.cancelQueries({queryKey});
            const previousEvents = queryClient.getQueryData(queryKey);
            queryClient.setQueryData(queryKey, (old: ScheduleEvent[] = []) => {
                // ... 낙관적 업데이트 로직
            });
            return {previousEvents};
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey});
        },
        onError: (error, variables, context) => {
            // 롤백 로직
            if (context?.previousEvents) {
                queryClient.setQueryData(queryKey, context.previousEvents);
            }
            alert("일정 저장에 실패했습니다.");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await deleteWeekSchedule(id);
        },
        onSuccess: () => {
            // 서버 요청 성공 후 데이터 최신화
            queryClient.invalidateQueries({queryKey});
        },
    });

    // 주간 일정 셀(빈칸) 클릭 처리 이벤트
    const handleCellClick = (dayIndex: number, hour: number) => {
        setSelectedCell({dayIndex, hour});
        setFormData({
            title: "",
            description: "",
            startHour: hour,
            startMinute: 0,   // 추가
            endHour: hour + 1,
            endMinute: 0,
            weekDay: "",
            category: Category.company,
        });
        setEditingEvent(null);
        setIsModalOpen(true);
    }

    // 주간 일정 셀(일정 있는 칸) 클릭 처리 이벤트
    const handleEventClick = (event: ScheduleEvent, e: React.MouseEvent) => {
        e.stopPropagation(); // 셀 클릭 이벤트 전파 방지
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description ?? "",
            startHour: event.startHour,
            startMinute: event.startMinute ?? 0o0,
            endHour: event.endHour,
            endMinute: event.endMinute ?? 0o0,
            weekDay: event.weekDay ?? "",
            category: event.category ?? Category.company
        });
        setSelectedCell({dayIndex: event.dayIndex, hour: event.startHour});
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            category: Category.company, endMinute: 0, startMinute: 0, weekDay: "", title: "", description: "", startHour: 9, endHour: 10
        });
        setSelectedCell(null);
        setEditingEvent(null);
    };

    return {
        // 데이터
        // datas,
        // isLoading,
        // error,
        //
        // // 메서드
        // refetch,
        handleCellClick,
        handleEventClick,
        setFormData,
        setIsModalOpen,
        resetForm,

        createOrUpdate: createOrUpdateMutation.mutate,
        deleteEvent: deleteMutation.mutate,

        // 상태
        isCreating: createOrUpdateMutation.isPending,
        // isDeleting: deleteMutation.isPending,
        selectedCell,
        formData,
        editingEvent,
        isModalOpen
    };
};