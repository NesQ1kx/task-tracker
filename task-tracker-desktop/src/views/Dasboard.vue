<template>
  <PageView>
    <template #title>
      <span>Dashboard</span>
    </template>
  </PageView>
</template>

<script>
import { mapState } from "vuex";
import PageView from "@/components/PageView";

export default {
  name: "Dashboard",
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  components: {
    PageView,
  }
};
</script>

<style lang="scss">

</style>
