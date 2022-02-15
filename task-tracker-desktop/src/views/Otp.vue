<template>
  <div class="d-flex justify-center align-center otp">
    <div class="d-flex flex-column align-center content">
      <div class="headline mb-2">Подтверждение регистрации</div>
      <div class="mb-3 subtitle-2 text-center">
        На вашу почту был выслан код подтверждения. Введите его ниже
      </div>
      <div>
        <v-otp-input
          :disabled="disabled"
          length="6"
          @finish="onCompleteOtp"
        ></v-otp-input>
      </div>
    </div>
  </div>
</template>

<script>
import mutations from "@/store/mutations";
import actions from "@/store/actions";

export default {
  name: "Otp",
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    async onCompleteOtp(otpValue) {
      try {
        this.$store.commit(mutations.SET_LOADING, { value: true });
        this.disabled = true;
        const response = await this.$http.post("auth/confirm", {
          code: otpValue,
        });
        this.$store.dispatch(actions.SET_SNACKBAR, {
          status: "success",
          code: response.data.statusCode,
        });
        this.$store.commit(mutations.SET_LOADING, { value: false });
        await this.$store.dispatch(actions.GET_USER_DATA);
        this.$router.push({ name: "Dashboard" });
      } catch (e) {
        console.log(e);
        this.$store.commit(mutations.SET_LOADING, { value: false });
        this.disabled = false;
        this.$store.dispatch(actions.SET_SNACKBAR, {
          status: "error",
          code: e.response.data.statusCode,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.otp {
  height: 100%;

  .content {
    width: 350px;
  }
}
</style>
