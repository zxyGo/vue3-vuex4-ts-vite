<template>
  <router-view class="app" :class="{ grey__mode: greyMode }" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '@/store/modules/app'

export default defineComponent({
  name: 'App',
  setup() {
    const greyMode = computed(() => appStore.greyMode)

    return {
      greyMode
    }
  }
})
</script>

<style lang="less">
.size {
  min-width: 992px;
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  background: #f5f7f9;
}
.grey__mode {
  filter: grayscale(100%);
}
</style>
