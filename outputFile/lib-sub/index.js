import BBButton from "./bb-button";
import BBDrawerMove from "./bb-drawer-move";
import BBResponsiveRow from "./bb-responsive-row";
import './theme-chalk/src/index.css';
var components = {
    BBButton: BBButton,
    BBDrawerMove: BBDrawerMove,
    BBResponsiveRow: BBResponsiveRow
};
var install = function (Vue) {
    if (install.installed)
        return;
    install.installed = true;
    // Object.keys(components).forEach((key) => Vue.use(components[key]));
    Object.keys(components).forEach(function (key) { return Vue.component(key, components[key]); });
};
// Auto-install when vue is found (eg. in browser via <script> tag)
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}
export { BBButton, BBDrawerMove, BBResponsiveRow };
export default install;
