<template>
  <v-dialog
    v-model="dialog"
    max-width="390"
  >
    <v-card>
      <v-card-title>
        <div class="text-center">Двухфакторная аутентификация</div>
      </v-card-title>
      <v-card-text>
        <div class="text-center">На вашу почту был выслан код подтверждения. Введите его ниже</div>
         <v-otp-input
          length="6"
          @finish="onCompleteOtp"
        ></v-otp-input>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import actions from '@/store/actions';

export default {
  name: 'ToggleTwoFaDialog',
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async onCompleteOtp(code) {
      try {
        await this.$store.dispatch(actions.CONFIRM_TWO_FA, { code });
        this.$emit('two-fa:success');
        this.close();
      } catch(e) {
        this.$emit('two-fa:error');
      }
    }
  }, 
}
</script>

<style>

</style>