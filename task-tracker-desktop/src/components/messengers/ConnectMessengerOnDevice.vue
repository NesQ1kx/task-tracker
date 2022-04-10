<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    v-if="messenger"
  >
    <v-card>
      <v-card-title class="grey lighten-3">
        <span>Подключить мессенджер на устройстве</span>
      </v-card-title>
        <v-card-text>
          <keep-alive>
            <component
              @connect:success="onSuccessConnect"
              :is="`Connect${messenger.messengerName}`" />
          </keep-alive>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeDialog"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ConnectTelegram from "@/components/messengers/ConnectTelegram";
import MessengerUnavailable from "@/components/messengers/MessengerUnavailable";

export default {
  name: "ConnectMessengerOnDevice",
  data() {
    return {
      dialog: false,
      messenger: null,
    };
  },
  methods: {
    open(messenger) {
      this.dialog = true;
      this.messenger = messenger;
    },

    closeDialog() {
      this.selectedMessenger = null;
      this.dialog = false;
    },

    onSuccessConnect() {
      this.closeDialog();
    },
  },
  components: {
    ConnectTelegram,
    MessengerUnavailable,
  },
}
</script>

<style lang="scss" scoped>
</style>