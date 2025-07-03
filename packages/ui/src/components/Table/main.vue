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
    <el-table :data="formData.data" v-bind="$attrs" v-on="$listeners">
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
  },
  data() {
    return {
      // 获取默认选中展示的字段
      hasLocalStorage: typeof window !== "undefined" && window.localStorage,
      dragSelectOptions: [],
      selectedNames: [],
      tableTemplate: [],
    };
  },
  components: {
    RtDragSelect,
  },
  computed: {
    formData() {
      return {
        data: this.data,
      };
    },
  },
  watch: {
    tableList: {
      handler(newVal) {
        console.log(1111);
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
  },
};
</script>
<style>
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
</style>
