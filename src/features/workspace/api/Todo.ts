import resourceClient from "../../../shared/api/resourceClient.ts";
import {QUERY_PARAMS, WORKSPACE_ENDPOINTS} from "../endpoints/workspaceEndpoints.ts";
import {TodoFormData} from "../type/TodoFormData.ts";
import {buildQueryString} from "./utils.ts";

export const todoModalSubmit = async (data:TodoFormData)=>{
    return resourceClient.post(WORKSPACE_ENDPOINTS.TODOS.CREATE,data)
}

export const getTodoList = async ()=>{
    return resourceClient.get(WORKSPACE_ENDPOINTS.TODOS.GET);
}

export const searchTodos = async (searchBy: 'title' | 'description', query:string) =>{
   const queryString = buildQueryString({
       [QUERY_PARAMS.TODOS.SEARCH.SEARCH_BY]: searchBy,
       [QUERY_PARAMS.TODOS.SEARCH.QUERY]: query,
   });
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.TODOS.SEARCH}?${queryString}`);
}

export const getTodoById = async (id: number)=>{
    return resourceClient.get(`${WORKSPACE_ENDPOINTS.TODOS.DETAIL}/${id}`);
}

export const updateTodo = async (idx: number, data :any)=>{
    return resourceClient.post(`${WORKSPACE_ENDPOINTS.TODOS.PUT}/${idx}`,data);
}
export const updateTodoIsDelete = async (idx: number) =>{
    return resourceClient.put(`${WORKSPACE_ENDPOINTS.TODOS.DETAIL}/${idx}`);
}