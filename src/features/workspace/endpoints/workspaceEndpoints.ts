export const WORKSPACE_ENDPOINTS = {
    TODOS: {
        CREATE: 'todo',
        GET: 'todo',
        SEARCH: 'todo/search',
        DETAIL : (idx:number) => `todo/detail/${idx}`,
        // PUT: 'todo/detail',
        PUT : (idx: number) => ` todo/detail/${idx}`
    },
    CHAT:{
        GET :{
            USER: 'user',
            MESSAGE: 'message',
            ALL_USER: 'all-user',
            CONVERSATION_LIST : (userId:string) => `conversation-list/${userId}`,
        }
    }
} as const;

export const QUERY_PARAMS = {
    TODOS: {
        SEARCH: {
            SEARCH_BY: 'searchBy',
            QUERY: 'query',
        },
    },
} as const;