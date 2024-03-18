import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://localhost:7195/',
});

export default axiosClient;