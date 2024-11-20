<template>
  <RtTable :tableList="tableList" :data="tableData"></RtTable>
</template>
<script>
export default {
  data() {
    return {
      tableData: new Array(3).fill({
        storeNo: "1001",
        storeName:
          "闸北店fdsafaffasafds闸北店fdsafaffasafds闸北店fdsafaffasafds",
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
          isTip: true,
          width: "200",
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
};
</script>
