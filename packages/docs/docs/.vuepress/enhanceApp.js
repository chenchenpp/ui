import ElementUI from "element-ui";
// 本地调试引入
// import RtUI from "@smallchen/rt-ui/src/index"
// 打包后引入
import RtUI from "@smallchen/rt-ui"
import "element-ui/lib/theme-chalk/index.css";
// 打包后引入
import "@smallchen/rt-ui/lib/index.css"
export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.use(RtUI)
}