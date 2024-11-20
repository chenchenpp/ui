<template>
  <RtTable :tableList="tableList" :data="tableData" :isTableDrag="true" :tableDragConfig="{
    isStorage: true,
    selectedNames: 'selectName',
    tableName: 'tableName',
    selectOptions: 'selectOptions'
  }">
    <template slot="drag-slot">
      <div class="search">
        <div class="search-title">搜索：</div>
        <el-input v-model="search" placeholder="请填写输入内容"></el-input>
      </div>
    </template>
  </RtTable>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      tableData: new Array(3).fill({
        storeNo: "1001",
        storeName: "闸北店",
        planReceptDate: "2022-10-00",
        planSaledate: "2022-10-00",
        dms: "100",
        promDms: "200",
        promDmsFlag: true,
        rtStatus: "1",
        rtStatusName: "已售罄",
        orderWay: "2",
        orderWayName: "手动订单",
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
        // 多字段表头配置
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
        {
          type: "isMult",
          children: [
            {
              label: "门店商品状态",
              prop: ["rtStatus", "rtStatusName"],
            },
            {
              label: "订货方式",
              prop: ["orderWay", "orderWayName"],
            },
          ],
          width: "120",
        },
      ],
    };
  },
};
</script>
<style>
.search{
    display: flex;
    align-items: center;
}
.search-title {
    width: 100px;
}
</style>
