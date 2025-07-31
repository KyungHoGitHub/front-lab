export const ADMIN_ENDPOINTS = {
    USERS: {
        GET : 'users/list',
        COUNT : 'users/count',
        VISITOR_LIST : 'users/visitor'
    }
}

export const QUERY_PARAMS = {
    USERS: {
        SEARCH: {
            SEARCH_BY: 'searchBy',
            QUERY: 'query',
        },
    },
} as const;