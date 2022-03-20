<template>
  <v-dialog
    v-if="messenger"
    v-model="dialog"
    max-width="400"
  >
    <v-card>
      <v-card-title>
        <div class="text-center">Вы действительно хотите удалить {{ messenger.messengerName }} из списка мессенджров?</div>
      </v-card-title>

      <v-card-actions
        class="d-flex justify-center py-4"
      >
        <v-btn
          small
          color="success"
          class="mr-4"
          @click="removeMessenger"
        >
          Да
        </v-btn>
        <v-btn
          small
          color="error"
          @click="close"
        >
          Нет
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'RemoveMessengerDialog',
  props: {
    messenger: {
      type: Object,
    }
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
    }),
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    removeMessenger() {
      this.$ws.emit('events', JSON.stringify({
        event: 'REMOVE_MESSENGER',
        payload: {
          messenger: this.messenger,
          userEmail: this.user.data.email,
        }
      }));
      this.close();
    },
  }
}
</script>

<style>

</style>