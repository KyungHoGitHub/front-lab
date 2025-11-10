import resourceClient from "@/shared/api/resourceClient.ts";


export const spellingCheck = async (data: string)=>{
    return resourceClient.post("api/spellcheck", {text: data})
}