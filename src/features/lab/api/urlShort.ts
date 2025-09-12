import resourceClient from "@/shared/api/resourceClient.ts";

export const postUrlShort = async (data: string) =>{
    return resourceClient.post("shorten",data)
}