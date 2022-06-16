import { AxiosPromise } from 'axios';
import { IRequestConfig, IPromise } from './index.d';
declare const http: {
    /**
     * GET 请求
     * @param { IRequestConfig } 请求配置参数
     * @returns
     */
    get<T = any>({ config, data, params, ...requestConfig }: IRequestConfig): IPromise<T>;
    /**
     * POST 请求
     */
    post<T_1 = any>({ config, data, params, ...requestConfig }: IRequestConfig): IPromise<T_1>;
    /**
     * DELETE 请求
     * @param { IRequestConfig } 请求配置参数
     * @return {*}
     */
    delete<T_2 = any>({ config, data, params, ...requestConfig }: IRequestConfig): IPromise<T_2>;
    /**
     * PUT 请求
     * @param { IRequestConfig } 请求配置参数
     * @return {*}
     */
    put<T_3 = any>({ config, data, params, ...requestConfig }: IRequestConfig): IPromise<T_3>;
    /**
     * request 请求
     * @param { IRequestConfig } 请求配置参数
     * 自定义responseType 请求方法 直接返回AxiosPromise 对象
     * @return {*}
     */
    request<T_4 = any>({ config, data, params, ...requestConfig }: IRequestConfig): AxiosPromise<T_4>;
};
export default http;
