<template>
  <div>
    <el-dialog
      title="接口测试"
      :visible.sync="isVisible"
      width="800px"
      @closed="handleClose"
      top="4vh"
    >
      <div class="info">
        <div>接口名称：{{ entity.apiName }}</div>
        <div>接口地址：{{ entity.apiPath }}</div>
        <div>接口参数：{{ entity.apiParams }}</div>
        <div>接口描述：{{ entity.apiDesc }}</div>

        <div>
          <div class="params">
            <span>请求参数：</span>
            <el-input
              style="margin: 12px 0"
              v-model="data.body"
              rows="8"
              type="textarea"
              resize="none"
            ></el-input>
          </div>
          <el-button
            type="primary"
            :disabled="submitting"
            :loading="submitting"
            @click="doSubmit"
            >测试</el-button
          >
        </div>
      </div>
      <div slot="footer">
        <el-button plain @click="hide()">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import visible from "@/mixins/edit-dialog";
import { invokeTest } from "@/api/api.js";
export default {
  data() {
    return {
      submitting: false,

      data: {
        api: null,
        body: null,
      },
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
        this.data.api = val.apiPath;
        this.data.body = val.apiParams;
      },
    },
  },
  methods: {
    doSubmit() {
      this.submitting = true;

      let data = {
        ...this.data,
      };
      invokeTest(data).then((res) => {
        this.submitting = false;
        if (res.code == 200) {
          this.$notify.success({
            title: "请求成功",
            message: res.data,
          });
        } else {
          this.$notify.error({
            title: "请求失败",
            message: "调用失败" || res.message,
          });
        }
      });
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
.info {
  & > div {
    margin: 12px;
    box-sizing: border-box;
    padding: 12px;
    background: #f5f7f8;
  }
}
</style>
