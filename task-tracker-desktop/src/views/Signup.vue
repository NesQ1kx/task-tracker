<template>
  <div class="login">
    <div class="content">
      <div class="headline">Регистрация</div>
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
          
          <v-btn
            color="primary"
            elevation="2"
            class="rounded-pill mt-3"
            block
          >Зарегистрироваться</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// import { Notification } from 'electron'
// const { Notification } = require('electron');

export default {
  name: 'Signup',
  data: () => ({
    show: false,
  }),
  methods: {
  },
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