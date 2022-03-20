<template>
  <div class="mb-10">
    <v-alert
      v-if="isJiraConnected"
      color="warning"
      icon="mdi-alert"
      outlined
    >
    <div class="subtitle-2">Telegram уже подключен к приложению</div>
  </v-alert>
    <div class="d-flex" v-else>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ConnectJira',
  computed: {
    ...mapState({
      user: state => state.user,
      fingerPrint: state => state.fingerPrint,
    }),
    isJiraConnected() {
      return this.user && this.user.data.connectedTrackers.find(({ id }) => id === 1);
    }
  },
}
</script>

<style>
div .col-md-8 {
  padding: 0;
}
</style>