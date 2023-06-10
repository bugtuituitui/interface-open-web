<template>
  <div class="json-filter">
    <div class="json-filter__form">
      <slot name="form" />
    </div>
    <div class="json-filter__buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'JsonFilter',
  props: {
    code: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    getTitle() {
      let title = ''
      if (window.STAGE === 'create') {
        title = this.$route.meta.title
      } else {
        const list = store.getters.permission_routes
        list.forEach(l => {
          if (this.code === l.permCode) {
            title = l.permName
          }
        })
      }
      return title
    }
  }
}
</script>

<style scoped lang="scss">
  .json-filter {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 20px 0 20px;
    flex-shrink: 0;
    margin-bottom: 3px;

    &__form{
        flex: 1,
    }
        &__buttons{
        flex-shrink: 0;
        margin-top: 5px;
    }
  }

</style>
<style scoped>

</style>
