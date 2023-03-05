import axios, { AxiosError, type AxiosResponse } from "axios";
import { Http } from "../interfaces/http.interface";

export class HttpAxios<T> implements Http<T> {
    private readonly axios = axios;

    constructor() {
        axios.interceptors.request.use((config) => {
            config.headers.Authorization = `bearer ${localStorage.getItem(
                "access"
            )}`;
            return config;
        });
    }

    async get(url: string, queryParams: object): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.axios
                .get(url, {
                    params: queryParams,
                })
                .then((axiosData) => {
                    resolve(axiosData.data);
                })
                .catch((axiosError) => {
                    reject(axiosError.response?.data);
                });
        });
    }
    async post(url: string, body: object, queryParams?: object): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.axios
                .post(url, body, {
                    params: queryParams,
                })
                .then((axiosData) => {
                    resolve(axiosData.data);
                })
                .catch((axiosError) => {
                    reject(axiosError.response?.data);
                });
        });
    }
    async patch(url: string, body: object, queryParams: object): Promise<any> {
        const { data } = await this.axios.patch(url, body, {
            params: queryParams,
        });
        return data;
    }
    async delete(url: string, queryParams: object): Promise<any> {
        const { data } = await this.axios.delete(url);
        return data;
    }
}
