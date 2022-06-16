/**
 * 项目全局配置文件
 */

// import { RouteConfig } from 'vue-router';
// import { MenuItem } from '@/store/modules/menu.d';

// 主域名: www.baibu.la => baibu.la; www.ibaibu.com => ibaibu.com
export function getEnv(defaultEnv = 'qa4') {
  const defaultMainDomain = 'ibaibu.com';

  let hostname ='';
  if (typeof window !== "undefined") {
    hostname = window.location.hostname;
  }
  const isLocal = /(^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$)|(^localhost$)/.test(
    hostname
  );

  const domains = hostname.split('.');
  const [levelDomain] = domains;
  const mainDomain = isLocal
    ? defaultMainDomain
    : `${domains[1]}.${domains[2]}`;

  let prefix;
  const prefixList = levelDomain.split('-');

  if (isLocal) {
    prefix = defaultEnv;
    // todo
  } else if ([''].includes(levelDomain)) {
    prefix = 'production';
  } else if (prefixList.length === 1) {
    prefix = levelDomain;
  } else {
    [prefix] = prefixList;
  }

  return {
    isLocal,
    mainDomain,
    levelDomain,
    prefix
  };
}

// 获取 api 前置路径
export const API_BASE = (function API_BASE() {
  const { prefix, mainDomain } = getEnv();
  const APIS: any = {
    production: {
      open: 'https://openapi.ibaibu.com',
      base: `https://api.${mainDomain}`,
      imageSearchWeb: `https://imagesearch.${mainDomain}`
    },
    others: {
      open: 'https://uat-openapi.ibaibu.com',
      base: `https://${prefix}-api.${mainDomain}`,
      imageSearchWeb: `https://${prefix}-imagesearch.${mainDomain}`
    }
  };

  return APIS[prefix] || APIS.others;
})();

// 环境域名对应的前缀
export const ENV_PREFIX = window.location.host;

// 版权
export const COPYRIGHT = 'Copyright © 2021 广州致景信息科技有限公司';
// 系统名称
export const SYSTEM_NAME = '组件库';
// 系统英文名称
export const SYSTEM_ENGLISH_NAME = 'Component Library';

export const REQ_AGENT = 'data-cube'

export const OS_CHANNEL = 'web'