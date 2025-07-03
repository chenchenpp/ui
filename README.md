## 环境

node19.x

## 指令说明

- 启动项目:
  1. `pnpm install`: 安装依赖包
- 本地调试:
  1. `pnpm run link:ui`:开启软连接组件库，用于实时调试
  2. `pnpm run dev:docs`:启动文档项目
  3. 调整packages -> docs -> docs -> .vuepress -> enhanceApp.js文件
  4. `pnpm run unlink:ui`:关闭软连接
- 打包组件库：
  1. `pnpm run build:ui`:打包组件库
  2. 发布
