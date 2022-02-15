<template>
  <div class="login">
    <div class="content">
      <div class="headline">Вход</div>
      <validation-observer ref="validationObserver" v-slot="{ invalid }">
        <form class="form">
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required"
          >
            <v-text-field
              label="Email"
              v-model="email"
              outlined
              required
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Password"
            :rules="{
              required: true,
            }"
          >
            <v-text-field
              label="Пароль"
              outlined
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              v-model="password"
              required
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>
          <span class="caption mr-1">Нет акаунта?</span>
          <span>
            <router-link class="caption" :to="{ name: 'Signup' }"
              >Регистрация</router-link
            >
          </span>
          <v-btn
            color="primary"
            elevation="2"
            class="rounded-pill mt-3"
            block
            :disabled="invalid"
            @click="handleLoginClick"
            >Войти</v-btn
          >
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

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
  name: "Login",
  data: () => ({
    show: false,
    email: "",
    password: "",
  }),
  methods: {
    async handleLoginClick() {
      this.$refs.validationObserver.validate();

      try {
        this.$store.commit(mutations.SET_LOADING, { value: true });
        const response = await this.$http.post("auth/signin", {
          email: this.email,
          password: this.password,
        });
        this.$store.commit(mutations.SET_LOADING, { value: false });
        localStorage.setItem("authToken", response.data.authToken);
        this.$store.dispatch(actions.GET_USER_DATA);
        this.$router.push({ name: "Dashboard" });
      } catch (e) {
        this.$store.dispatch(actions.SET_SNACKBAR, {
          status: "error",
          code: e.response.data.statusCode,
        });
        this.$store.commit(mutations.SET_LOADING, { value: false });
      }
    },
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form {
      width: 350px;
    }
  }
}
</style>
