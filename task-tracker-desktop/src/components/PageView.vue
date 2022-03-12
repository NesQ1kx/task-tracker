<template>
  <div class="view-container">
    <div class="text-h3 mb-3 font-weight-bold">
      <slot name="title"></slot>
    </div>
    <v-divider></v-divider>
      <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: "PageView",
}
</script>

<style lang="scss">
.view-container {
  padding: 76px 100px 0;
  height: 100%;
}
</style>