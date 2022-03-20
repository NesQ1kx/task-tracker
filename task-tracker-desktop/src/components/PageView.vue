<template>
  <div class="view-container">
    <div class="text-h3 font-weight-bold">
      <div class="mb-3"> 
        <slot name="title"></slot>
      </div>
      <v-divider></v-divider>
    </div>
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
  display: grid;
  grid-template-rows: 62px 1fr;
}
</style>