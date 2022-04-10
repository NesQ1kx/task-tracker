<template>
  <div class="mt-10 messengers-dashboard">
    <div class="tabs">
      <div v-for="(item, index) in connectedMessengers" :key="index">
        <v-hover v-slot="{ hover }">
          <div
            v-ripple
            class="tab white rounded-xl pa-4 elevation-2"
            :class="{ 'grey lighten-2': selectedMessenger && selectedMessenger.id === item.id, 'grey lighten-4': hover }"
            @click="onChangeMessenger(item)"
          >
            <div class="d-flex align-center">
              <img :src="require(`@/assets/images/messengers/${item.messengerName}.png`)" alt="" width="32" class="mr-4"/>
              <span>{{ item.messengerName }}</span>
            </div>
          </div>
        </v-hover>
      </div>
    </div>
    <div class="tabs-content-wrapper pb-10">
      <div class="tabs-content white rounded-xl elevation-2" v-if="selectedMessenger">
          <div class="search-input px-10 mt-2">
            <v-text-field
              dense
              full-width
              placeholder="Поиск в сообщениях"
              prepend-inner-icon="mdi-magnify"
              v-model="searchText"
            ></v-text-field>
          </div>
          <div v-if="messagesToDisplay.length" class="messages-list px-10 pt-16">
            <transition-group name="list">
              <Message
                :message="message"
                v-for="(message, index) in messagesToDisplay"
                :key="index"
                @tracker:select="onSelectTracker($event, message)"
              />
            </transition-group>
          </div>
          <div v-else class="no-messages grey--text">
            Здесь пока нет сообщений
          </div>
      </div>
    </div>
    <CreateJiraIssueDialog
      :tracker="selectedTracker"
      :message="selectedMessage"
      ref="createJiraIssueDialog"
    />
    <CreateTrelloIssueDialog
      :tracker="selectedTracker"
      :message="selectedMessage"
      ref="createTrelloIssueDialog"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Message from "./Message.vue";
import CreateJiraIssueDialog from '@/components/trackers/jira/CreateJiraIssueDialog';
import CreateTrelloIssueDialog from '@/components/trackers/trello/CreateTrelloIssueDialog';


export default {
  name: 'MessengersDashboard',
  data() {
    return {
      selectedMessenger: null,
      selectedMessage: null,
      selectedTracker: null,
      searchText: '',
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      connectedMessengers: state => state.user.data.connectedMessengers,
      telegramMessages: state => state.messengers.telegram.messages,
    }),
    messagesToDisplay() {
      let messages = [];
      switch (this.selectedMessenger.id) {
        case 1:
          messages = this.telegramMessages;
          break;
        case 2:
          messages = []
          break;
      }
      const temp = messages.filter(({ content }) => content.includes(this.searchText));
      return temp;
    }
  },
  mounted() {
    this.selectedMessenger = this.connectedMessengers[0];
  },
  methods: {
    onChangeMessenger(messenger) {
      this.selectedMessenger = messenger;
    },
    onSelectTracker(tracker, message) {
      this.selectedTracker = tracker;
      this.selectedMessage = message;
      switch(tracker.id) {
        case 1:
          this.$refs.createJiraIssueDialog.openDialog();
          break;
        case 2:
          this.$refs.createTrelloIssueDialog.openDialog();
      }
    },
  },

  components: {
    Message,
    CreateJiraIssueDialog,
    CreateTrelloIssueDialog,
  }
}
</script>

<style scoped lang="scss">
.messengers-dashboard {
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: start;
  gap: 40px;

  .tabs {
    display: grid;
    gap: 20px;
    
    .tab {
      cursor: pointer;
      transition: all  .1s linear;
    }
  }

  .tabs-content-wrapper {
    height: 100%;

    .tabs-content {
      height: 100%;
      position: relative;

      .messages-list {
        overflow-y: scroll;
        height: 100%;
        width: 100%;
        position: absolute;
      }

      .search-input {
        position: absolute;
        width: 100%;
        z-index: 10;
      }
    }

    .no-messages {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.list-enter-active, .list-leave-active {
  transition: all .5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>