<template>
  <div>
    <PageView>
      <template #title>
        <span>Подключенные трекеры</span>
      </template>
      <template #content>
        <transition name="fade">
          <div v-if="isLoaded">
            <div v-if="connectedTrackers.length">
              <v-btn
                small
                color="primary"
                class="mt-4"
                @click="openDialog"
              >
                <v-icon left>mdi-connection</v-icon>
                Подключить
              </v-btn>
              <div class="cards-wrapper mt-10">
                <div v-for="(tracker, index) in connectedTrackers" :key="index">
                  <ConnectedTrackerCard :tracker="tracker" @remove:click="onRemoveTrackerClick" />
                </div>
              </div>
            </div>
            <div v-else class="empty d-flex justify-center align-center">
              <v-alert
                color="primary"
                icon="mdi-alert"
                outlined
                style="margin-top: 20%"
              >
                <div>Вы не подключили ни одного трекера
                  <v-btn
                    small
                    color="primary"
                    class="ml-4"
                    @click="openDialog"
                  >
                    <v-icon left>mdi-connection</v-icon>
                    Подключить
                  </v-btn>
                </div>
              </v-alert>
            </div>
          </div>
        </transition>
      </template>
    </PageView>
    <ConnectTrackerDialog ref="connectTrackerDialog" />
    <RemoveTrackerDialog ref="removeTrackerDialog" :tracker="trackerToRemove" />
  </div>
</template>

<script>
import PageView from "@/components/PageView";
import { mapState } from 'vuex';
import ConnectTrackerDialog from "@/components/trackers/ConnectTrackerDialog";
import ConnectedTrackerCard from "@/components/trackers/ConnectedTrackerCard";
import RemoveTrackerDialog from "@/components/trackers/RemoveTrackerDialog";


export default {
  name: 'ConnectedTrackers',
  data() {
    return {
      trackerToRemove: null,
      isLoaded: false,
    };
  },
  computed: {
    ...mapState({
      connectedTrackers: state => state.user.data.connectedTrackers,
    })
  },
  methods: {
    async openDialog() {
      this.$refs.connectTrackerDialog.open();
    },

    onRemoveTrackerClick(tracker) {
      this.trackerToRemove = tracker;
      this.$refs.removeTrackerDialog.open();
    }
  },
  components: {
    PageView,
    ConnectTrackerDialog,
    ConnectedTrackerCard,
    RemoveTrackerDialog
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isLoaded = true;
    });
  }
}
</script>

<style lang="scss">
.cards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>