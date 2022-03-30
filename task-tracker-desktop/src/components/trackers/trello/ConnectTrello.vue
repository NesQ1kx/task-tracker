<template>
  <div class="mb-10">
    <v-alert
      v-if="isJiraConnected"
      color="warning"
      icon="mdi-alert"
      outlined
    >
    <div class="subtitle-2">Trello уже подключен к приложению</div>
  </v-alert>
    <div v-else>
      <validation-observer ref="validationObserver" v-slot="{ invalid }">
        <form class="mt-2">
          <validation-provider
            v-slot="{ errors }"
            name="ApiKey"
            rules="required"
          >
            <v-text-field
              label="API ключ"
              dense
              v-model="apiKey"
              outlined
              required
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="ApiToken"
            rules="required"
          >
            <v-text-field
              label="API токен"
              outlined
              v-model="apiToken"
              required
              dense
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
          <small>Для генерации API ключа и API токена перейдите по </small>
          <small class="text-decoration-underline link" @click="onOpenLink">ссылке</small>
          <small>. В любой момент вы можете отозвать этот токен</small>

          <div class="mt-4">
            <v-btn
              small
              outlined
              :disabled="invalid"
              @click="connect"
            >
              Подключить
            </v-btn>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required } from "vee-validate/dist/rules";

const shell = require('electron').shell;

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Это поле обязательно",
});

export default {
  name: 'ConnectTrello',
  data: () => ({
    show: false,
    apiKey: '',
    apiToken: '',
  }),
  computed: {
    ...mapState({
      user: state => state.user,
      fingerPrint: state => state.fingerPrint,
    }),
    isJiraConnected() {
      return this.user && this.user.data.connectedTrackers.find(({ id }) => id === 2);
    }
  },
  methods: {
    onOpenLink() {
      const link = 'https://trello.com/app-key';
      shell.openExternal(link);
    },
    connect() {
      this.$refs.validationObserver.validate();
      this.$ws.emit('events', JSON.stringify({
        event: 'CONNECT_TRACKER',
        payload: {
          userEmail: this.user.data.email,
          tracker: {
            id: 2,
            trackerName: 'Trello',
            apiToken: this.apiToken,
            apiKey: this.apiKey,
          }
        }
      }));

      this.$emit('connect:success');
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  }
}
</script>

<style>
div .col-md-8 {
  padding: 0;
}

.link {
  cursor: pointer;
}
</style>