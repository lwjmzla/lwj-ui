import axios, { AxiosResponse, Canceler } from 'axios';
import { ElMessage } from 'element-plus';
import { IRequestConfig, IResponse } from './index.d';
import { API_BASE } from '../config';
//import { getToken } from '@/utils/auth';
//import store from '@/store';
//import router from '@/router';
//import { BaseObject } from '@/types/index.d';
import {
  showFullScreenLoading,
  hideFullScreenLoading,
  parsingBlob,
} from './helper';

interface BaseObject {
  [key: string]: any;
}


// 缓存请求对象。用于取消重复请求
const cacheRequestPromise: { [key: string]: Canceler; } = {};

/**
 * 默认拦截器 - 处理loading
 * @param config IRequestConfig
 */
export function handleRequestDefault(config: IRequestConfig) {
  // 显示 loading
  if (config.loading) {
    const message = config.loadingMessage;
    showFullScreenLoading(message);
  }
  return config;
}

/**
 * 请求拦截器 - 处理重复请求拦截器
 * @param config IRequestConfig
 */
export function handleRequestDuplicate(config: IRequestConfig) {
  // 发起请求时，取消掉当前正在进行的相同请求
  let cacheRequestKey = config.url!;
  const _data = { ...config.data };
  delete _data._;
  const _params = { ...config.params };
  delete _params._;

  if (config.isCancelDuplicateUrlRequests) {
    cacheRequestKey += config.method;
  } else {
    if (JSON.stringify(_data) !== '{}') {
      cacheRequestKey += `&${JSON.stringify(_data)}`;
    }
    if (JSON.stringify(_params) !== '{}') {
      cacheRequestKey += `&${JSON.stringify(_params)}`;
    }
  }

  config.cacheRequestKey = cacheRequestKey;

  // 取消重复请求
  if (cacheRequestPromise[cacheRequestKey]) {
    cacheRequestPromise[cacheRequestKey]('Cancel operation');
  }
  cacheRequestPromise[cacheRequestKey] = config.cancelFn!;

  return config;
}

/**
 * 请求拦截器 - 处理请求url域名拼接
 * @param config IRequestConfig
 */
export function handleRequestConfigUrl(config: IRequestConfig) {
  // 处理完整的 URL. 非 http, https 的才处理
  const isExternal = /^(https?:)/.test(config.url!);
  if (!isExternal) {
    const hasServer = !!API_BASE[config.server!];
    if (!hasServer) {
      console.warn(`API_BASE not found 'server: ${config.server}' config, will reset server to 'base'`);
      config.server = 'base';
    }
    config.url = `${API_BASE[config.server!]}${config.url}`;
  }
  return config;
}

/**
 * 请求拦截器 - 添加全局参数
 * @param config IRequestConfig
 */
export function handleRequestGlobalParams(config: IRequestConfig) {
  // 统一处理需要全局传参
  //const token = getToken();

  //config.headers.Authorization = token;

  const METHOD = config.method!.toLowerCase();

  // GET 请求设置时间戳参数, 解决缓存问题
  if (METHOD === 'get' && !config.cache) {
    config.params._ = Date.now();
  }

  return config;
}

/**
 * 响应拦截器 - 默认拦截器 处理 loading
 * @param response AxiosResponse
 */
export function handleResponseDefault(response: AxiosResponse) {
  const requestConfig: IRequestConfig = response.config;
  delete cacheRequestPromise[requestConfig.cacheRequestKey!];
  if (requestConfig.loading) {
    hideFullScreenLoading();
  }
  return response;
}

/**
 * 响应拦截器 - 判断业务响应是否 成功
 * @param response AxiosResponse
 */
