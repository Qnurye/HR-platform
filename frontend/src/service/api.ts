import axios from 'axios';
import {BASE_URL} from "@/lib/AppConfig";
import {isTokenValid, loadToken} from "@/lib/utils";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = loadToken();
    if (isTokenValid(token)) config.headers.Authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const post = async <T>(url: string, data: never): Promise<T> => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data as T;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const get = async <T>(url: string, data: never): Promise<T> => {
  try {
    const response = await axiosInstance.get(url, data);
    return response.data as T;
  } catch (error) {
    return Promise.reject(error);
  }
}
export const put = async <T>(url: string, data: never): Promise<T> => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data as T;
  } catch (error) {
    return Promise.reject(error);
  }
}
export const del = async <T>(url: string, data: never): Promise<T> => {
  try {
    const response = await axiosInstance.delete(url, data);
    return response.data as T;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default axiosInstance;
