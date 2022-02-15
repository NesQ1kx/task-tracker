<template>
  <div class="login">
    <div class="content">
      <div class="headline">Регистрация</div>
      <validation-observer ref="validationObserver" v-slot="{ invalid }">
        <form class="form">
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
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
            name="FirstName"
            rules="required"
          >
            <v-text-field
              label="Имя"
              v-model="firstName"
              outlined
              required
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="LastName"
            rules="required"
          >
            <v-text-field
              label="Фамилия"
              v-model="lastName"
              outlined
              required
              :error-messages="errors"
            >
            </v-text-field>
          </validation-provider>

          <validation-observer>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              :rules="{
                min: 8,
                required: true,
                regex:
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_-])',
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

            <validation-provider
              v-slot="{ errors }"
              name="PasswordConfirm"
              rules="min:8|required|password:@Password"
            >
              <v-text-field
                label="Повтор пароля"
                outlined
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                v-model="confirmPassword"
                required
                :error-messages="errors"
              >
              </v-text-field>
            </validation-provider>
          </validation-observer>

          <v-btn
            color="primary"
            elevation="2"
            class="rounded-pill mt-3"
            :disabled="invalid"
            @click="handleSignupClick"
            block
          >
            Зарегистрироваться
          </v-btn>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { required, email, min, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

setInteractionMode("eager");

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Пароли не совпадают",
});

extend("required", {
  ...required,
  message: "Это поле обязательно",
});

extend("email", {
  ...email,
  message: "Неверный формат email",
});

extend("min", {
  ...min,
  message: "Минимальная длина пароля - {length} символов",
});

extend("regex", {
  ...regex,
  message: "Пароль не удовлетворяет условию",
});

export default {
  name: "Signup",
  data: () => ({
    show: false,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    snackbar: false,
  }),
  methods: {
    async handleSignupClick() {
      this.$refs.validationObserver.validate();

      try {
        this.$store.commit(mutations.SET_LOADING, { value: true });
        const response = await this.$http.post("auth/signup", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        });
        this.$store.commit(mutations.SET_LOADING, { value: false });
        localStorage.setItem("authToken", response.data.authToken);
        this.$router.push({ name: "Otp" });
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
    // eslint-disable-next-line
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
