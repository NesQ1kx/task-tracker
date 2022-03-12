<template>
  <v-app>
    <v-main>
      <div class="blue lighten-4" style="height: 100%">
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
import { mapState } from 'vuex';
import { telegramApi } from "@/mixins/telegramApi";

export default {
  name: "App",
  mixins: [telegramApi],

  computed: {
    ...mapState({
      isUserLoggedIn: state => state.user.isLoggedIn,
    }),
  },

  data() {
    return {
      eventsActions: {
        'MESSENGER_CONNECTED': async () => {
          this.$store.dispatch(actions.SET_SNACKBAR, {
            status: "success",
            code: 200.3,
          });

          await this.$store.dispatch(actions.GET_USER_DATA);
        }
      }
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
    this.startTelegram();
    this.$ws.on('events', async (e) => {
      const event = JSON.parse(e);
      await this.eventsActions[event.event]();
    });
  },
};
</script>

<style></style>
