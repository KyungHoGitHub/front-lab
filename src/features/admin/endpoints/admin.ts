export const ADMIN_ENDPOINTS = {
    USERS: {
        GET : 'users/list'
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