export const HttpStatus ={
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,           // ← 아이디/이메일 중복은 보통 409!
    INTERNAL_SERVER_ERROR: 500,
}as const;