export function handleResponseSuccess(response: AxiosResponse<IResponse>) {
  const { data } = response;
  const requestConfig: IRequestConfig = response.config;
  // 下载相关 直接 返回
  if (response.config.responseType!.toLowerCase() === 'blob') {
    return Promise.resolve(response);
  }
  const { successful } = data;
  if (successful) {
    if (!requestConfig.model) return Promise.resolve(response);

    // const entity = plainToClass(requestConfig.model, data);
    // const validationErrors = validateSync(entity);
    // if (validationErrors.length > 0) {
    //   const error = new Error(`${response.config.url} , ${validationErrors[0].toString()}`);
    //   error.name = '接口数据异常';
    //   console.error(error);
    // }
    // response.data = entity;

    return Promise.resolve(response);
  }
  return response;
}

const JUMP_LOGIN_CODE_LIST: any[] = ['401'];
/**
 * 响应拦截器 - 处理响应异常（业务异常）
 * @param response AxiosResponse
 */
export async function handleResponseError(
  response: (AxiosResponse<IResponse>),
) {
  const { data } = response;
  const requestConfig: IRequestConfig = response.config;
  const { successful, code, message } = data;
  // 下载相关 没有successful直接通过
  if (response.config.responseType!.toLowerCase() === 'blob') {
    if ((data as any).type === 'application/json') {
      // 需要解码文件获取返货类型
      const result: any = await parsingBlob(data);

      if (result.code === '403') {
        //const isExpiration = true;
        //await store.dispatch('account/logout', isExpiration);
        //router.replace('/login');
        ElMessage.error(result.message || '暂无权限，退出登录');
      } else {
        ElMessage.error((result && result.message) || '导出失败');
      }
      return Promise.reject(result.message);
    }
    return Promise.resolve(response);
  }

  if (!successful) {
    // 没有登录 跳转到登录页面
    if (JUMP_LOGIN_CODE_LIST.includes(code)) {
      ElMessage.error(message || '会话过期， 请重新登陆!');
      //const isExpiration = true;
      //await store.dispatch('account/logout', isExpiration);
      // redirect to login
      //router.replace('/login');
      return Promise.reject(data);
    }
    console.log(code);

    // 没有权限 跳转到登录页
    if (code === '403') {
      //const isExpiration = true;
      //await store.dispatch('account/logout', isExpiration);
      //router.replace('/login');
      ElMessage.error(data.message || '暂无权限，退出登录');
      return Promise.reject(data);
    }

    if (!requestConfig.errorMessageCallback || requestConfig.errorMessageCallback(data)) {
      ElMessage.error(message || '');
    }

    return Promise.reject(data);
  }
  return response;
}

/**
 * 响应拦截器 - 处理响应失败拦截器 (http异常&canceled)
 * @param error any
 */
export async function handleError(error: any) {
  hideFullScreenLoading();
  // 通过 axios.isCancel(err) 判断是否是 canceled的请求
  if (axios.isCancel(error)) {
    return Promise.reject({
      isCancel: true,
      status: 'canceled',
      statusText: 'Cancel operation',
      message: error.message,
    });
  }
  if (error && error.response) {
    const messages: BaseObject = {
      400: '错误请求',
      401: '会话过期，请重新登录',
      403: '拒绝访问',
      404: '请求错误，未找到该资源',
      405: '请求方法未允许',
      408: '请求超时',
      500: '服务器端出错',
      501: '网络未实现',
      502: '网络错误',
      503: '服务不可用',
      504: '网络超时',
      505: 'http版本不支持该请求',
    };
    error.message = messages[error.response.status] || `连接错误${error.response.status}`;
  } else {
    error.message = error.message || '连接到服务器失败';
  }

  try {
    const { status, statusText } = error.response;
    // 登录过期
    if (status === 401) {
      ElMessage.closeAll();
      ElMessage.error(error.message);
      //const isExpiration = true;
      //await store.dispatch('account/logout', isExpiration);
      // redirect to login
      //router.replace('/login');
      return Promise.reject(error);
    }

    // 非登录过期错误
    ElMessage.error(`${status} - ${error.message}`);
    return Promise.reject({
      status,
      statusText,
      message: error.message,
    });
  } catch (err) {
    return Promise.reject({
      status: '',
      statusText: '未知错误',
      message: error.message,
    });
  }
}
