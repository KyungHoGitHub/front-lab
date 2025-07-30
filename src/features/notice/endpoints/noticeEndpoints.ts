export const NOTICE_ENDPOINT ={
    NOTICE:{
        SEARCH : 'notice/search',
        LIST : 'notice-list'
    }
}
export const QUERY_PARAMS = {
    NOTICE: {
        SEARCH: {
            SEARCH_BY: 'searchBy',
            QUERY: 'query',
        },
    },
} as const;