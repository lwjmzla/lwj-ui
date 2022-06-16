export declare const UPLOAD_FILE_API = "https://uat-openapi.ibaibu.com/api/file/upload";
/**
 * 图片、文件上传
 *
 * @param {*} data
 * @returns
 */
export declare const uploadFile: (data?: any) => import("../http").IPromise<any>;
/**
 * 获取 获取省市区数据
 *
 * @param {*} data
 * @returns
 */
export declare const getAddressTree: () => import("../http").IPromise<any>;
