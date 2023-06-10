<template>
  <div class="list-view-table">
    <div class="json-table-view">
      <el-table
        ref="jsonTable"
        v-loading="loading"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :show-header="showHeader"
        :height="tableHeight"
        :row-key="rowKey"
        :header-cell-style="headerCellStyle"
        style="width: 100%; height: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          v-if="tableType === 'expand'"
          type="expand"
          align="center"
          header-align="center"
          width="50"
        >
          <template slot-scope="scope">
            <slot name="tableType" :rowData="{ scope }" />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="tableType !== 'none' && tableType == 'index'"
          :fixed="false"
          :label="'序号'"
          align="center"
          header-align="center"
          width="50"
        >
          <template
            v-if="page != null && tableType == 'index'"
            slot-scope="scope"
          >
            <span>{{
              page.limit * (page.current - 1) + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="tableType !== 'none'"
          :type="tableType"
          :fixed="false"
          align="center"
          header-align="center"
          width="50"
        />

        <el-table-column
          v-for="(col, index) in tableHeads"
          :key="index"
          :align="col.align || 'center'"
          :header-align="col.headerAlign || 'center'"
          :prop="col.prop"
          :fixed="col.fixed"
          :label="col.label"
          :width="col.width || ''"
          :show-overflow-tooltip="col.overflowTooltip === 'show'"
          :min-width="col.minWidth || ''"
        >
          <template slot-scope="scope">
            <span v-if="!col.slot">{{ scope.row[col.prop] }}</span>
            <slot v-else :name="col.prop" :rowData="{ scope }" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="page !== null" class="page">
      <el-pagination
        background
        :current-page.sync="page.current"
        :page-size="page.size"
        :page-sizes="[10, 15, 30, 50, 100]"
        :total="page.total"
        layout=" total, prev, pager, next, slot, sizes, jumper"
        @current-change="onCurrentPageChange"
        @size-change="onPageSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "JsonTable",
  props: {
    // 斑马线
    stripe: {
      type: Boolean,
      default: false,
    },
    // 边框
    border: {
      type: Boolean,
      default: true,
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 表头样式
    headerCellStyle: {
      type: Object,
      default: () => {
        return {
          background: "#f8f8f8",
          color: "#555",
          height: "40px",
        };
      },
    },

    // 表格第一列类型：
    // 1、selection：多选；
    // 2、expand：展开行；
    // 3、index：序号（default）
    // 4、none：什么也没有
    tableType: {
      type: String,
      default: "index",
    },

    // 表格多选的时候必填，一般都是批量删除所需的主键
    rowKey: {
      type: String,
      default: null,
    },
    selectionButtonName: {
      type: String,
      default: "批量操作",
    },
    selectionButtonType: {
      type: String,
      default: "danger",
    },
    // 表格列值配置列表，item 字段有：{ slot,prop,label,width,min-width,align(default center),header-align(default center),fixed }
    // 一般地最后一列fixed:'right'；表格多选的时候第一列fixed:'left'，操作列fixed:'right'。
    tableHeads: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    // 分页信息: { current, limit, total }
    page: {
      type: Object,
      default: null,
    },
    // 加载
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableHeight: 0,

      // 多选时候的相关数据
      selections: [],
    };
  },
  computed: {
    totalPages() {
      return this.page ? Math.ceil(this.page.total / this.page.limit) : 0;
    },
    //
    canCatchDel() {
      return true;
    },
  },

  watch: {
    tableHeight(val) {
      this.tableHeight =
        window.innerHeight - this.$refs.jsonTable.$el.offsetTop - 135;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function () {
        try {
          self.tableHeight =
            window.innerHeight - self.$refs.jsonTable.$el.offsetTop - 135;
        } catch (e) {
          console.warn(e);
        }
      };
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.tableHeight =
        window.innerHeight - this.$refs.jsonTable.$el.offsetTop - 135;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function () {
        try {
          self.tableHeight =
            window.innerHeight - self.$refs.jsonTable.$el.offsetTop - 135;
        } catch (e) {
          console.warn(e);
        }
      };
    });
    // this.$refs.table.$el.offsetTop：表格距离浏览器的高度
  },
  methods: {
    // 换页的事件
    onCurrentPageChange(e) {
      this.$emit("current-change", e);
    },
    onPageSizeChange(e) {
      this.$emit("size-change", e);
    },
    // 多选时候的相关方法
    handleSelectionChange(val) {
      // this.LOG.info(["表格多选对象 --- ", val]);
      const s = [];
      const key = this.rowKey;
      val.forEach((v) => {
        s.push(v[key]);
      });
      // this.LOG.info(["表格多选处理 --- ", s]);
      this.selections = s;
      this.$emit("selection-do", this.selections);
      this.$emit("selection-do-obj", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-view-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  // padding: 0 20px 5px 20px;
  padding: 0;
  .json-table-view {
    flex: 1;
    box-sizing: border-box;
  }

  .page {
    margin-top: 0px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: flex-end;
    .common-pagination__total-pages {
      margin-left: 18px;
      color: #797979;
    }
  }
}
</style>
<style scoped>
.list-view-table {
  height: calc(100% - 420px) !important;
}

>>> .el-pagination__total {
  margin-left: 18px;
}
>>> .el-pagination__jump {
  margin-left: 0;
}

</style>
