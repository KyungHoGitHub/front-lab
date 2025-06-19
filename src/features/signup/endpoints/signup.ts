
export const SIGNUP_ENDPOINT = {
    AUTH: {
        SIGNUP: "auth/sign/up",
        DUPLICATE: {
            CHECK: (userId: string) => `auth/duplicate/check/${userId}`,
        }
    },
    USER:{
        GET: (userIdx: number) => `user/${userIdx}`
    }
}