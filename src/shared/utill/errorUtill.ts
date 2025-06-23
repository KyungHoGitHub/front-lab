export enum ErrorMessage {
    BAD_REQUEST = "잘못된 요청입니다.",
    UNAUTHORIZED = "인증이 필요합니다. 다시 로그인해주세요.",
    FORBIDDEN = "접근 권한이 없습니다.",
    NOT_FOUND = "요청하신 리소스를 찾을 수 없습니다.",
    INTERNAL_SERVER_ERROR = "서버 내부 오류가 발생했습니다.",
    UNKNOWN = "알 수 없는 오류가 발생했습니다.",
}

export const mapErrorMessage = (error: any): string => {
    const status = error?.response?.status;

    const errorMap: Record<number, ErrorMessage> = {
        400: ErrorMessage.BAD_REQUEST,
        401: ErrorMessage.UNAUTHORIZED,
        403: ErrorMessage.FORBIDDEN,
        404: ErrorMessage.NOT_FOUND,
        500: ErrorMessage.INTERNAL_SERVER_ERROR,
    };

    return errorMap[status] || ErrorMessage.UNKNOWN
};