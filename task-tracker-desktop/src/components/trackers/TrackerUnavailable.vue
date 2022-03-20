<template>
  <v-alert
    color="error"
    icon="mdi-alert-circle"
    outlined
    class="mb-10"
  >
    <div class="subtitle-2">Этот трекер пока недоступен для поключения к приложению</div>
  </v-alert>
</template>

<script>
export default {
  name: 'TrackerUnavailable',
}
</script>