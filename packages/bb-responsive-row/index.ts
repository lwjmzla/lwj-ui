import { App } from "vue";
// @ts-ignore
import BBResponsiveRow from "./src/index.tsx";

const install = (app: App): void => {
  app.component(BBResponsiveRow.name, BBResponsiveRow);
};

export default install;
