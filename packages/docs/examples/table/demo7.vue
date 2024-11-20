<template>
  <RtTable
    :tableList="tableList"
    :data="tableData"
    border
    height="300"
    @selection-change="handleSelectionChange"
  >
    <!-- 拓展左边列 -->
    <template slot="left">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        fixed="left"
        label="序号"
        type="index"
        width="50"
      ></el-table-column>
    </template>
    <!-- 拓展右边列 -->
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
        orderType: "1",
        planSaledate: "2022-10-00",
        promClass: "1级",
        storeSalesBudget: "100",
        orderCenterNo: "110",
        promDmsFlag: true,
      }),
      tableList: [
        {
          label: "门店",
          prop: "storeNo",
          width: "100",
          // 设置el-table-column的属性
          tableColumnAttr: {
            sortable: true,
            align: "center",
            "sort-method": function (a, b) {
              console.log(a, b);
            },
          },
        },
        {
          label: "店名",
          prop: "storeName",
          width: "100",
        },
        {
          label: "预计到货日",
          prop: "planReceptDate",
          width: "100",
        },
        {
          label: "订单类型",
          prop: "orderType",
          width: "100",
          type: "select",
          options: [],
        },
        {
          label: "预计可消化日",
          prop: "planSaledate",
          width: "150",
        },
        {
          type: "isMult",
          width: "180",
          children: [
            {
              label: "安排档期级别",
              prop: ["promClass"],
            },
            {
              label: "门店预销量",
              prop: ["storeSalesBudget"],
            },
          ],
        },
        {
          label: "中台订单号",
          prop: "orderCenterNo",
          type: "readOnly",
          isLink: true,
          onClick(data, index) {
            console.log(data, index);
          },
        },
      ],
    };
  },
  created() {
    const curIndex = this.tableList.findIndex(
      (item) => item.prop === "orderType"
    );
    this.tableList[curIndex].options = [
      {
        value: "1",
        label: "快行",
      },
      {
        value: "2",
        label: "直送",
      },
    ];
  },
  methods: {
    onDelete(data, index) {
      console.log(data, index);
    },
    onEdit(data, index) {
      console.log(data, index);
    },
    handleSelectionChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="scss">
.primary_text {
  color: red;
}
</style>
