import RtTable from "./components/Table/index.js";

const components = [RtTable];
// 全局安装
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  RtTable,
};
