<template>
  <v-card
    outlined
  >
    <div class="d-flex">
      <div>
        <v-card-title v-text="messenger.messengerName ">
          {{ messenger.messengerName }}
        </v-card-title>

        <v-card-subtitle class="grey--text">
          Дата подключения: {{ messenger.connectDate | date }}
        </v-card-subtitle>
        <v-card-text>
          <div v-if="isConnectedOnCurrentDevice" class="d-flex align-center">
            <div style="width: 10px; height: 10px" class="success rounded-circle mr-3"></div>
            <div>Подключен на этом устройстве</div>
          </div>
          <div v-else class="d-flex align-center">
            <div style="width: 10px; height: 10px" class="error rounded-circle mr-3"></div>
            <div>Требуется подключение на устройстве</div>
          </div>
        </v-card-text>
      </div>

      <v-avatar class="ma-4" title>
        <v-img :src="require(`@/assets/images/messengers/${messenger.messengerName}.png`)"></v-img>
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
import { mapState } from 'vuex';

export default {
  props: {
    messenger: {
      type: Object,
      required: true,
    },
  },
  name: "ConnectedMessengerCard",
  computed: {
    ...mapState({
      fingerPrint: state => state.fingerPrint,
    }),
    isConnectedOnCurrentDevice() {
      return this.messenger.fingerPrints.some(fp => fp === this.fingerPrint);
    }
  },
  methods: {
    onRemoveClick() {
      this.$emit('remove:click', this.messenger);
    }
  }

}
</script>

<style>

</style>