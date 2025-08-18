
// 유저 ID 입력 규칙
export const userIdValidation = {
    required: "아이디 입력은 필수 입니다.",
    maxLength: {
        value: 20,
        message: "아이디는 최대 20자 이하이어야 합니다.",
    },
    pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "아이디는 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.",
    },
}

// 유저 Password 입력 규칙
export const userPasswordValidation = {
    required: "패스워드 입력은 필수 입니다.",
}

// 유저 Email 입력 규칙
export const userEmailValidation = {
    required: "이메일 입력은 필수 입니다.",
    pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // 간단한 이메일 정규식
        message: "유효한 이메일 주소를 입력하세요.",
    },
}

// 메모 form 제목 입력 롤
export const memoTitleValidation = {
    required: "메모 제목 입력은 필수 입니다.",
}
