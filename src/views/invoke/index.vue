<template>
  <div class="container">
    <json-filter>
      <el-form slot="form" :inline="true" @submit.native.prevent>
        <el-form-item label="用户名:">
          <el-input clearable v-model="param.username"></el-input>
        </el-form-item>
      </el-form>
      <div slot="buttons">
        <el-button @click="doSearch()" plain size="mini">查询 </el-button>
      </div>
    </json-filter>

    <json-table
      ref="myJsonTable"
      row-key="id"
      :table-heads="tableHeads"
      :loading="listLoading"
      :table-data="tableData"
      :page="page"
      :tableType="'none'"
      @current-change="currentPageChange"
      @size-change="sizeChange"
    >
      <template #createTime="iData">
        <span>{{
          iData.rowData.scope.row.createTime | formatDate("yyyy-MM-dd hh:mm:ss")
        }}</span>
      </template>
    </json-table>
  </div>
</template>
<script>
import JsonTable from "@/components/JsonTable";
import JsonFilter from "@/components/JsonFilter";
import { getInvokeList } from "@/api/invoke.js";

export default {
  components: {
    JsonFilter,
    JsonTable,
  },
  data() {
    return {
      tableHeads: [
        {
          prop: "invokeId",
          label: "编号",
        },
        {
          prop: "username",
          label: "用户名",
        },
        {
          prop: "apiName",
          label: "接口名称",
        },
        {
          prop: "apiPath",
          label: "接口地址",
        },
        {
          prop: "params",
          label: "请求参数",
        },
        {
          prop: "status",
          label: "状态",
        },
        {
          prop: "createTime",
          label: "请求时间",
          slot: true,
        },
      ],
      param: {
        username: null,
      },
      listLoading: false,
      tableData: [],

      page: {
        size: 15,
        current: 1,
        total: 10,
      },

      tableSelection: [],
    };
  },

  computed: {},
  created() {
    this.getTableData();
  },
  filters: {
    statusFilter(status) {
      return status ? "禁用" : "正常";
    },
  },
  methods: {
    // 获取表数据
    getTableData() {
      this.listLoading = true;
      getInvokeList({
        ...this.param,
        current: this.page.current,
        size: this.page.size,
      }).then((res) => {
        this.listLoading = false;
        if (res.code === 200) {
          this.tableData = res.data.list || [];
          this.page.total = res.data.total;
        } else {
          this.tableData = [];
          this.page.total = 0;
          this.$notify({
            title: "提示",
            message: res.message || "未获取到数据",
            type: "warning",
          });
        }
      });
    },

    // 当前页事件
    currentPageChange(current) {
      this.page.current = current;
      this.getTableData();
    },
    sizeChange(size) {
      // 判断更换后当前页是否有数据
      if (
        this.page.current > 1 &&
        (this.page.current - 1) * size > this.page.total
      ) {
        this.page.current = 1;
      }
      this.page.size = size;
      this.getTableData();
    },

    // 查询
    doSearch() {
      this.page.current = 1;
      this.getTableData();
    },

    //
    handleChange() {
      this.getTableData();
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
