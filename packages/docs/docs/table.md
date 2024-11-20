# 展示型表格

## 说明

对于表格的封装，是基于数据驱动视图的理念，通过构造数据结构以及对其循环遍历实现将数据展示到页面之中。所以我们只要关心数据层，就可以实现所需要的表格页面，极大的减少了心智负担和提高了开发效率。

## 优点
* 继承elementUI-table组件的属性
* 构造数据渲染视图

## 基本用法

::: demo `tableList`: 对于table中每个字段的配置，此配置项有很多, 后面一一讲解</br> `data`: 获取的数据，展示表格内容

<<< @/examples/table/demo1.vue

:::

## 枚举数据
::: demo `tableList`内部type为select，同时添加options数据

<<< @/examples/table/demo2.vue

:::
## 链接数据
表格中可能需要展示链接跳转等处理
::: demo `tableList`内部type为link，同时添加onClick即可绑定事件

<<< @/examples/table/demo5.vue

:::

## 动态添加样式
根据某个字段改变另一个字段显示样式，如标红处理
::: demo 添加className 可以动态绑定class名，这里的row为每行的数据

<<< @/examples/table/demo3.vue

:::

## 表头多字段
::: demo 设置type为isMult后，可以使用children属性，children属性是一个集合，内部可以进一步配置每个字段属性

<<< @/examples/table/demo4.vue

:::

## 拓展左右列
::: demo

<<< @/examples/table/demo6.vue

:::

## 继承elementUI属性
想要了解更多elementUI的table组件属性和事件，[请查阅官网]('https://element.eleme.cn/2.15/#/zh-CN/component/table')
::: demo 这里样式table继承border，height，selection-change方法；</br>配置tabelColumnAttr继承tableColumn组件的属性

<<< @/examples/table/demo7.vue

:::
## 表头排序与显示隐藏
通过拖拽可进行排序，通过点击可以控制表头字段的显示隐藏
::: demo 1.通过设置isTableDrag的值true或false来控制是否添加控制器 </br>2.tableDragConfig:可以配置拖拽的一些特性如是否本地存储 </br>3.可以在充分利用头部区域，插入相关业务内容

<<< @/examples/table/demo8.vue

:::
## 编辑表格
支持在表格中逐一编辑处理,只要将数据中添加isEdit（boolean），控制isEdit的值即可。</br>
**注意：** <font color='red'>对于多表头暂不支持</font>
::: demo 1.通过设置type来确定字段是属于什么表单控件，如果设置的是readOnly则表示是只读状态此字段不可编辑 2.如果需要表单校验则需要绑定rules和ref来实现
<<< @/examples/table/demo9.vue

:::
## 配置说明
<tableConfig></tableConfig>