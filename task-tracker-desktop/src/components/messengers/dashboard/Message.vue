<template>
    <v-menu
      v-model="showMenu"
      absolute
    >
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <div
            class="message grey lighten-4 rounded-lg pa-2 mb-5"
            :class="{ 'lighten-3 c-pointer': hover && !showMenu }"
            v-on="on"
            v-bind="attrs"
          >
            <div class="message-content subtitle-2">
              <div>
                <div class="font-weight-black">{{ message.user.userName }}</div>
                <div class="message-text">{{ message.content }}</div>
              </div>
              <div class="text--secondary">{{ message.sendDate | dateTime }}</div>
            </div>
          </div>
        </v-hover>
      </template>
      <v-list dense>
        <v-list-item class="subtitle-2" disabled>Создать задачу</v-list-item>
        <v-list-item
          v-for="(item, index) in availableTrackers"
          :key="index"
          link
        >
          <img
            :src="require(`@/assets/images/trackers/${item.name}.png`)"
            height="24"
            class="mr-4"
          />
          <v-list-item-title class="subtitle-2">{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import { AVAILABLE_TRACKERS } from "@/utils/constants";

export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      require: true,
    }
  },
  data() {
    return {
      showMenu: false,
      availableTrackers: AVAILABLE_TRACKERS
    };
  },
}
</script>

<style scoped lang="scss">
.message {
  transition: all .1s linear;

  .message-content {
    display: grid;
    grid-template-columns: 1fr 120px;
    gap: 20px;

    .message-text {
      word-break: break-all;
    }
  }
}

.c-pointer {
  cursor: pointer;
}

</style>