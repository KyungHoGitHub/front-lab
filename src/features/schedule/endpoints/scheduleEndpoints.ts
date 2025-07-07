export const SCHEDULE_ENDPOINTS = {
    SCHEDULE: {
        CREATE: 'schedule',
        GET: 'schedule',
        CURRENT_MONTH_LIST : (year:string, month:string)=>`schedule/schedule-current-month-list?year=${year}&month=${month}`,
    },
}
