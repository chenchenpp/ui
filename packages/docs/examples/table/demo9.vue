<template>
  <RtTable
    :tableList="tableList"
    :data="tableData"
    border
    :tableConfig="{
      noDataFormat: '-',
    }"
    ref="tableRef"
  >
    <!-- 左侧栏扩展 -->
    <template slot="left">
      <el-table-column
        fixed="left"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
    </template>
    <!-- 右侧栏拓展 -->
    <template slot="right">
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="是否确定删除？"
            placement="left"
            @confirm="onDelete(scope.row, scope.$index)"
          >
            <el-button slot="reference" type="text" size="small"
              >删除</el-button
            >
          </el-popconfirm>

          <template v-if="scope.row.isEdit">
            <el-button
              style="margin-left: 10px"
              type="text"
              size="small"
              @click="onCancel(scope.row, scope.$index)"
              >取消</el-button
            >
            <el-button
              style="margin-left: 10px"
              type="text"
              size="small"
              @click="onSave(scope.row, scope.$index)"
              >保存</el-button
            >
          </template>
          <el-button
            v-else
            style="margin-left: 10px"
            type="text"
            size="small"
            @click="onEdit(scope.row, scope.$index)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </template>
  </RtTable>
</template>
<script>
export default {
  data() {
    return {
      isEdit: false,
      tableData: [
        {
          storeNo: "1001",
          storeName: "闸北店",
          planReceptDate: "",
          planSaledate: "2022-10-00",
          phone: "17702100252",
          isEdit: false,
        },
        {
          storeNo: "1001",
          storeName: "闸北店",
          planReceptDate: "2022-10-00",
          planSaledate: "2022-10-00",
          phone: "17702100253",
          isEdit: false,
        },
        {
          storeNo: "1001",
          storeName: "闸北店",
          planReceptDate: "2022-10-00",
          planSaledate: "2022-10-00",
          phone: "",
          dms: "100",
          promDms: "200",
          isEdit: false,
        },
      ],
      // TODO 这里使用的是数组存储配置
      tableList: [
        {
          label: "门店", // 表头名字
          prop: "storeNo", // 绑定值关系
          width: "100", // 设置表格宽度
          type: "readOnly", // 输入框
        },
        {
          label: "店名",
          prop: "storeNo",
          type: "select", // 输入框
          options: [
            {
              label: "闸北店",
              value: "1001",
            },
            {
              label: "闵行店",
              value: "1002",
            },
          ],
          typeConfigEvent: {
            change: this.changeStoreHandler,
          },
          width: "200",
        },
        {
          label: "手机号",
          prop: "phone",
          type: "input",
          typeConfigAttr: {
            placeholder: "请输入手机号",
          },
          rules: (rowData, tableData) => {
            console.log(rowData, tableData)
            return [
              { required: true, message: "请输入手机号", trigger: "blur" },
            ];
          },
          width: "200",
        },
        {
          label: "预计到货日",
          prop: "planReceptDate",
          type: "date",
          typeConfigAttr: {
            type: "date",
            placeholder: "请选择预计到货日",
            "value-format": "yyyy-MM-dd",
          },
          typeConfigEvent: {
            change: this.changeDateHandler,
          },
          width: "240",
        },
        {
          label: "预计可消化日",
          prop: "planSaledate",
          type: "date",
          typeConfigAttr: {
            type: "date",
            placeholder: "请选择预计到货日",
            "value-format": "yyyy-MM-dd",
          },
          width: "240",
        },
        {
          type: "isMult",
          children: [
            {
              label: "DMS",
              prop: ["dms"],
              className(data) {
                return { primary_text: data.dmsFlag };
              },
            },
            {
              label: "促销DMS",
              prop: ["promDms"],
              className(data) {
                return { primary_text: data.promDmsFlag };
              },
            },
          ],
          width: "100",
        },
      ],
    };
  },
  methods: {
    changeStoreHandler(val) {
      console.log("修改门店", val);
    },
    changeDateHandler(val) {
      console.log("修改日期", val);
    },
    onDelete(data, index) {
      console.log(data, index);
    },
    onEdit(data) {
      data.isEdit = true;
    },
    onSave(data, index) {
        console.log(this.$refs.tableRef)
        // 说明：tableRef是绑定在组件调用上，可以获取到子组件下面的实例，
        // 从而获取到子组件里的form绑定的ref
      this.$refs.tableRef.$refs.tableForm.validate((valid) => {
        if (!valid) {
          this.$message.error("填写内容错误，请检查");
          console.log('填写错误')
          return;
        }
        console.log(data, index)
        data.isEdit = false;
      });
    },
    onCancel(data) {
      data.isEdit = false;
    },
  },
};
</script>
