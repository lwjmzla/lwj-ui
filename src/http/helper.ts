/**
 * 网络请求辅助类
 */
import { ElLoading, ElLoadingService } from 'element-plus';
import { debounce } from 'lodash';


let needLoadingRequestCount = 0;
let loadingInstance: typeof ElLoadingService | null | any = null;

/**
 * 开始加载中
 * @param {string} [message=''] loading 提示语
 */
function startLoading(message = '') {
  loadingInstance = ElLoading.service({
    text: message,
  });
}

/**
 * 结束加载中
 */
function endLoading() {
  if (loadingInstance) {
    loadingInstance.close();
  }
  loadingInstance = null;
}

// loading 防抖
const debounceEndLoading = (() => debounce(endLoading, 100))();


/**
 * 显示 loading 层
 * @export
 * @param {string} [message='']
 */
export function showFullScreenLoading(message = '') {
  if (needLoadingRequestCount === 0) {
    startLoading(message);
  }
  needLoadingRequestCount += 1;
}

/**
 * 延迟 loading 层
 * @export
 * @returns
 */
export function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) {
    return;
  }
  needLoadingRequestCount -= 1;
  if (needLoadingRequestCount === 0) {
    debounceEndLoading();
  }
}

/**
 * 解析blob文件
 * @export
 * @returns
 */
export function parsingBlob(data: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsText(data as any, 'utf-8');
    reader.onload = () => {
      let result: any = {};
      try {
        result = JSON.parse(reader.result as string);
      } catch (e) {
        console.log(e);
        result = data;
      }
      resolve(result);
    };
  });
}

