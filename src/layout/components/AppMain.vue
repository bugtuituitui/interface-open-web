<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  position: absolute;
  height: calc(100% - 64px);
  width: 100%;
  border-top: #eaeaea;
  box-sizing: border-box;
  padding: 0 20px;
  padding-bottom: 0px;

  .list-view-layout {
    position: absolute;
    height: 100%;
    top: 0;
    left: 20px;
    right: 20px;
    bottom: 0;
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }
}

.fixed-header + .app-main {
  .list-view-layout {
    left: 20px;
    right: 20px;
    bottom: 0;
    width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
<style scoped>

</style>>
