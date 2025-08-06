
// 유저 ID 입력 규칙
export const userIdValidation = {
    require: "아이디 입력은 필수 입니다.",
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
    require: "패스워드 입력은 필수 입니다.",
}

// 유저 Email 입력 규칙
export const userEmailValidation = {
    require: "이메일 입력은 필수 입니다.",
}

