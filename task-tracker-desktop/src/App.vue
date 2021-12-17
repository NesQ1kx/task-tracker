<template>
  <v-app>
    <v-main >
      <div class="blue lighten-4" style="height: 100%">
        <NavigationButtons />
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationButtons from '@/components/NavigationButtons';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    NavigationButtons,
  }
};
</script>

<style>
</style>
