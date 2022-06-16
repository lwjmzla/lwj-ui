
import BBButton from "./bb-button";
import BBDrawerMove from "./bb-drawer-move";
import BBResponsiveRow from "./bb-responsive-row";
import './theme-chalk/src/index.scss';
interface Components {
  [key: string]: any;
}

const components: Components = {
  BBButton,
  BBDrawerMove,
  BBResponsiveRow
};

const install: any = function (Vue: any) {
  if (install.installed) return;
  install.installed = true;

  // Object.keys(components).forEach((key) => Vue.use(components[key]));
  Object.keys(components).forEach((key) => Vue.component(key,components[key]));
};

// Auto-install when vue is found (eg. in browser via <script> tag)
if (typeof window !== "undefined" && (window as any).Vue) {
  install((window as any).Vue);
}

export {   
  BBButton,
  BBDrawerMove,
  BBResponsiveRow
}

export default install
