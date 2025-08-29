import {UserRole} from "@/features/signup/types/UserRole.ts";

export interface SignupFormData {
    email: string;
    emailDomain: string;
    userId: string;
    password: string;
    userName: string;
    role: UserRole;
    confirmPassword: string;
}

export interface SignupRequest {
    email: string;
    userId: string;
    userName: string;
    password: string;
    role: string;
}