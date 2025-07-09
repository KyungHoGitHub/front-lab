import resourceClient from "../../../shared/api/resourceClient.ts";
import {QUERY_PARAMS, WORKSPACE_ENDPOINTS} from "../endpoints/workspaceEndpoints.ts";
import {buildQueryString} from "./utils.ts";
import {ExtendedTodoFormData} from "../components/TodoModal.tsx";

export const todoModalSubmit = async (data:ExtendedTodoFormData)=>{
    return resourceClient.post(WORKSPACE_ENDPOINTS.TODOS.CREATE,data,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
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