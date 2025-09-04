export const SCHEDULE_ENDPOINTS = {
    SCHEDULE: {
        CREATE: 'schedule',
        GET: 'schedule',
        DELETE: (idx: number)=> `schedule/${idx}`,
        CURRENT_MONTH_LIST : (year:string, month:string)=>`schedule/schedule-current-month-list?year=${year}&month=${month}`,
    },
}
