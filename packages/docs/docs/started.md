# 快速上手

1. 下载相关依赖

```
npm install @smallchen/rt-ui
yarn add @smallchen/rt-ui
```

2. 引入 rt-ui</br>
   将 rt-ui 引入到入口文件 main.js 中。
   ::: warning
   rt-ui的引入要在element-ui后面
   :::

   ```js
   import ElementUI from "element-ui";
   import "element-ui/lib/theme-chalk/index.css";

   import RT from "@smallchen/rt-ui";
   import "@smallchen/rt-ui/lib/index.css";
   Vue.use(RtUI);
   ```
