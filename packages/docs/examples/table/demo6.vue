<template>
  <RtTable :tableList="tableList" :data="tableData">
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
      <el-table-column label="操作" width="120" fixed="right">
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
          <el-button
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
      tableData: new Array(3).fill({
        storeNo: "1001",
        storeName: "闸北店",
        planReceptDate: "2022-10-00",
        planSaledate: "2022-10-00",
      }),
      // TODO 这里使用的是数组存储配置
      tableList: [
        {
          label: "门店", // 表头名字
          prop: "storeNo", // 绑定值关系
          width: "100", // 设置表格宽度
        },
        {
          label: "店名",
          prop: "storeName",
        },
        {
          label: "预计到货日",
          prop: "planReceptDate",
        },
        {
          label: "预计可消化日",
          prop: "planSaledate",
        },
      ],
    };
  },
  methods: {
    onDelete(data, index) {
      console.log(data, index);
    },
    onEdit(data, index) {
      console.log(data, index);
    },
  },
};
</script>
