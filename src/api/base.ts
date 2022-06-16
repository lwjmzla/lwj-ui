import http from '../http';
//import { API_BASE } from '../config';

// 图片、文件上传 API 路径
//export const UPLOAD_FILE_API = `${API_BASE.open}/api/file/upload`;
export const UPLOAD_FILE_API = `https://uat-openapi.ibaibu.com/api/file/upload`;

/**
 * 图片、文件上传
 *
 * @param {*} data
 * @returns
 */
export const uploadFile = (data: any = {}) => {
  return http.post({
    url: UPLOAD_FILE_API,
    data,
    loading: true
  });
};
/**
 * 获取 获取省市区数据
 *
 * @param {*} data
 * @returns
 */
export const getAddressTree = () => {
  const url = '/api/addresses/get';

  return http.get({
    server: 'open',
    url,
    isNotCancel: true
  });
};
