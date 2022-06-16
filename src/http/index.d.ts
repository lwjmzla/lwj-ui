import { AxiosRequestConfig, Canceler } from 'axios';

export interface IRequestConfig extends AxiosRequestConfig {
  /**
   * 强制不取消请求
   */
  isNotCancel?: boolean;
  /**
   * 取消请求对象
   */
  cancelFn?: Canceler;
  /**
   * 是否显示loading
   */
  loading?: boolean;
  /**
   * 全局loading 提示语
   */
  loadingMessage?: string;
  /**
   * 调用的域名
   */
  server?: string;
  /**
   * 缓存请求 cancelToken 的key
   */
  cacheRequestKey?: string;
  /**
   * GET 请求设置时间戳参数, 解决缓存问题
   */
  cache?: boolean;
  /**
   * 请求配置
   */
  config?: any;
  /**
   * 取消重复url 请求（不包含参数）
   */
  isCancelDuplicateUrlRequests?: boolean;
  /**
   * 自定义 处理 失败提示语 返回 true 展示默认提示语
   */
  errorMessageCallback?: (res: any) => boolean;
  /**
   * 数据模型
   */
  model?: ClassType,
}

export interface ClassType {
  new(...args: any[]): any;
}

export interface IResponse<T = any> {
  type: string;
  data: T;
  successful: boolean;
  message?: string;
  code?: string;
}

export interface IPromise<T = any> extends Promise<IResponse<T>> { }
