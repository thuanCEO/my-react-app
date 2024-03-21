import axios from "axios";

const axiosClient = axios.create({
   // baseURL: '//54.252.158.103/',

    baseURL: 'https://localhost:7195/',
});
export default axiosClient;