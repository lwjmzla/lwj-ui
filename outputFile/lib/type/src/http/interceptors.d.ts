import { AxiosResponse } from 'axios';
import { IRequestConfig, IResponse } from './index.d';
/**
 * 默认拦截器 - 处理loading
 * @param config IRequestConfig
 */
export declare function handleRequestDefault(config: IRequestConfig): IRequestConfig;
/**
 * 请求拦截器 - 处理重复请求拦截器
 * @param config IRequestConfig
 */
export declare function handleRequestDuplicate(config: IRequestConfig): IRequestConfig;
/**
 * 请求拦截器 - 处理请求url域名拼接
 * @param config IRequestConfig
 */
export declare function handleRequestConfigUrl(config: IRequestConfig): IRequestConfig;
/**
 * 请求拦截器 - 添加全局参数
 * @param config IRequestConfig
 */
export declare function handleRequestGlobalParams(config: IRequestConfig): IRequestConfig;
/**
 * 响应拦截器 - 默认拦截器 处理 loading
 * @param response AxiosResponse
 */
export declare function handleResponseDefault(response: AxiosResponse): AxiosResponse<any, any>;
/**
 * 响应拦截器 - 判断业务响应是否 成功
 * @param response AxiosResponse
 */
export declare function handleResponseSuccess(response: AxiosResponse<IResponse>): AxiosResponse<IResponse<any>, any> | Promise<AxiosResponse<IResponse<any>, any>>;
/**
 * 响应拦截器 - 处理响应异常（业务异常）
 * @param response AxiosResponse
 */
export declare function handleResponseError(response: (AxiosResponse<IResponse>)): Promise<AxiosResponse<IResponse<any>, any>>;
/**
 * 响应拦截器 - 处理响应失败拦截器 (http异常&canceled)
 * @param error any
 */
export declare function handleError(error: any): Promise<never>;
