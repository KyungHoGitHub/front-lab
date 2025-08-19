import {SignupFormData, SignupRequest} from "../types/signup.ts";

export const toSignupRequest = (form: SignupFormData): SignupRequest => ({
    email: form.email + form.emailDomain,
    userId: form.userId,
    userName: form.userName,
    password: form.password,
    role: form.role
});