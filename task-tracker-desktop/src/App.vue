<template>
  <v-app>
    <v-main>
      <div class="blue lighten-4" style="height: 100vh">
        <NavigationButtons />
        <Progress />
        <router-view />
        <SnackBar />
        <Sidebar v-if="isUserLoggedIn" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationButtons from "@/components/NavigationButtons";
import Progress from "@/components/Progress";
import SnackBar from "@/components/SnackBar";
import Sidebar from "@/components/Sidebar";

import actions from "@/store/actions";
import mutations from "@/store/mutations";
import { mapState } from 'vuex';
import FingerpringJS from '@fingerprintjs/fingerprintjs';
import { SOCKET_EVENTS } from '@/utils/constants';

export default {
  name: "App",

  computed: {
    ...mapState({
      isUserLoggedIn: state => state.user.isLoggedIn,
      userData: state => state.user.data,
    }),
  },

  data() {
    return {
      eventsActions: {
        [SOCKET_EVENTS.MESSENGER_CONNECTED]: async () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.3,
          });

          await this.$store.dispatch(actions.GET_USER_DATA);
        },

        [SOCKET_EVENTS.MESSENGER_REMOVED]: async () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.4,
          });

          await this.$store.dispatch(actions.GET_USER_DATA);
          await this.destroyTelegram();
          await this.startTelegram();
        },

        [SOCKET_EVENTS.TRACKER_CONNECTED]: async () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.5,
          });

          await this.$store.dispatch(actions.GET_USER_DATA);
        },

        [SOCKET_EVENTS.TRACKER_REMOVED]: async () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.6,
          });

          await this.$store.dispatch(actions.GET_USER_DATA);
        },

        [SOCKET_EVENTS.GET_JIRA_PROJECTS]: (payload) => {
          this.$store.dispatch(actions.SET_JIRA_PROJECTS, payload);
        },

        [SOCKET_EVENTS.JIRA_ISSUE_CREATED]: () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.7,
          });
        },
        [SOCKET_EVENTS.GET_TRELLO_BOARDS]: (payload) => {
          this.$store.dispatch(actions.SET_TRELLO_BOARDS, payload);
        },
        [SOCKET_EVENTS.TRELLO_ISSUE_CREATED]: () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.8,
          });
        },
      },
    };
  },

  components: {
    NavigationButtons,
    Progress,
    SnackBar,
    Sidebar,
  },
  async mounted() {
    await this.$store.dispatch(actions.GET_USER_DATA);
    this.$ws.on('events', async (e) => {
      const event = JSON.parse(e);
      await this.eventsActions[event.event](event.payload);
    });

    const fpInstance = await FingerpringJS.load();
    const fpResult = await fpInstance.get();
    this.$store.commit(mutations.SET_FINGERPRINT, fpResult.visitorId);
  },

  watch: {
    isUserLoggedIn(newValue) {
      if (newValue) {
        this.userData.connectedMessengers.forEach(({ id }) => {
          switch(id) {
            case 1:
              this.startTelegram();
              break;
          }
        });
      }
    }
  }
};
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.v-sheet.v-stepper:not(.v-sheet--outlined) {
  box-shadow: none !important;
}
</style>

