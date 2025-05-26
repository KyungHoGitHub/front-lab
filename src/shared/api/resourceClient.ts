import axios from "axios";
import config from "../../config.ts";
import {HttpStatus} from "./httpStatus.ts";

// 리소스애 대한 http 요청 구성
const resourceClient = axios.create({
    baseURL: config.resourceServer,
    headers: {
        "Content-Type": "application/json",
    },
    responseType: 'json',
});

resourceClient.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

resourceClient.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalRequest = error.config;

        if (error.response && error.response.status === HttpStatus.FORBIDDEN){
            window.location.href = "/login";
        }

        if (error.response && error.response.status === HttpStatus.UNAUTHORIZED && !originalRequest._retry) {
            originalRequest._retry = true;

            try{
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post(config.refreshTokenApi,{
                    refreshToken : refreshToken,
                });
                const newAccessToken  = response.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return resourceClient(originalRequest);
            }catch (err) {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);

export default resourceClient;