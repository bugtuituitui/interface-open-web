<template>
  <div>
    <el-dialog :visible.sync="isVisible" width="400px" @closed="handleClose">
      <div>
        <el-form label-width="100px" ref="form" :model="form">
          <el-form-item label="用户名" prop="username" required>
            <el-input :disabled="disable" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="key" prop="apiKey" required>
            <el-input :disabled="disable" v-model="form.apiKey"></el-input>
          </el-form-item>
          <el-form-item label="secret" prop="apiSecret" required>
            <el-input :disabled="disable" v-model="form.apiSecret"></el-input>
          </el-form-item>

          <el-form-item label="可用次数" prop="totalCount" required>
            <el-input v-model="form.totalCount"></el-input>
          </el-form-item>

          <el-form-item label="次数限制" prop="unlimited" required>
            <el-select v-model="form.unlimited">
              <el-option
                v-for="(item, index) in status"
                :key="index"
                :value="item.value"
                >{{ item.label }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button plain @click="hide()">取消</el-button>
        <el-button
          type="primary"
          :disabled="submitting"
          :loading="submitting"
          @click="doSubmit"
          >{{ type == "add" ? "添加" : "修改" }}</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import visible from "@/mixins/edit-dialog";
import { insertCert, updateCert } from "@/api/cert.js";
export default {
  data() {
    return {
      data: [],
      form: {
        username: null,
        apiKey: null,
        apiSecret: null,
        totalCount: null,
        unlimited: null,
      },

      submitting: false,
      type: "add",

      status: [
        {
          value: false,
          label: "有限制",
        },
        {
          value: true,
          label: "无限制",
        },
      ],
    };
  },
  mixins: [visible],
  props: {
    entity: Object,
  },
  watch: {
    entity: {
      immediate: true,
      handler: function (val) {
        if (val && val.certId) {
          this.type = "edit";
          this.form = {
            ...val,
          };
        } else {
          this.type = "add";
        }
      },
    },
  },
  computed: {
    disable() {
      return this.type != "add";
    },
  },
  methods: {
    doSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitting = true;
          let data = {
            ...this.form,
          };
          (this.type == "add" ? insertCert : updateCert)(data)
            .then((res) => {
              this.submitting = false;
              if (res.code == 200) {
                this.$emit("update-data");
                this.hide();
                // 请求成功
              } else {
                this.$notify.error({
                  title: "操作提示",
                  message: res.message || "操作失败",
                });
              }
            })
            .catch((err) => {
              this.submitting = false;
              this.$notify.error({
                title: "操作提示",
                message: res.message || "操作失败",
              });
            });
        } else {
          this.$message({ type: "warning", message: "表单不合法" });
        }
      });
    },

    handleClose() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
<style lang="scss" scoped>
</style>
