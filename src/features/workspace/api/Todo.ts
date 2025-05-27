import resourceClient from "../../../shared/api/resourceClient.ts";
import {WORKSPACE_ENDPOINTS} from "../endpoints/workspaceEndpoints.ts";
import {TodoFormData} from "../type/TodoFormData.ts";

export const todoModalSubmit = async (data:TodoFormData)=>{
    return resourceClient.post(WORKSPACE_ENDPOINTS.TODOS.CREATE,data)
}

export const getTodoList = async ()=>{
    return resourceClient.get(WORKSPACE_ENDPOINTS.TODOS.GET);
}