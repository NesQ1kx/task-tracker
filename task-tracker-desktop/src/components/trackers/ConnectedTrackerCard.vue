<template>
  <v-card
    outlined
  >
    <div class="d-flex">
      <div>
        <v-card-title v-text="tracker.trackerName ">
          {{ tracker.trackerName }}
        </v-card-title>

        <v-card-subtitle class="grey--text">
          Дата подключения: {{ tracker.connectDate | date }}
        </v-card-subtitle>
      </div>

      <v-avatar class="ma-4" title>
        <v-img :src="require(`@/assets/images/trackers/${tracker.trackerName}.png`)"></v-img>
      </v-avatar>
    </div>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        small
        outlined
        color="error"
        @click="onRemoveClick"
      >
        <v-icon left>mdi-delete</v-icon>
        Удалить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    tracker: {
      type: Object,
      required: true,
    },
  },
  name: "ConnectedTrackerCard",
  methods: {
    onRemoveClick() {
      this.$emit('remove:click', this.tracker);
    }
  }

}
</script>

<style>

</style>