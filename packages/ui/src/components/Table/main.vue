<template>
  <el-form v-if="formData" :model="formData" :ref="refName" class="rt-table">
    <div v-if="isTableDrag" class="rt-table-header">
      <slot name="drag-slot"></slot>
      <div class="rt-table-header_select">
        <rt-drag-select
          v-model="selectedNames"
          :options="dragSelectOptions"
          :config="tableDragConfig"
          @change="changeSelected"
          @dragEnd="dragEnd"
          placeholder="栏位显示隐藏"
        ></rt-drag-select>
      </div>
    </div>
    <el-table
      :data="formData.data"
      v-bind="$attrs"
      v-on="$listeners"
      :ref="tableRef"
      @selection-change="onSelectedTableChange"
      @select-all="onCheckedPageAll"
      @select="selectOne"
    >
      <template v-if="isAllSelected">
        <el-table-column label="" align="center" width="80">
          <template slot="header">
            <el-checkbox
              class="rt-table-check__all"
              v-model="allChecked"
              :indeterminate="allCheckedIndeterminate"
              :disabled="!formData.data.length"
              @change="onAllCheckedTable"
              >全选所有</el-checkbox
            >
          </template>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="80"
          reserve-selection
          label-class-name="rt-table-check__page"
        ></el-table-column>
      </template>
      <slot name="left"></slot>
      <template v-for="tableColum in tableTemplate">
        <!-- 多表头 -->
        <el-table-column
          v-if="tableColum.type === 'isMult' && tableColum.isShow"
          :key="tableColum.nanoId + 'mult'"
          :width="tableColum.width"
          v-bind="tableColum.tableColumnAttr"
        >
          <!-- 表头属性 -->
          <template v-slot:header>
            <template v-for="childItem in tableColum.children">
              <div v-if="childItem.isShow" :key="childItem.nanoId + 'header'">
                {{ childItem.label }}
              </div>
            </template>
          </template>
          <!-- 表数据 -->
          <template slot-scope="scope">
            <template v-for="childItem in tableColum.children">
              <div
                :key="childItem.nanoId + 'value'"
                v-if="childItem.isShow"
                :class="childItem.className && childItem.className(scope.row)"
              >
                <span
                  v-for="(propsKeys, propsIndex) in childItem.prop"
                  :key="propsIndex"
                  >{{ scope.row[propsKeys] || tableConfig.noDataFormat }}</span
                >
              </div>
            </template>
          </template>
        </el-table-column>
        <!-- 单表头 -->
        <el-table-column
          v-if="tableColum.type !== 'isMult' && tableColum.isShow"
          :key="tableColum.nanoId + 'single'"
          :label="tableColum.label"
          :width="tableColum.width"
          v-bind="tableColum.tableColumnAttr"
        >
          <template slot-scope="scope">
            <!-- 可编辑 -->
            <el-form-item
              v-if="scope.row.isEdit && tableColum.type != 'readOnly'"
              :prop="'data.' + scope.$index + '.' + tableColum.prop"
              :rules="tableColum.rules && tableColum.rules(scope.row, data)"
            >
              <el-input
                v-if="tableColum.type == 'input'"
                v-model="scope.row[tableColum.prop]"
                size="small"
                v-on="tableColum.typeConfigEvent"
                v-bind="tableColum.typeConfigAttr"
              ></el-input>
              <el-select
                v-if="tableColum.type == 'select'"
                v-model="scope.row[tableColum.prop]"
                size="small"
                v-on="tableColum.typeConfigEvent"
                v-bind="tableColum.typeConfigAttr"
              >
                <el-option
                  v-for="item in tableColum.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-date-picker
                v-if="tableColum.type == 'date'"
                v-model="scope.row[tableColum.prop]"
                v-on="tableColum.typeConfigEvent"
                v-bind="tableColum.typeConfigAttr"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 只读 -->
            <template v-else>
              <template v-if="scope.row[tableColum.prop]">
                <el-tooltip
                  v-if="tableColum.isTip"
                  effect="dark"
                  placement="top"
                >
                  <div class="contractNo-tip" slot="content">
                    {{
                      tableColum.type === "select"
                        ? mapFormat(tableColum, scope.row)
                        : scope.row[tableColum.prop]
                    }}
                  </div>
                  <!-- 兼容长内容 -->
                  <div
                    :style="{
                      width: tableColum.width
                        ? tableColum.width + 'px'
                        : '100%',
                    }"
                    :class="`${
                      tableColum.className && tableColum.className(scope.row)
                    } ${tableColum.width ? 'rt-table-column_cotent' : ''}`"
                  >
                    <div
                      v-if="tableColum.isHtml"
                      v-html="scope.row[tableColum.prop]"
                    ></div>

                    <!-- 字典映射 -->
                    <template v-else-if="tableColum.type === 'select'">
                      {{ mapFormat(tableColum, scope.row) }}
                    </template>
                    <!-- 跳转 -->
                    <template v-else-if="tableColum.isLink">
                      <el-link
                        type="primary"
                        @click="tableColum.onClick(scope.row, scope.$index)"
                        >{{ scope.row[tableColum.prop] }}</el-link
                      >
                    </template>
                    <!-- 其他情况 -->
                    <template v-else>{{ scope.row[tableColum.prop] }}</template>
                  </div>
                </el-tooltip>
                <div
                  v-else
                  :class="
                    tableColum.className && tableColum.className(scope.row)
                  "
                >
                  <div
                    v-if="tableColum.isHtml"
                    v-html="scope.row[tableColum.prop]"
                  ></div>

                  <template v-else-if="tableColum.type === 'select'">
                    {{ mapFormat(tableColum, scope.row) }}
                  </template>
                  <template v-else-if="tableColum.isLink">
                    <el-link
                      type="primary"
                      @click="tableColum.onClick(scope.row, scope.$index)"
                      >{{ scope.row[tableColum.prop] }}</el-link
                    >
                  </template>
                  <template v-else>
                    {{ scope.row[tableColum.prop] }}
                  </template>
                </div>
              </template>
              <template v-else>{{ tableConfig.noDataFormat }}</template>
            </template>
          </template>
        </el-table-column>
      </template>
      <slot name="right"></slot>
    </el-table>
  </el-form>
</template>
<script type="text/babel">
import RtDragSelect from "./dragSelect.vue";
import _ from "lodash";
export default {
  name: "RtTable",
  props: {
    refName: {
      type: String,
      default: "tableForm",
    },
    data: {
      type: Array,
    },
    tableRef: {
      type: String,
      default: "",
    },
    // 表头
    tableList: {
      type: Array,
    },
    // 是否可以拖拽
    isTableDrag: {
      type: Boolean,
      default: false,
    },
    // 如果可以拖拽 则配置拖拽规则
    tableDragConfig: {
      type: Object,
    },
    tableConfig: {
      type: Object,
      default: () => ({
        noDataFormat: "-",
      }),
    },
    // 是否需要表格全选功能
    isAllSelected: {
      type: Boolean,
      default: false,
    },
    // 是否全选整个表格
    allTableChecked: {
      type: Boolean,
      default: false,
    },
    // 全选的情况下，取消表格选中行
    cancelSelectedTableRow: {
      type: Array,
      default: () => [],
    },
    selectedTableRow: {
      type: Array,
      default: () => [],
    },
    // 表格选中行的唯一key名，用于匹配
    selectedKeyName: {
      type: String,
    },
    // 表格总数量
    tableTotal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // 获取默认选中展示的字段
      hasLocalStorage: typeof window !== "undefined" && window.localStorage,
      dragSelectOptions: [],
      selectedNames: [],
      tableTemplate: [],
      allCheckedIndeterminate: false,
    };
  },
  components: {
    RtDragSelect,
  },
  computed: {
    allChecked: {
      get() {
        return this.allTableChecked;
      },
      set(value) {
        this.$emit("update:allTableChecked", value);
      },
    },
    // 取消选中行
    cancelRow: {
      get() {
        return this.cancelSelectedTableRow;
      },
      set(value) {
        this.$emit("update:cancelSelectedTableRow", value);
      },
    },
    // 存储选中行
    selectedRow: {
      get() {
        return this.selectedTableRow;
      },
      set(value) {
        this.$emit("update:selectedTableRow", value);
      },
    },
    formData() {
      return {
        data: this.data,
      };
    },
  },
  watch: {
    tableList: {
      handler(newVal) {
        if (newVal.length) {
          // 如果是拖拽时
          if (this.isTableDrag) {
            this.dragSortOptionsHandle(newVal);
            this.dragSortSelectedHandle();
            this.dragSelectedHandle();
          } else {
            this.tableTemplate = _.cloneDeep(newVal);
            // 是否展示拖拽显示选择
            this.formatTableHandle();
          }
        } else {
          this.dragSelectOptions = [];
        }
      },
      deep: true,
      immediate: true,
    },
    data: {
      handler(value) {
        // 是否全选
        if (this.allChecked) {
          let that = this;
          value.forEach((row) => {
            const hasSelected = that.cancelRow.some(
              (item) => item[this.selectedKeyName] === row[this.selectedKeyName]
            );
            // 如果不在取消选中时，则自动选中
            if (!hasSelected) {
              this.$nextTick(() => {
                that.$refs.searchTableRef.toggleRowSelection(row, true);
              });
            }
          });
        }
      },
      deep: true,
    },
    //排除的选项
    cancelRow: {
      handler(value) {
        // 取消选中 = 总条数， 取消全选表格按钮
        if (value.length === this.tableTotal) {
          this.allChecked = false;
          this.allCheckedIndeterminate = false;
        }
        if (value.length === 0) {
          this.allChecked = true;
          this.allCheckedIndeterminate = false;
        }
      },
      deep: true,
    },
    //选中的选项  allCheck 为false时 此选项才数据才是真实的
    selectedRow: {
      handler(value) {
        if (!this.allChecked) {
          //如果选中数量等于总数  排除项设置为 空数组   自动触发 全选设置为 true
          if (value.length === this.tableTotal) {
            this.cancelRow = [];
          }
          //如果选中数量为 空
          if (value.length === 0) {
            this.allCheckedIndeterminate = false;
          }

          //如果选中数量大于0 小于总数  设置样式为横杠
          if (value.length < this.tableTotal && value.length > 0) {
            this.allCheckedIndeterminate = true;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    formatTableHandle() {
      for (let j = 0; j < this.tableTemplate.length; j++) {
        const firstItem = this.tableTemplate[j];
        // 多字段处理
        if (firstItem.type === "isMult") {
          firstItem.children.forEach((childItem, childIndex) => {
            // 添加唯一标识
            childItem.nanoId = new Date().getTime() + j + childIndex;
            // 字段是否展示
            childItem.isShow = childItem.isShow === void 0;
          });
          // 如果多字段中存在显示字段，则显示该列
          firstItem.isShow = firstItem.children.some(
            (childItem) => childItem.isShow
          );
        } else {
          // 普通字段是否显示
          firstItem.isShow = firstItem.isShow === void 0;
        }
        firstItem.nanoId = new Date().getTime() + j;
      }
    },
    dragSortOptionsHandle(tableList) {
      // 如果存储
      if (this.tableDragConfig && this.tableDragConfig.isStorage) {
        if (!this.tableDragConfig.selectOptions) {
          console.error(
            "tableDragConfig中isStorage为true时，需要指定selectOptions"
          );
          return;
        }

        const selectOptions = this.hasLocalStorage
          ? JSON.parse(
              localStorage?.getItem(this.tableDragConfig.selectOptions)
            )
          : [];
        if (selectOptions) {
          this.dragSelectOptions = selectOptions;
          return;
        }
      }
      // 如果没有值或者没有存储默认处理
      tableList.forEach((item) => {
        if (item.children) {
          this.dragSelectOptions.push(
            item.children.map((data) => ({
              label: data.label,
              value: data.prop[0],
            }))
          );
        } else {
          this.dragSelectOptions.push({
            label: item.label,
            value: item.prop,
          });
        }
      });
    },
    // 收集可拖拽排列字段选项
    dragSortSelectedHandle() {
      // 如果存储
      if (this.tableDragConfig && this.tableDragConfig.isStorage) {
        if (!this.tableDragConfig.selectedNames) {
          console.error(
            "tableDragConfig中isStorage为true时，需要🈯️定selectedNames"
          );
          return;
        }
        // 获取默认选中展示的字段
        const selectedVal = this.hasLocalStorage
          ? JSON.parse(localStorage.getItem(this.tableDragConfig.selectedNames))
          : [];
        if (selectedVal) {
          this.selectedNames = selectedVal;
          return;
        }
      }
      // 如果没有存储字段, 则默认展示所有字段
      this.selectedNames = [];
      this.dragSelectOptions.forEach((optionItem) => {
        if (Array.isArray(optionItem)) {
          optionItem.forEach((curOptionsItem) => {
            this.selectedNames.push(curOptionsItem.value);
          });
        } else {
          this.selectedNames.push(optionItem.value);
        }
      });
    },

    // 处理拖拽/选择
    dragSelectedHandle() {
      if (this.tableDragConfig && this.tableDragConfig.isStorage) {
        if (!this.tableDragConfig.tableName) {
          console.error(
            "tableDragConfig中isStorage为true时，需要🈯️定tableName"
          );
          return;
        }
        const tableTemplateData = this.hasLocalStorage
          ? JSON.parse(localStorage.getItem(this.tableDragConfig.tableName))
          : [];
        // 表格模板
        if (tableTemplateData) {
          this.tableTemplate = tableTemplateData;
          return;
        }
      }
      this.tableTemplate = _.cloneDeep(this.tableList);
      // 是否展示拖拽显示选择
      this.formatTableHandle();
    },
    setLocalStorage() {
      if (this.hasLocalStorage) {
        localStorage.setItem(
          this.tableDragConfig.selectedNames,
          JSON.stringify(this.selectedNames)
        );
        // 表格模板
        localStorage.setItem(
          this.tableDragConfig.tableName,
          JSON.stringify(this.tableTemplate)
        );
      }
    },
    // 当拖拽/排序改变时,处理字段
    changeSelected() {
      // 原始数据合集
      for (let j = 0; j < this.tableTemplate.length; j++) {
        const firstItem = this.tableTemplate[j];
        // 如果没有子集，说明是单字段
        if (firstItem.type === "isMult") {
          firstItem.children.forEach((childItem) => {
            childItem.isShow = this.selectedNames.includes(childItem.prop[0]);
          });
          firstItem.isShow = firstItem.children.some(
            (childItem) => childItem.isShow
          );
        } else {
          firstItem.isShow = this.selectedNames.includes(firstItem.prop);
        }
      }
      this.setLocalStorage();
    },
    getTableIndex(value) {
      for (let i = 0; i < this.tableTemplate.length; i++) {
        const item = this.tableTemplate[i];
        if (Array.isArray(value)) {
          if (item.type === "isMult") {
            const value = value[0].value;
            if (item.children.some((data) => data.prop.includes(value))) {
              return i;
            }
          }
        } else {
          if (item.type !== "isMult") {
            if (item.prop === value.value) {
              return i;
            }
          }
        }
      }
    },
    dragEnd({ newIndex, oldIndex }) {
      const curTableItem = this.tableTemplate[oldIndex];
      this.tableTemplate.splice(oldIndex, 1);
      this.$nextTick(() => {
        this.tableTemplate.splice(newIndex, 0, curTableItem);
        this.setLocalStorage();
      });
    },
    // 枚举数据格式化
    mapFormat(tableColum, rowData) {
      if (rowData[tableColum.prop] === void 0) {
        return "";
      }
      return tableColum.options.find(
        (item) => item.value === rowData[tableColum.prop]
      ).label;
    },
    /**
     * 表格全选处理
     */
    onAllCheckedTable() {
      this.$nextTick(() => {
        if (this.allChecked) {
          //全选的时候把 排除项 设置为 空数组
          this.cancelRow = [];
          this.formData.data.forEach((row) => {
            this.$refs[this.tableRef].toggleRowSelection(row, true);
          });
        } else {
          this.selectedRow = [];
          this.$refs[this.tableRef].clearSelection();
        }
      });
    },
    //当选择项发生变化时会触发该事件
    onSelectedTableChange(rows) {
      if (this.isAllSelected) {
        this.selectedRow = rows;
      }
      this.$emit("selectionChange", rows);
    },
    onCheckedPageAll(rows) {
      if (this.isAllSelected) {
        if (this.allChecked) {
          let that = this;
          that.allCheckedIndeterminate = true;
          let curTableLength = that.formData.data.length;
          // 判断勾选全选本页是选中还是取消
          if (rows.indexOf(that.formData.data[0]) !== -1) {
            // 选中
            for (let i = 0; i < curTableLength; i++) {
              for (let n = 0; n < that.cancelRow.length; n++) {
                if (
                  that.cancelRow[n][this.selectedKeyName] ===
                  that.formData.data[i][this.selectedKeyName]
                ) {
                  that.cancelRow.splice(n, 1);
                }
              }
            }
          } else {
            // 取消
            for (let j = 0; j < curTableLength; j++) {
              if (that.cancelRow.length !== 0) {
                if (that.cancelRow.indexOf(that.formData.data[j]) === -1) {
                  that.cancelRow.push(that.formData.data[j]);
                }
              } else {
                that.cancelRow.push(that.formData.data[j]);
              }
            }
          }
        }
      }
      this.$emit("selectAll", rows);
    },
    //判断选中状态
    judgeFunc(rows, row) {
      // 多选框样式改变
      this.allCheckedIndeterminate = true;
      // 判断勾选数据行是选中还是取消
      let selected = rows.length && rows.indexOf(row) !== -1;
      let lenFalse = this.cancelRow.length;
      if (selected) {
        // 选中
        if (lenFalse !== 0) {
          for (let i = 0; i < lenFalse; i++) {
            if (
              this.cancelRow[i][this.selectedKeyName] ===
              row[this.selectedKeyName]
            ) {
              this.cancelRow.splice(i, 1);
              break;
            }
          }
        }
      } else {
        // 取消
        this.cancelRow.push(row);
      }
    },
    selectOne(rows, row) {
      if (this.isAllSelected) {
        if (this.allChecked) {
          this.judgeFunc(rows, row);
        } else {
          this.allCheckedIndeterminate = true;
        }
      }
      this.$emit('select', rows, row)
    },
  },
};
</script>
<style lang="scss">
.rt-table-header {
  display: flex;
  align-items: center;
}
.rt-table-header_select {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.rt-table-column_cotent {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rt-table-check__all {
  .el-checkbox__label {
    width: 30px;
    white-space: break-spaces;
    padding-left: 4px;
    font-size: 12px;
    line-height: 14px;
  }
}
.rt-table-check__page {
  .el-checkbox {
    position: relative;
    display: flex;
    align-items: flex-end;
    &::after {
      content: "本页全选";
      width: 30px;
      white-space: break-spaces;
      font-size: 12px;
      line-height: 14px;
      padding-left: 4px;
    }
  }
}
</style>
