<template>
  <div class="mb-10">
    <v-alert
      v-if="isJiraConnected"
      color="warning"
      icon="mdi-alert"
      outlined
    >
    <div class="subtitle-2">Jira уже подключен к приложению</div>
  </v-alert>
    <div v-else>
      <validation-observer ref="validationObserver" v-slot="{ invalid }">
        <form class="mt-2">
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
          >
            <v-text-field
              label="Atlassian Email"
              v-model="email"
              outlined
              required
              dense
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="PrjectLink"
            rules="required"
          >
            <v-text-field
              label="Ссылка на проект Jira"
              dense
              v-model="projectLink"
              outlined
              required
              hint="***.atlassian.com"
              persistent-hint
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
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              v-model="apiToken"
              required
              dense
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
          <small>Для генерации API токена перейдите по </small>
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
import { required, email } from "vee-validate/dist/rules";

const shell = require('electron').shell;

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Это поле обязательно",
});

extend("email", {
  ...email,
  message: "Неверный формат email",
});

export default {
  name: 'ConnectJira',
  data: () => ({
    show: false,
    email: '',
    projectLink: '',
    apiToken: '',
  }),
  computed: {
    ...mapState({
      user: state => state.user,
      fingerPrint: state => state.fingerPrint,
    }),
    isJiraConnected() {
      return this.user && this.user.data.connectedTrackers.find(({ id }) => id === 1);
    }
  },
  methods: {
    onOpenLink() {
      const link = 'https://id.atlassian.com/manage-profile/security/api-tokens';
      shell.openExternal(link);
    },
    connect() {
      this.$refs.validationObserver.validate();
      this.$ws.emit('events', JSON.stringify({
        event: 'CONNECT_TRACKER',
        payload: {
          userEmail: this.user.data.email,
          tracker: {
            id: 1,
            trackerName: 'Jira',
            apiToken: this.apiToken,
            attlasianEmail: this.email,
            projectLink: this.projectLink,
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