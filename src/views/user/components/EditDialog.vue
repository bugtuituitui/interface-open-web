<template>
  <div>
    <el-dialog :visible.sync="isVisible" width="400px" @closed="handleClose">
      <div>
        <el-form label-width="100px" ref="form" :model="form">
          <el-form-item label="用户名" prop="username" required>
            <el-input :disabled="disable" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" required>
            <el-input :disabled="disable" v-model="form.password"></el-input>
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
import { insertUser, updateUser } from "@/api/user.js";
export default {
  data() {
    return {
      data: [],
      form: {
        username: null,
        password: null,
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
          (this.type == "add" ? insertUser : updateUser)(data)
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
