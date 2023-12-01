import axios from "axios";

const axiosInstance = axios.create();

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config, add headers, or perform other tasks before the request is sent
    // config.headers["Authorization"] = "Bearer YourAccessToken";
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response.data;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
