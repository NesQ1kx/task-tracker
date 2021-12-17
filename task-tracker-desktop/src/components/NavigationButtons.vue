<template>
  <div class="nav-buttons">
    <v-btn
      elevation="2"
      icon
      class="mr-2"
      @click="goBack"
    >
    <v-icon>
        mdi-arrow-left
      </v-icon>
    </v-btn>

    <v-btn
      elevation="2"
      icon
      @click="goForward"
    >
    <v-icon>
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'NavigationButtons',
  
  methods: {
    goBack() {
      this.$router.back();
    },
    goForward() {
      this.$router.forward();
    }
  }
}
</script>

<style lang="scss">
.nav-buttons {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
}
</style>