<template>
  <div class="table-config-main">
    <h3 class="table-config-title">属性介绍：</h3>
    <RtTable :tableList="tableList" :data="attrTableData"></RtTable>
    <h3 class="table-config-title">tableList可配置属性：</h3>
    <RtTable :tableList="tableList" :data="tableListData"></RtTable>
    <h3 class="table-config-title">tableConfig可配置属性：</h3>
    <RtTable :tableList="tableList" :data="tableConfigData"></RtTable>
    <h3 class="table-config-title">tableDragConfig可配置属性：</h3>
    <RtTable :tableList="tableList" :data="dragConfigData"></RtTable>
  </div>
</template>
<script>
export default {
  data() {
    return {
      attrTableData: [
        {
          attrName: "tableList",
          explain: "配置表头相关特性和关联数据",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "data",
          explain: "表格的数据内容",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "isTableDrag",
          explain: "是否打开排序/显隐表头功能",
          type: "boolean",
          optionVal: "-",
          defaultVal: "false",
        },
        {
          attrName: "tableConfig",
          explain: "除了element自带的属性，扩展一些自主的属性",
          type: "object",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "tableDragConfig",
          explain: "配置排序/显隐功能的特性;当isTableDrag为true时有效",
          type: "object",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "其他属性和事件",
          explain: "支持elementUI的table组件属性, 请查阅elementUI",
          type: "-",
          optionVal: "-",
          defaultVal: "-",
        },
      ],
      tableListData: [
        {
          attrName: "label",
          explain: "表头名称",
          type: "string",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "prop",
          explain: "表内容的关联字段",
          type: "string",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "width",
          explain: "设置表列的宽度",
          type: "string",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "className",
          explain: "用于通过数据判断表格内容展示不同样式，可参考例子",
          type: "function",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "isLink",
          explain: "是否为链接",
          type: "boolean",
          optionVal: "-",
          defaultVal: "false",
        },
        {
          attrName: "type",
          explain: `设置表列的类型;
            <div>isMult: 多字段表头; readOnly: 只读状态;</div>
            <div>select: 带有字典字段;input:输入框类型;date:日期类型</div>
            <div style="color:red">（除了isMult/readOnly外，其他类型可用于表单编辑之中）</div>`,
          type: "string",
          optionVal: "isMult/readOnly/select/input/date",
          defaultVal: "默认为空",
        },
        {
          attrName: "rules",
          explain: "表单校验规则（当type为表单编辑类型时，生效）,此方法接收两个参数",
          type: "function",
          optionVal: "",
          defaultVal: "",
          params: "Function(rowData, tableData)"
        },
        {
          attrName: "isHtml",
          explain: `<div style="color:red">用于接收富文本，目前属于试验类型，如遇到问题请联系</div>`,
          type: "boolean",
          optionVal: "",
          defaultVal: "false",
        },
        {
          attrName: "options",
          explain:
            "当type设置的是select时，此参数有效。用于映射字段翻译，请看例子了解使用方法",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "children",
          explain:
            "当type=isMult时，此参数有效。用于设置表头多字段关联关系。请看例子了解使用方法",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "typeConfigAttr",
          explain: "添加elementUi表单中的控件自带的属性",
          type: "Object",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "typeConfigEvent",
          explain: "添加elementUi表单中的控件自带的方法",
          type: "Object",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "onClick",
          explain:
            "当isLink为true时，此参数有效。用于绑定点击事件。请看例子了解使用方法",
          type: "function",
          optionVal: "",
          defaultVal: "-",
          params: 'Function(rowData, rowIndex)'
        },
      ],
      tableConfigData: [
        {
          attrName: "noDataFormat",
          explain: "当属性没有值的情况下，展示格式化样式",
          type: "string",
          optionVal: "-",
          defaultVal: "-",
        },
      ],
      dragConfigData: [
        {
          attrName: "isStorage",
          explain:
            "是否将修改的记录存储到本地;用的是永久存储loaclsotrage, 如果表单发生改变需要清楚storage。",
          type: "boolean",
          optionVal: "-",
          defaultVal: "false",
        },
        {
          attrName: "selectedNames",
          explain: "当isStorage为true时，此设置有效。存储选中的表名",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "tableName",
          explain: "当isStorage为true时，此设置有效。存储拖拽显隐后表头",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
        {
          attrName: "selectOptions",
          explain:
            "当isStorage为true时，此设置有效。用于存储可以拖拽的表字段选项",
          type: "Array",
          optionVal: "-",
          defaultVal: "-",
        },
      ],
      // TODO 这里使用的是数组存储配置
      tableList: [
        {
          label: "参数", // 表头名字
          prop: "attrName", // 绑定值关系
        },
        {
          label: "说明",
          prop: "explain",
          width: "400",
          isHtml: true
        },
        {
          label: "类型",
          prop: "type",
          width: "100",
        },
        {
          label: "可选值",
          prop: "optionVal",
        },
        {
          label: "默认值",
          prop: "defaultVal",
        },
        {
          label: "参数",
          prop: "params",
        },
      ],
    };
  },
};
</script>
