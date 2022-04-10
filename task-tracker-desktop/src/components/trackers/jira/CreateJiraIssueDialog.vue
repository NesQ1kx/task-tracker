<template>
  <v-dialog
    v-model="dialog"
    max-width="400"
  >
    <v-card v-if="message && tracker">
      <v-card-title class="grey lighten-3">
        <span>Создать задачу в Jira</span>
      </v-card-title>
      <v-card-text
        class="pt-4"
      >
        <validation-observer ref="validationObserver" v-slot="{ invalid }">
          <form>
            <validation-provider
              v-slot="{ errors }"
              name="JiraProject"
              rules="required"
            >
              <v-select
                v-model="selectedProject"
                :items="projects"
                return-object
                item-text="name"
                item-value="id"
                label="Проект Jira"
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
                label="Короткое описание"
                outlined
                v-model="summary"
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
  name: 'CreateJiraIssueDialog',
  data: () => ({
    dialog: false,
    selectedProject: null,
    summary: '',
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
      projects: state => state.trackers.jira.projects,
      userData: state => state.user.data,
    })
  },
  mounted() {
    if (!this.projects.length) {
      this.$store.dispatch(actions.GET_JIRA_PROJECTS);
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
      this.$refs.validationObserver.validate();

      this.$ws.emit('events', JSON.stringify({
        event: 'CREATE_JIRA_ISSUE',
        payload: {
          projectId: this.selectedProject.id,
          summary: this.summary,
          description: this.description,
          userEmail: this.userData.email,
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
    }
  }
}
</script>

<style>

</style>