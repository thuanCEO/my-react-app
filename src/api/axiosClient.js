import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://54.252.158.103/',
});
export default axiosClient;