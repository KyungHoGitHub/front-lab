import authClient from "../../../shared/api/auth.ts";

export const login = async (data: { id: string, password: string }) => {
    return authClient.post("auth/login", data);
}