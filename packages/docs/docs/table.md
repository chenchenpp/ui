# 展示型表格

## 说明

对于表格的封装，是基于数据驱动视图的理念，通过构造数据结构以及对其循环遍历实现将数据展示到页面之中。所以我们只要关心数据层，就可以实现所需要的表格页面，极大的减少了心智负担和提高了开发效率。

## 优点

- 继承 elementUI-table 组件的属性
- 构造数据渲染视图

## 基本用法

::: demo `tableList`: 对于 table 中每个字段的配置，此配置项有很多, 后面一一讲解</br> `data`: 获取的数据，展示表格内容

<<< @/examples/table/demo1.vue

:::

## 枚举数据

::: demo `tableList`内部 type 为 select，同时添加 options 数据

<<< @/examples/table/demo2.vue

:::

## 链接数据

表格中可能需要展示链接跳转等处理
::: demo `tableList`内部 type 为 link，同时添加 onClick 即可绑定事件

<<< @/examples/table/demo5.vue

:::

## 动态添加样式

根据某个字段改变另一个字段显示样式，如标红处理
::: demo 添加 className 可以动态绑定 class 名，这里的 row 为每行的数据

<<< @/examples/table/demo3.vue

:::

## 表头多字段

::: demo 设置 type 为 isMult 后，可以使用 children 属性，children 属性是一个集合，内部可以进一步配置每个字段属性

<<< @/examples/table/demo4.vue

:::

## 拓展左右列

::: demo

<<< @/examples/table/demo6.vue

:::

## 继承 elementUI 属性

想要了解更多 elementUI 的 table 组件属性和事件，[请查阅官网]('https://element.eleme.cn/2.15/#/zh-CN/component/table')
::: demo 这里样式 table 继承 border，height，selection-change 方法；</br>配置 tabelColumnAttr 继承 tableColumn 组件的属性

<<< @/examples/table/demo7.vue

:::

## 表头排序与显示隐藏

通过拖拽可进行排序，通过点击可以控制表头字段的显示隐藏
::: demo 1.通过设置 isTableDrag 的值 true 或 false 来控制是否添加控制器 </br>2.tableDragConfig:可以配置拖拽的一些特性如是否本地存储 </br>3.可以在充分利用头部区域，插入相关业务内容

<<< @/examples/table/demo8.vue
:::

## 编辑表格

支持在表格中逐一编辑处理,只要将数据中添加 isEdit（boolean），控制 isEdit 的值即可。</br>
**注意：** <font color='red'>对于多表头暂不支持</font>
::: demo 1.通过设置 type 来确定字段是属于什么表单控件，如果设置的是 readOnly 则表示是只读状态此字段不可编辑 2.如果需要表单校验则需要绑定 rules 和 ref 来实现
<<< @/examples/table/demo9.vue

:::

## 表格全选与本页全选

::: demo <span style="font-size: 16px; color:red; font-weight: bold">注意:请使用`.sync`修饰符，更新数据变化，从而可以获取实时数据</span></br> 1.isAllSelected 设置为 true </br>2.allTableChecked:当前全选表格的状态 </br>3.cancelSelectedTableRow 取消选择的行数据,用于全选表格的情况</br>4.selectedTableRow：选中的行数据,用于非全选表格的情况</br>5.selectedKeyName:匹配字段名，注意使用唯一值字段</br>6.tableTotal:表格总条数

<<< @/examples/table/demo10.vue
:::

## 配置说明

<tableConfig></tableConfig>
