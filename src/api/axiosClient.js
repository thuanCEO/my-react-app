import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://3.25.85.247/',
});
export default axiosClient;