<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
  >
    <v-card>
      <v-card-title class="grey lighten-3">
        <span>Подключение трекеров</span>
      </v-card-title>
        <v-stepper
          v-model="step"
          vertical
        >

          <v-stepper-step
            :complete="step > 1"
            step="1"
          >
            Выбор трекера
            <small style="height: 12px">{{ selectedTracker && selectedTracker.name }}</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <div class="select-tracker-wrapper pa-2 mb-4 ">
              <div
                v-for="(item, index) in availableTrackers"
                :key="index" 
              >
                <v-hover v-slot="{ hover }">
                  <div
                    :class="{ 'grey lighten-3': selectedTracker && selectedTracker.id === item.id, 'grey lighten-5': hover }"
                    class="tracker-card rounded-lg pa-2 d-flex flex-column align-center elevation-2"
                    @click="onSelectTracker(item.id)"
                  >
                    <img :src="require(`@/assets/images/trackers/${item.name}.png`)" alt="" width="48" class="mb-2">
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
              :disabled="!selectedTracker"
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
                v-if="selectedTracker && step === 2"
                :is="selectedTracker.isAvailable ? selectedTracker.connectComponentName : 'TrackerUnavailable'" />
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
import { AVAILABLE_TRACKERS } from "@/utils/constants";
import ConnectJira from "@/components/trackers/jira/ConnectJira";
import ConnectTrello from "@/components/trackers/trello/ConnectTrello";
import TrackerUnavailable from "@/components/trackers/TrackerUnavailable";

export default {
  name: "ConnectTrackerDialog",
  data() {
    return {
      dialog: false,
      step: 1,
      availableTrackers: AVAILABLE_TRACKERS,
      selectedTracker: null,
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },

    onSelectTracker(id) {
      this.selectedTracker = this.availableTrackers.find(item => item.id === id);
    },

    closeDialog() {
      this.selectedTracker = null;
      this.step = 1;
      this.dialog = false;
    },

    onSuccessConnect() {
      this.closeDialog();
    },

    handleFinish() {
      this.$ws.emit('events', JSON.stringify({ event: 'CONNECT_TRACKER' }));
    }
  },
  components: {
    ConnectJira,
    TrackerUnavailable,
    ConnectTrello
  },
}
</script>

<style lang="scss" scoped>
.select-tracker-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;

  .tracker-card {
    cursor: pointer;
    transition: all  .1s linear;
  }
}
</style>