import axios from "axios";


const authClient = axios.create({
    baseURL: "http://localhost:8081",
    headers:{
        "Content-Type": "application/json",
    },
    responseType: 'json',
});

export default authClient;