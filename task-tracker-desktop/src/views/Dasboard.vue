<template>
  <div>
    Dashboard
    <span>{{ user.data.email }}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
};
</script>

<style></style>
