<template>
  <v-snackbar
      v-model="snackbar"
      timeout="2000"
      :color="snackbarState.status"
      rounded="lg"
    >
      {{ snackbarState.message }}
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SnackBar',
  data() {
    return {
      snackbar: false,
    };
  },
  computed: {
    ...mapState({
      snackbarState: state => state.snackbarState,
    }),
  },
  watch: {
    snackbarState: function (newValue) {
      newValue.message ? this.snackbar = true : this.snackbar = false;
    } 
  }
}
</script>

<style>

</style>