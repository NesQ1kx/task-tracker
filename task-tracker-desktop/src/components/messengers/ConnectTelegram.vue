<template>
  <div class="mb-10">
    <v-alert
      v-if="isTelegramConnected"
      color="warning"
      icon="mdi-alert"
      outlined
    >
    <div class="subtitle-2">Telegram уже подключен к приложению</div>
  </v-alert>
    <div class="d-flex" v-else>
      <qrcode-vue v-if="tgAuthLink" :value="tgAuthLink" size="115" />
      <div class="ml-10 grey--text darken-1">
        <ul>
          <li>
            <small class="caption">откройте мобильное приложение Telegram</small>
          </li>
          <li>
            <small class="caption">перейдтие в "Настройки"</small>
          </li>
          <li>
            <small class="caption">раздел "Устройства"</small>
          </li>
          <li>
            <small class="caption">нажмите "Подключить устройство"</small>
          </li>
          <li>
            <small class="caption">отсканируйте QR-код</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QrcodeVue from 'qrcode.vue'

export default {
  name: "ConnectTelegram",
  computed: {
    ...mapState({
      tgAuthLink: state => state.messengers.telegram.authLink,
      telegramAuthState: state => state.messengers.telegram.authState,
      user: state => state.user,
      fingerPrint: state => state.fingerPrint,
    }),
    isTelegramConnected() {
      return this.user && this.user.data.connectedMessengers.find(({ id }) => id === 1);
    }
  },
  components: {
    QrcodeVue,
  },

  watch: {
    telegramAuthState(newValue) {
      if (newValue === 'authorizationStateReady') {
        console.log(this.fingerPrint);
        this.$ws.emit('events', JSON.stringify({
          event: 'CONNECT_MESSENGER',
          payload: {
            fingerPrint: this.fingerPrint,
            userEmail: this.user.data.email,
            messenger: {
              id: 1,
              messengerName: 'Telegram',
            },
          },
        }));

        this.$emit('connect:success');
      }
    }
  }
}
</script>

<style>
div .col-md-8 {
  padding: 0;
}
</style>