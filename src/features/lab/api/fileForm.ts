import resourceClient from "@/shared/api/resourceClient.ts";


export const createDummyFile = async (data)=>{
    return resourceClient.post("uploads/dummy",data);
}