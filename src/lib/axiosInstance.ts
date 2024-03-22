import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// const BASE_URL = "http://localhost:3001/api";
// const BASE_URL = "http://localhost:8888/api";
const BASE_URL = "https://gapcure-server.pearpixels.com/api";
axios.defaults.headers.post['Accept'] ='application/json';
axios.defaults.headers.post['Content-Type'] ='application/json';

// const axiosInstance : AxiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers:{ "Content-Type": "application/json" },
// });
// export default axiosInstance;

// export default  axiosInstance : AxiosInstance = axios.create({
//     baseURL: BASE_URL,
//     headers:{ "Content-Type": "application/json" },
// });
// console.log(BASE_URL)
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});