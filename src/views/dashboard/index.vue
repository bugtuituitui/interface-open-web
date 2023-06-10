<template>
  <div class="dashboard">
    <div class="cert-panel" v-loading="loading">
      <div class="tip">凭证信息</div>
      <div v-if="!loading && cert" class="cert-info">
        <div>key：{{ cert.apiKey }}</div>
        <div>secret：{{ cert.apiSecret }}</div>
        <div>
          {{
            !cert.unlimited
              ? "剩余调用次数：" + cert.totalCount
              : "不限调用次数"
          }}
        </div>
      </div>
      <div v-if="!loading && !cert">
        <el-button
          style="height: 44px; font-size: 18px"
          type="primary"
          @click="doGenerateCert()"
          :disabled="submitting"
          :loading="submitting"
          >生成凭证</el-button
        >
      </div>
    </div>

    <!-- <div class="invoke-panel" v-loading="invokeLoading">
      <div class="tip">调用记录</div>

      <div class="list"></div>
    </div> -->
  </div>
</template>

<script>
import { getCert, generateCert } from "@/api/cert.js";
import { getInvokeList } from "@/api/invoke.js";
export default {
  data() {
    return {
      loading: true,
      cert: null,
      submitting: false,
      invokeData: [],

      invokeLoading: false,
    };
  },

  created() {
    this.getCertData();
  },
  methods: {
    // 获取凭证信息
    getCertData() {
      this.loading = true;
      getCert({}).then((res) => {
        this.loading = false;
        this.cert = res.data;
      });
    },
    // 生成凭证
    doGenerateCert() {
      this.submitting = true;
      generateCert({}).then((res) => {
        this.submitting = false;
        if (res.code == 200) {
          this.$notify.success({
            title: "请求成功",
            message: "凭证生成成功，请刷新",
          });
        } else {
          this.$notify.error({
            title: "请求失败",
            message: res.message || "凭证生成失败",
          });
        }
      });
    },

    // 获取调用记录
    getInvokeData() {
      this.invokeLoading = true;
      // let data = {

      // };
      getInvokeList({});
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  box-sizing: border-box;
  padding: 12px 0;

  & > div {
    background: #f5f7fa;
    box-sizing: border-box;
    padding: 24px;
    margin: 12px;
  }
  .cert-panel {
    min-height: 40px;

    .cert-info {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      font-size: 16px;
      gap: 12px;
      color: orange;
      & > div {
        margin: 12px 0;
        background: #17978b;
        box-sizing: border-box;
        padding: 8px;
        border-radius: 4px;
      }
    }
  }
}
</style>
