<template>
  <div class="mb-15 d-flex">
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
    })
  },
  components: {
    QrcodeVue,
  },

  watch: {
    telegramAuthState(newValue) {
      if (newValue === 'authorizationStateReady') {
        this.$ws.emit('events', JSON.stringify({
          event: 'CONNECT_MESSENGER',
          payload: {
            userEmail: this.user.data.email,
            messenger: {
              id: 1,
              messengerName: 'Telegram',
            }
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