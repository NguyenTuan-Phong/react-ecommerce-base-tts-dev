import axios, { type AxiosRequestConfig } from "axios";
import { baseURL } from "./config";
import useUserStore from "../store/useUserStore";
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        if (response.config.method === "get") {
            return response.data;
        }
        toast.success(response.data.message);
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && 
          (error.response.status === 401 || error.response.status === 403) && 
          !originalRequest._retry && 
          !originalRequest.url.includes("/auth/authenticate")
        ) {
            originalRequest._retry = true;
            const userStore = useUserStore.getState();
            const refreshToken = userStore.user?.refreshToken;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const res = await axios.post(`${baseURL}/auth/refresh-token`, {
                        refreshToken,
                    });
                    const { token: accessToken, refreshToken: newRefreshToken } = res.data;

                    useUserStore.getState().login({
                        ...userStore.user!,
                        token: accessToken,
                        refreshToken: newRefreshToken,
                    });
                    processQueue(null, accessToken);
                    isRefreshing = false;

                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    return api(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    isRefreshing = false;
                    useUserStore.getState().logout();
                    return Promise.reject(err);
                }
            }

            return new Promise(function (resolve, reject) {
                failedQueue.push({
                    resolve: (token: string) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    },
                    reject: (err: any) => {
                        reject(err);
                    }
                });
            });
        }

        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        if (error.request) {
            return Promise.reject(
                "Network Error: No response received from the server"
            );
        }
    }
);

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

export const get = <T>({
  url,
  params,
  config,  
} : {
  url: string;
  params?: AxiosRequestConfig["params"];
  config?: AxiosRequestConfig;
}) : Promise<T> =>

  api.get(url, {
    // url,
    params,
    ...config,
  });

export const post = <T>({
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
