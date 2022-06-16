import { App } from "vue";
// @ts-ignore
import BBDrawerMove from "./src/index.vue";
const install = (app: App): void => {
  app.component(BBDrawerMove.name, BBDrawerMove);
};

export default install;
