export const WORKSPACE_ENDPOINTS = {
    TODOS: {
        CREATE: 'todo',
        GET: 'todo',
        SEARCH: 'todo/search',
        DETAIL:'todo/detail',
        PUT: 'todo/detail',
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