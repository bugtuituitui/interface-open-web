<template>
  <div>
    <el-dialog
      title="Excel导入"
      :visible.sync="isVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-width="90px" style="margin-top: 20px">
        <el-form-item label="选择文件：">
          <el-upload
            :action="url"
            :data="data"
            :headers="{ token: token }"
            :before-upload="beforeUploadFile"
            :with-credentials="true"
            :on-success="handleSuccess"
            :on-error="handleError"
            accept=".xlsx,.xls"
            :file-list="fileList"
          >
            <el-button type="primary">导入</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="导入模板：" v-if="template != ''">
          <el-button type="text" @click="downTemplate">下载导入模板</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isVisible = false">取 消</el-button>
      </div>

      <el-dialog
        width="65%"
        :title="`共${failList.length}条数据不合法`"
        :visible.sync="innerVisible"
        append-to-body
        top="10vh"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div class="table-view" v-if="tableConfig != null">
          <el-table :data="failList" border height="500" style="width: 100%">
            <el-table-column
              v-for="(col, index) in tableConfig"
              :key="index"
              :align="col.align || 'center'"
              :header-align="col.headerAlign || 'center'"
              :prop="col.prop"
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
        <div class="action-view">
          <el-button plain @click="innerDownload">下载失败原因</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import visible from "@/mixins/edit-dialog.js";
import { mapGetters } from "vuex";
export default {
  name: "ImportDialog",
  mixins: [visible],
  components: {},
  props: {
    url: {
      type: String,
    },
    template: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
    },
    formats: {
      type: Array,
    },
    tableConfig: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      fileList: [],

      innerVisible: false,
      downloadUrl: "",
      failList: [],
    };
  },
  watch: {},
  computed: {
    baseUrl() {
      return this.API_BASE_URL;
    },
    ...mapGetters(["token"]),
  },
  methods: {
    downTemplate() {
      window.open(this.template);
    },
    // 文件上传部分
    beforeUploadFile(file) {
      const extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        this.$message.warning({
          title: "警告",
          message: `文件大小不得超过5M`,
        });
        return false;
      }
      const formats = this.formats;
      let flag = false;
      if (formats.length > 0) {
        formats.forEach((f) => {
          if (f === extension) {
            flag = true;
          }
        });
      }
      if (!flag) {
        this.$message.warning({
          title: "警告",
          message: `只能上传后缀是 ${formats.join("、")} 的文件`,
        });
        return flag;
      }
      return true;
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      if (res.code == 200) {
        if (res.code == 200) {
          this.$message.success({
            title: "成功",
            message: "文件上传成功。",
          });
          this.$emit("update-data");
          this.isVisible = false;
        } else {
          const url = this.FILE_BASE_URL + res.tip;
          this.downloadUrl = url;
          this.failList = res.data || [];
          if (this.tableConfig == null) {
            this.$notify.warning({
              title: "解析完毕",
              dangerouslyUseHTMLString: true,
              message: `<p>部分数据不合法导致导入不成功。 <a href='${url}?attname=导入信息失败原因.xlsx' target="_blank"><strong>点击查看</strong></a></p>`,
              duration: 0,
            });
          } else {
            this.innerVisible = true;
          }
        }
      } else {
        this.$message.error({
          title: "失败",
          message: "文件上传失败," + res.message || "请严格按照模板导入",
        });
      }
      this.fileList = [];
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error({
        title: "错误",
        message: `文件上传失败`,
      });
    },

    // innerVisible
    innerDownload() {
      window.open(`${this.downloadUrl}?attname=导入信息失败原因.xlsx`);
    },
  },
};
</script>

<style scoped>
.form {
  margin-top: 20px;
}

.table-view {
  padding: 20px;
}
.action-view {
  padding: 0 20px 20px 20px;
  display: flex;
  justify-content: flex-end;
}
</style>

