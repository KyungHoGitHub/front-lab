export const WORKSPACE_ENDPOINTS = {
    TODOS: {
        CREATE: 'todo',
        GET: 'todo',
        SEARCH: 'todo/search'
    },
} as const;

export const QUERY_PARAMS = {
    TODOS: {
        SEARCH: {
            SEARCH_BY: 'searchBy',
            QUERY: 'query',
        },
    },
} as const;