<template>
  <div style="height: 100%">
    <PageView>
      <template #title>
        <span>Подключенные мессенджеры</span>
      </template>
      <template #content>
        <div v-if="connectedMessengers.length">
          card
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
      </template>
    </PageView>
    <ConnectMessengerDialog ref="dialog" />
  </div>
</template>

<script>
import PageView from "@/components/PageView";
import ConnectMessengerDialog from "@/components/ConnectMessengerDialog";
import { mapState } from 'vuex';

export default {
  name: "ConnectedMessengers",
  components: {
    PageView,
    ConnectMessengerDialog,
  },
  computed: {
    ...mapState({
      connectedMessengers: state => state.user.data.connectedMessengers,
    })
  },
  methods: {
    openDialog() {
      this.$refs.dialog.open();
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

</style>