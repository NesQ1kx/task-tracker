import { TelegramClient } from "@/utils/TelegramClient";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

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
        },
        'updateNewMessage': (event) => {
          this.$store.dispatch(actions.SET_TELEGRAM_MESSAGE, event.message);
        },
        'updateUser': (event) => {
          this.$store.dispatch(actions.SET_TELEGRAM_CACHED_USERS, event.user);
        },
      }
    };
  },
  methods: {
    startTelegram() {
      this.telegramClient = new TelegramClient();
      this.telegramClient.init();
  
      this.telegramClient.onUpdate(async (event) => {
        const eventType = event['@type'];
        if (eventType === 'updateAuthorizationState') {
          const type = event['authorization_state']['@type'];
          this.apiActions[type] && this.apiActions[type](event);
        } else {
          this.apiActions[eventType] && this.apiActions[eventType](event);
        }
      });

    },

    async destroyTelegram() {
      await this.telegramClient.sendRequest({
        '@type': 'destroy',
      });
    },
  }
}