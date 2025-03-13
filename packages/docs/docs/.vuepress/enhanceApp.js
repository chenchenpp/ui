import ElementUI from "element-ui";
// 组件引入
// import RtUI from "../../../ui/src/index"
// import RtUI from '../../lib/index'
import RtUI from "@smallchen/rt-ui"
import "element-ui/lib/theme-chalk/index.css";
import "@smallchen/rt-ui/lib/index.css"
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.use(RtUI)
}