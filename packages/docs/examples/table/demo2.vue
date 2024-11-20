<template>
    <RtTable :tableList="tableList" :data="tableData"></RtTable>
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
          orderType: '1'
        }),
        tableList: [
          {
            label: "门店",
            prop: "storeNo",
            width: "100",
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
            label: "订单类型",
            prop: "orderType",
            width: "100",
            // 这里的type是对不同展示的处理，如枚举数据此值为map
            type: "select",
            // 枚举数据放入此处:每项格式为value，label
            options: [],
          },
          {
            label: "预计可消化日",
            prop: "planSaledate",
          },
        ],
      };
    },
    created() {
      const curIndex = this.tableList.findIndex(
        (item) => item.prop === "orderType"
      );
      // 如果是远程数据获取，可以处理数据添加到对应的字段map之中
      // 里面的选项是固定label和value，不可以改变
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

