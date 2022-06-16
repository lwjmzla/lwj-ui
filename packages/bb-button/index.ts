import { App } from 'vue';
// @ts-ignore
import BBButton from './src/index.vue';

const install = (app: App) => {
  app.component(BBButton.name, BBButton);
}
export default install;
