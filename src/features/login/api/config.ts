import axios from "axios";

export const createAxiosClient = ( baseURL:string, options?: {withAuth?: boolean}) =>{
    const client = axios.create({baseURL});

    client.interceptors.request.use((config)=>{
        if(options?.withAuth){
            const token = localStorage.getItem("accessToken");
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );
}

export const createAxios("http://lcoalhost:8080");