import authClient from "../../../shared/api/auth.ts";

export const login = async (data:FormData) => {
    return authClient.post("auth/login", {data})
}