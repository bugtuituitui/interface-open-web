<template>
  <div class="container">
    <json-filter>
      <el-form slot="form" :inline="true" @submit.native.prevent>
        <el-form-item label="接口名称:">
          <el-input clearable v-model="param.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="buttons">
        <el-button @click="doSearch()" plain size="mini">查询 </el-button>
        <el-button type="primary" @click="doAdd()" size="mini">添加</el-button>
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

      <template #operations="iData">
        <el-button
          type="text"
          @click="doEdit(iData.rowData.scope.row)"
          :disabled="iData.rowData.scope.row.status"
          >编辑
        </el-button>
        <el-button
          type="text"
          @click="doDelete(iData.rowData.scope.row)"
          :disabled="iData.rowData.scope.row.status"
          >删除
        </el-button>

        <el-button
          type="text"
          @click="doInvoke(iData.rowData.scope.row)"
          :disabled="iData.rowData.scope.row.status"
          >测试
        </el-button>
      </template>
    </json-table>

    <edit-dialog
      :entity="chooseEntity"
      :typeList="typeData"
      @update-data="getTableData"
      v-model="dialogShow"
    />

    <invoke-dialog v-model="invokeDialogShow" :entity="chooseEntity" />
  </div>
</template>
<script>
import JsonTable from "@/components/JsonTable";
import JsonFilter from "@/components/JsonFilter";
import { getApiList } from "@/api/api.js";
import EditDialog from "./components/EditDialog.vue";
import InvokeDialog from "./components/InvokeDialog.vue";
export default {
  components: {
    JsonFilter,
    JsonTable,
    EditDialog,
    InvokeDialog,
  },
  data() {
    return {
      tableHeads: [
        {
          prop: "id",
          label: "编号",
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
          prop: "apiParams",
          label: "接口参数",
        },
        {
          prop: "apiDesc",
          label: "接口描述",
        },

        {
          prop: "createTime",
          label: "创建日期",
          slot: true,
        },

        {
          prop: "operations",
          label: "操作",
          width: 180,
          slot: true,
        },
      ],
      param: {
        name: null,
      },
      listLoading: false,
      dialogShow: false,
      chooseEntity: {},
      tableData: [],
      typeData: [],
      invokeDialogShow: false,
      page: {
        size: 15,
        current: 1,
        total: 10,
      },

      tableSelection: [],
    };
  },

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
      getApiList({
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

    // 添加用户
    doAdd() {
      this.chooseEntity = {};
      this.dialogShow = true;
    },

    // 编辑用户
    doEdit(e) {
      this.chooseEntity = { ...e };
      this.dialogShow = true;
    },

    // 测试
    doInvoke(e) {
      this.chooseEntity = { ...e };
      this.invokeDialogShow = true;
    },

    // 删除用户
    doDelete(e) {
      this.$confirm(`确定删除？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action !== "confirm") {
            done();
            return;
          }
          deleteItem({ itemId: e.itemId })
            .then((result) => {
              if (result.code == 200) {
                this.$notify({
                  title: "成功",
                  message: "操作成功",
                  type: "success",
                });
                this.getTableData();
              } else {
                this.$notify.error({
                  title: "提示",
                  message: res.message || "操作失败",
                });
              }
              done();
            })
            .catch((error) => {
              this.$notify.error({
                title: "失败",
                message: "请求发生错误， 请重试",
                type: "error",
              });
              done();
            });
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
}
</style>
