import axios, { type AxiosRequestConfig } from "axios";
import { baseURL } from "./config";
import useUserStore from "../store/useUserStore";
import { toast } from "react-toastify";


export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000
});


api.interceptors.response.use(
  (response) => {
    if(response.config.method === "get") {
       return response.data
    }
    toast.success(response.data.message);
    return response.data
  },
  (error) => {
    if(error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      return Promise.reject(
        "Network Error: No response received from the server"
      );
    }
  }
)

api.interceptors.request.use(
  
  (config) => {
    const accessToken = useUserStore.getState().user?.token;
    if(accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
)

// METHOD
// hàm get có kiểu trả về là 1 promise dạng T* (T có thể là kiểu Product)

export const get = <T>({
  url,
  params,
  config,   // một đối tượng chứa các tùy chọn khác liên quan đến yêu cầu.
} : {
  url: string;
  params?: AxiosRequestConfig["params"];
  config?: AxiosRequestConfig;
}) : Promise<T> =>
  // tham số 1 là url , 2 là config
  api.get(url, {
    url,
    params,
    ...config,
  });


// hàm post 

export const post = <T>({
  // Tránh xung đột cú pháp trong một số phiên bản cũ hơn của TypeScript (đặc biệt là với JSX sẽ bị nhầm lẫn cú pháp đây là thẻ).
  url,
  data,
  config,
}: {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}): Promise<T> => api.post(url, data, config);

export const update = ({
  url,
  data,
  config,
}: {
  url: string;
  data?: unknown;
  config?: AxiosRequestConfig;
}) => api.put(url, data, config);

export const remove = ({ url }: { url: string }) => api.delete(url);
