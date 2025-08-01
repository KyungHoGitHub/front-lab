import axios from "axios";
import {Http} from "../utill/constants/http.ts";
import config from "../../config.ts";


const authClient = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: Http.CONTENT_TYPE.APPLICATION_JSON,
    responseType: 'json',
});

export default authClient;