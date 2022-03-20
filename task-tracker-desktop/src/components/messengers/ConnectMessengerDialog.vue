<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title class="grey lighten-3">
        <span>Подключение мессенджеров</span>
      </v-card-title>
        <v-stepper
          v-model="step"
          vertical
        >

          <v-stepper-step
            :complete="step > 1"
            step="1"
          >
            Выбор мессенджера
            <small style="height: 12px">{{ selectedMessenger && selectedMessenger.name }}</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <div class="select-messenger-wrapper pa-2 mb-4 ">
              <div
                v-for="(item, index) in availableMessengers"
                :key="index" 
              >
                <v-hover v-slot="{ hover }">
                  <div
                    :class="{ 'grey lighten-3': selectedMessenger && selectedMessenger.id === item.id, 'grey lighten-5': hover }"
                    class="messenger-card rounded-lg pa-2 d-flex flex-column align-center elevation-2"
                    @click="onSelectMessenger(item.id)"
                  >
                    <img :src="require(`@/assets/images/messengers/${item.name}.png`)" alt="" width="48" class="mb-2">
                    <div class="body-2">{{ item.name }}</div>
                  </div>
                </v-hover>
              </div>
            </div>
            <v-btn
              color="secondary"
              class="ml-2 mb-1"
              @click="step = 2"
              small
              :disabled="!selectedMessenger"
            >
              Далее
            </v-btn>
          </v-stepper-content>

          <v-stepper-step
            :complete="step > 2"
            step="2"
          >
            Аутентификация
          </v-stepper-step>
          <v-stepper-content step="2">
            <keep-alive>
              <component
                @connect:success="onSuccessConnect"
                v-if="selectedMessenger && step === 2"
                :is="selectedMessenger.isAvailable ? selectedMessenger.connectComponentName : 'MessengerUnavailable'" />
            </keep-alive>
           <div class="mb-1">
              <v-btn
                small
                color="secondary"
                @click="step -= 1"
              >
                Назад
              </v-btn>
           </div>
          </v-stepper-content>

        </v-stepper>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="closeDialog"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { AVAILABLE_MESSENGERS } from "@/utils/constants";
import ConnectTelegram from "@/components/messengers/ConnectTelegram";
import MessengerUnavailable from "@/components/messengers/MessengerUnavailable";

export default {
  name: "ConnectMessengerDialog",
  data() {
    return {
      dialog: false,
      step: 1,
      availableMessengers: AVAILABLE_MESSENGERS,
      selectedMessenger: null,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },

    onSelectMessenger(id) {
      this.selectedMessenger = this.availableMessengers.find(item => item.id === id);
    },

    closeDialog() {
      this.selectedMessenger = null;
      this.step = 1;
      this.dialog = false;
    },

    onSuccessConnect() {
      this.closeDialog();
    },

    handleFinish() {
      this.$ws.emit('events', JSON.stringify({ event: 'CONNECT_MESSENGER' }));
    }
  },
  components: {
    ConnectTelegram,
    MessengerUnavailable,
  },
}
</script>

<style lang="scss" scoped>
.select-messenger-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  .messenger-card {
    cursor: pointer;
    transition: all  .1s linear;
  }
}
</style>