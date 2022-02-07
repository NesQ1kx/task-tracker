<template>
  <div class="login">
    <div class="content">
      <div class="headline">Вход</div>
      <div class="form">
        <v-text-field
            label="Email"
            outlined
        ></v-text-field>
        <v-text-field
          label="Пароль"
          outlined
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
        ></v-text-field>
        <span class="caption mr-1">Нет акаунта?</span>
        <span>
          <router-link class="caption" :to="{ name: 'Signup' }">Регистрация</router-link>
        </span>
        <v-btn
          color="primary"
          elevation="2"
          class="rounded-pill mt-3"
          block
          @click="handleLoginClick"
        >Войти</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    show: false,
  }),
  methods: {
    hanldeSignupClick() {
      this.$router.push({ name: 'Signup' });
    },
    async handleLoginClick() {
      console.log(process.env);
      await this.$http.get('/posts')
    }
  }
}
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