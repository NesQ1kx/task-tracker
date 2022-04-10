<template>
  <div>
    <PageView>
      <template #title>
        <span>Подключенные мессенджеры</span>
      </template>
      <template #content>
        <transition name="fade">
          <div v-if="isLoaded">
            <div v-if="connectedMessengers.length">
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
                <div v-for="(messenger, index) in connectedMessengers" :key="index">
                  <ConnectedMessengerCard
                    :messenger="messenger"
                    @remove:click="onRemoveMessengerClick"
                    @connect-on-device:click="onConnectOnDeviceClick"
                  />
                </div>
              </div>
            </div>
            <div v-else class="empty d-flex justify-center align-center">
              <v-alert
                color="primary"
                icon="mdi-alert"
                outlined
              >
                <div>Вы не подключили ни одного мессенджера
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
    <ConnectMessengerDialog ref="connectMessengerDialog" />
    <RemoveMessengerDialog ref="removeMessengerDialog" :messenger="messengerToRemove" />
    <ConnectMessengerOnDevice ref="connectOnDeviceDialog" />
  </div>
</template>

<script>
import PageView from "@/components/PageView";
import ConnectMessengerDialog from "@/components/messengers/ConnectMessengerDialog";
import ConnectedMessengerCard from "@/components/messengers/ConnectedMessengerCard";
import RemoveMessengerDialog from "@/components/messengers/RemoveMessengerDialog";
import ConnectMessengerOnDevice from "@/components/messengers/ConnectMessengerOnDevice";
import { mapState } from 'vuex';

export default {
  name: "ConnectedMessengers",
  data() {
    return {
      messengerToRemove: null,
      isLoaded: false,
    };
  },
  computed: {
    ...mapState({
      connectedMessengers: state => state.user.data.connectedMessengers,
    })
  },
  methods: {
    async openDialog() {
      this.$refs.connectMessengerDialog.open();
    },

    onRemoveMessengerClick(messenger) {
      this.messengerToRemove = messenger;
      this.$refs.removeMessengerDialog.open();
    },
    onConnectOnDeviceClick(messenger) {
      this.$refs.connectOnDeviceDialog.open(messenger);
    }
  },
  components: {
    PageView,
    ConnectMessengerDialog,
    ConnectedMessengerCard,
    RemoveMessengerDialog,
    ConnectMessengerOnDevice,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isLoaded = true;
    });
  }
}
</script>

<style lang="scss">
.empty {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.cards-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}

</style>