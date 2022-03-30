<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card v-if="message && tracker">
      <v-card-title class="grey lighten-3">
        <span>Создать карточку в Trello</span>
      </v-card-title>
      <v-card-text
        class="pt-4"
      >
        <validation-observer ref="validationObserver" v-slot="{ invalid }">
          <form>
            <validation-provider
              v-slot="{ errors }"
              name="TrelloBoard"
              rules="required"
            >
              <v-select
                v-model="selectedBoard"
                :items="boards"
                return-object
                item-text="name"
                item-value="id"
                label="Доска в Trello"
                outlined
                dense
                required
                :error-messages="errors"
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="TrelloList"
              rules="required"
            >
              <v-select
                v-model="selectedList"
                :items="displayedLists"
                return-object
                item-text="name"
                item-value="id"
                label="Колонка"
                outlined
                dense
                required
                :error-messages="errors"
              ></v-select>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Summary"
              rules="required"
            >
              <v-text-field
                label="Название карточки"
                outlined
                v-model="cardName"
                required
                :error-messages="errors"
                dense
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Description"
              rules="required"
            >
              <v-textarea
                required
                clearable
                outlined
                clear-icon="mdi-close-circle"
                label="Описание"
                :error-messages="errors"
                :value="description"
                no-resize
                rows="5"
              ></v-textarea>
            </validation-provider>
            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                :disabled="invalid"
                small
                @click="createIssue"
                >Создать</v-btn
              >
              <v-btn
                small
                text
                class="ml-4"
                @click="closeDialog"
              >
                Закрыть
              </v-btn>
            </div>
          </form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import actions from '@/store/actions';
import { mapState } from 'vuex';

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required } from "vee-validate/dist/rules";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Это поле обязательно",
});

export default {
  name: 'CreateTrelloIssueDialog',
  data: () => ({
    dialog: false,
    selectedBoard: null,
    selectedList: null,
    displayedLists: [],
    cardName: '',
    description: '',
  }),
  props: {
    message: {
      type: Object,
    },
    tracker: {
      type: Object,
    }
  },
  computed: {
    ...mapState({
      boards: state => state.trackers.trello.boards,
    }),
  },
  mounted() {
    if (!this.boards.length) {
      this.$store.dispatch(actions.GET_TRELLO_BOARDS);
    }
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },

    closeDialog() {
      this.dialog = false;
    },

    createIssue() {
      console.log(this.selectedList);
      this.$refs.validationObserver.validate();

      this.$ws.emit('events', JSON.stringify({
        event: 'CREATE_TRELLO_ISSUE',
        payload: {
          listId: this.selectedList.id,
          taskName: this.cardName,
          description: this.description,
          ...this.tracker,
        }
      }));
      this.closeDialog();
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  watch: {
    message(value) {
      if (value) {
        this.description = value.content;
      }
    },
    selectedBoard(value) {
      if (value) {
        this.selectedList = null;
        this.displayedLists = value.lists;
      }
    }
  }
}
</script>

<style>

</style>