<template>
  <v-progress-circular
      v-if="isLoading"
      class="progress"
      indeterminate
      color="primary"
    ></v-progress-circular>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
    })
  },
  name: 'Progress',
}
</script>

<style>
  .progress {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>