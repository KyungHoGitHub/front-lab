import resourceClient from "../../../shared/api/resourceClient.ts";
import {ScheduleRequestDto} from "../types/scheduleType.ts";
import {SCHEDULE_ENDPOINTS} from "../endpoints/scheduleEndpoints.ts";

export const createSchedule = async (data:ScheduleRequestDto ) =>{
    return resourceClient.post(SCHEDULE_ENDPOINTS.SCHEDULE.CREATE,data)
}

export const getScheduleList = async ()=>{
    return resourceClient.get(SCHEDULE_ENDPOINTS.SCHEDULE.GET)
}