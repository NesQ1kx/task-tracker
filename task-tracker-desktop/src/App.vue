<template>
  <v-app>
    <v-main>
      <div class="blue lighten-4" style="height: 100%">
        <NavigationButtons />
        <Progress />
        <router-view />
        <SnackBar />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationButtons from "@/components/NavigationButtons";
import Progress from "@/components/Progress";
import SnackBar from "@/components/SnackBar";
import actions from "@/store/actions";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    NavigationButtons,
    Progress,
    SnackBar,
  },
  async mounted() {
    await this.$store.dispatch(actions.GET_USER_DATA);
  },
};
</script>

<style></style>
