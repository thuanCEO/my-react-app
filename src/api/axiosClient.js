import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://54.252.158.103/',
});
export default axiosClient;