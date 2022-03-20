<template>
  <PageView>
    <template #title>
      <span>Dashboard</span>
    </template>
    <template #content>
      <transition name="fade">
        <MessengersDashboard v-if="isUserLogined && isLoaded" />
      </transition>
    </template>
  </PageView>
</template>

<script>
import { mapState } from 'vuex'
import PageView from "@/components/PageView";
import MessengersDashboard from "@/components/messengers/dashboard/MessengersDashboard";

export default {
  name: "Dashboard",
  computed: {
    ...mapState({
      isUserLogined: state => state.user.isLoggedIn,
    })
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  components: {
    PageView,
    MessengersDashboard,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isLoaded = true;
    });
  }
};
</script>

<style lang="scss">

</style>
