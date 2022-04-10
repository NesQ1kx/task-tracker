<template>
  <div class="d-flex justify-center align-center otp">
    <div class="d-flex flex-column align-center content">
      <div class="headline mb-2">Подтверждение входа</div>
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
        await this.$store.dispatch(actions.CONFIRM_TWO_FA, { code: otpValue });
        await this.$store.dispatch(actions.GET_USER_DATA);
        this.$router.push({ name: "Dashboard" });
      } catch(e) {
        console.log(e);
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
