<template>
  <el-select
    class="rt-drag-select"
    v-model="seletedOptions"
    collapse-tags
    multiple
    clearable
    v-bind="$attrs"
    @change="changeSelect"
  >
    <draggable animation="1000" @end="dragEndHandle">
      <transition-group>
        <template v-for="(item, itemIndex) in options">
          <div :key="JSON.stringify(item)" v-if="Array.isArray(item)">
            <el-option
              v-for="(childItem, childItemIndex) in item"
              :key="itemIndex + '-' + childItemIndex"
              :label="childItem.label"
              :value="childItem.value"
            ></el-option>
          </div>
          <el-option
            v-else
            :key="itemIndex"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </template>
      </transition-group>
    </draggable>
  </el-select>
</template>
<script>
import draggable from "vuedraggable";
import _ from "lodash";
export default {
  name: "RtDragSelect",
  props: {
    options: {
      type: Array,
    },
    value: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
    },
  },
  components: {
    draggable,
  },
  data() {
    return {};
  },
  computed: {
    seletedOptions: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      },
    },
  },
  methods: {
    changeSelect() {
      this.$emit("change");
    },
    dragEndHandle(event) {
      const { newIndex, oldIndex } = event;

      // 拖拽的字段
      const curField = this.options[oldIndex];
      if (this.config && this.config.isStorage) {
        const copyAttrOptions = _.cloneDeep(this.options);
        // 删除当前字段
        copyAttrOptions.splice(oldIndex, 1);

        // 插入到最新的位置
        copyAttrOptions.splice(newIndex, 0, curField);
        if (localStorage) {
          localStorage.setItem(
            this.config.selectOptions,
            JSON.stringify(copyAttrOptions)
          );
        }

      }
      this.$emit("dragEnd", { newIndex, oldIndex });
    },
  },
};
</script>
