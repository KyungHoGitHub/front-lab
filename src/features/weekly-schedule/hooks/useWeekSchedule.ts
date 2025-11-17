import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import {
    createWeekSchedule,
    deleteWeekSchedule,
    getWeekSchedule
} from "@/features/weekly-schedule/api/weeklySchedule.ts";
import {Category} from "@/features/weekly-schedule/enum/WeekDay.ts";
import {ScheduleEvent} from "@/features/weekly-schedule/types";

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
    //
    // const {datas} = useQuery({
    //     queryKey: queryKey,
    //     queryFn: async () => {
    //         const res = await getWeekSchedule(weekDate.format("YYYY-MM-DD"));
    //         return res.data.map(transformServerData);
    //     },
    //     // onSuccess: (data) => {
    //     //
    //     //     const events = data.map(transformServerData);
    //     //     setTestEvent(events);
    //     // },
    //     enabled: !!weekDate,
    //     cacheTime: 0,          // 캐시를 오래 보관하지 않음
    // })

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
        mutationFn: async (id:string)=>{
            await deleteWeekSchedule(id);
        },
        onSuccess: () => {
            // 서버 요청 성공 후 데이터 최신화
            queryClient.invalidateQueries({ queryKey });
        },
    });

    return {
        // 데이터
        // datas,
        // isLoading,
        // error,
        //
        // // 메서드
        // refetch,
        createOrUpdate: createOrUpdateMutation.mutate,
        deleteEvent: deleteMutation.mutate,

        // 상태
        isCreating: createOrUpdateMutation.isPending,
        // isDeleting: deleteMutation.isPending,
    };
};