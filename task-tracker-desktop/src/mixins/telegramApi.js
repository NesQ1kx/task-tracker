import { TelegramClient } from "@/utils/TelegramClient";
import mutations from "@/store/mutations";

export const telegramApi = {
  data() {
    return {
      telegramClient: null,
      apiActions: {
        'authorizationStateWaitEncryptionKey': async () => {
          await this.telegramClient.sendRequest({
            '@type': 'checkDatabaseEncryptionKey',
          });
        },
        'authorizationStateWaitPhoneNumber': async () => {
          await this.telegramClient.sendRequest({
            '@type': 'requestQrCodeAuthentication',
            other_user_ids: [],
          });
        },
        'authorizationStateWaitOtherDeviceConfirmation': (event) => {
          this.$store.commit(mutations.SET_TELEGRAM_AUTH_LINK, event.authorization_state.link);
        },
        'authorizationStateReady': () => {
          this.$store.commit(mutations.SET_TELEGRAM_AUTH_STATE, 'authorizationStateReady');
        }
      }
    };
  },
  methods: {
    startTelegram() {
      this.telegramClient = new TelegramClient();
      this.telegramClient.init();
  
      this.telegramClient.onUpdate(async (event) => {
          console.log(event);
  
        if (event['@type'] === 'updateAuthorizationState') {
          console.log(event);
          const type = event['authorization_state']['@type'];
          this.apiActions[type] && this.apiActions[type](event);
        }
      });
    }
  }
}