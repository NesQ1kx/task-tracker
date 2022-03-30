<template>
  <v-dialog
    v-if="tracker"
    v-model="dialog"
    max-width="390"
  >
    <v-card>
      <v-card-title>
        <div class="text-center">Вы действительно хотите удалить {{ tracker.trackerName }} из списка трекеров?</div>
      </v-card-title>

      <v-card-actions
        class="d-flex justify-center py-4"
      >
        <v-btn
          small
          color="success"
          class="mr-4"
          @click="removeTracker"
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
  name: 'RemoveTrackerDialog',
  props: {
    tracker: {
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
    removeTracker() {
      this.$ws.emit('events', JSON.stringify({
        event: 'REMOVE_TRACKER',
        payload: {
          tracker: this.tracker,
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