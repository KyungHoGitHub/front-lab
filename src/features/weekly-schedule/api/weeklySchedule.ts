import resourceClient from "@/shared/api/resourceClient.ts";

export const createWeekSchedule = async (data: any) =>{
    return resourceClient.post("week-plan", data);
}

export const getWeekSchedule = async (weekDay) =>{
    return resourceClient.get(`week-plan/${weekDay}`);
}