import axios, { AxiosPromise } from 'axios';
import qs from 'qs';
import { IRequestConfig, IResponse, IPromise } from './index.d';
import {
  handleRequestDefault,
  handleRequestDuplicate,
  handleRequestGlobalParams,
  handleRequestConfigUrl,
  handleResponseDefault,
  handleResponseError,
  handleResponseSuccess,
  handleError,
} from './interceptors';

const { CancelToken } = axios;

// create an axios instance
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // timeout: defaults.timeout || TIME_OUT,
  withCredentials: true, // send cookies when cross-domain requests
});
// request interceptor
instance.interceptors.request.use(handleRequestDefault, (error) => Promise.reject(error));
instance.interceptors.request.use(handleRequestConfigUrl);
instance.interceptors.request.use(handleRequestDuplicate);
instance.interceptors.request.use(handleRequestGlobalParams);

// response interceptor
instance.interceptors.response.use(handleResponseDefault);
instance.interceptors.response.use(handleResponseSuccess);
instance.interceptors.response.use(handleResponseError, handleError);

// 请求默认参数
const defaultConfig: IRequestConfig = {
  server: 'base',
  url: '',
  method: 'GET',
  params: {},
  data: {},
  config: {},
  loading: false,
  loadingMessage: '加载中...',
  responseType: 'json',
  isCancelDuplicateUrlRequests: false,
  isNotCancel: false,
};

/* eslint-disable object-curly-newline */
const http = {
  /**
   * GET 请求
   * @param { IRequestConfig } 请求配置参数
   * @returns
   */
  get<T = any>({
    config = {},
    data = {},
    params = {},
    ...requestConfig
  }: IRequestConfig): IPromise<T> { // !Promise<IResponse<T>>
    const mergeConfig = Object.assign({}, {
      ...defaultConfig,
      ...requestConfig,
      data,
      params,
      method: 'GET',
      paramsSerializer: (requestParams: any) => {
        return qs.stringify(requestParams);
      },
    }, config);
    mergeConfig.cancelToken = new CancelToken((c) => {
      mergeConfig.cancelFn = c;
    });
    // !IResponse<T> 为最外层data的泛型， IPromise<T> 为返回IResponse<T>的 promise
    return instance.request<IResponse<T>>(mergeConfig).then((res) => {
      return res.data;
    });
  },

  /**
   * POST 请求
   */
  post<T = any>({
    config = {},
    data = {},
    params = {},
    ...requestConfig
  }: IRequestConfig): IPromise<T> {
    const mergeConfig = Object.assign({}, {
      ...defaultConfig,
      ...requestConfig,
      data,
      params,
      method: 'POST',
    }, config);

    mergeConfig.cancelToken = new CancelToken((c) => {
      mergeConfig.cancelFn = c;
    });
    return instance.request<IResponse<T>>(mergeConfig).then((res) => {
      return res.data;
    });
  },

  /**
   * DELETE 请求
   * @param { IRequestConfig } 请求配置参数
   * @return {*}
   */
  delete<T = any>({
    config = {},
    data = {},
    params = {},
    ...requestConfig
  }: IRequestConfig): IPromise<T> {
    const mergeConfig = Object.assign({}, {
      ...defaultConfig,
      ...requestConfig,
      data,
      params,
      method: 'DELETE',
    }, config);

    mergeConfig.cancelToken = new CancelToken((c) => {
      mergeConfig.cancelFn = c;
    });
    return instance.request<IResponse<T>>(mergeConfig).then((res) => {
      return res.data;
    });
  },
  /**
   * PUT 请求
   * @param { IRequestConfig } 请求配置参数
   * @return {*}
   */
  put<T = any>({
    config = {},
    data = {},
    params = {},
    ...requestConfig
  }: IRequestConfig): IPromise<T> {
    const mergeConfig = Object.assign({}, {
      ...defaultConfig,
      ...requestConfig,
      data,
      params,
      method: 'PUT',
    }, config);

    mergeConfig.cancelToken = new CancelToken((c) => {
      mergeConfig.cancelFn = c;
    });
    return instance.request<IResponse<T>>(mergeConfig).then((res) => {
      return res.data;
    });
  },
  /**
   * request 请求
   * @param { IRequestConfig } 请求配置参数
   * 自定义responseType 请求方法 直接返回AxiosPromise 对象
   * @return {*}
   */
  request<T = any>({ // !request的T是真正的数据返回结构
    config = {},
    data = {},
    params = {},
    ...requestConfig
  }: IRequestConfig): AxiosPromise<T> {
    const mergeConfig = Object.assign({}, {
      ...defaultConfig,
      ...requestConfig,
      data,
      params,
    }, config);

    mergeConfig.cancelToken = new CancelToken((c) => {
      mergeConfig.cancelFn = c;
    });
    return instance.request<T>(mergeConfig);
  },
};

export default http;
