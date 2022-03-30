<template>
  <v-dialog
    v-if="field"
    v-model="dialog"
    max-width="390"
  >
    <v-card>
      <v-card-title>
        <div class="text-center">Изменение поля</div>
      </v-card-title>

      <v-card-text>
        <validation-observer ref="validationObserver">
          <validation-provider
            :rules="field.rules"
            v-slot="{ errors }"
          >
            <v-text-field
              :type="field.type"
              outlined
              required
              dense
              v-model="value"
              :error-messages="errors"
            >

            </v-text-field>
          </validation-provider>
        </validation-observer>
      </v-card-text>

      <v-card-actions
        class="d-flex justify-end"
      >
        <v-btn
          small
          color="primary"
          class="mr-4"
          @click="saveField"
        >
          Сохранить
        </v-btn>
        <v-btn
          small
          @click="close"
        >
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import actions from '@/store/actions';
import { required, email, min, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");

extend("required", {
  ...required,
  message: "Это поле обязательно",
});

extend("email", {
  ...email,
  message: "Неверный формат email",
});

extend("min", {
  ...min,
  message: "Минимальная длина пароля - {length} символов",
});

extend("regex", {
  ...regex,
  message: "Пароль не удовлетворяет условию",
});
export default {
  name: 'EditProfileFieldDialog',
  props: {
    field: {
      type: Object,
    }
  },
  data() {
    return {
      dialog: false,
      value: '',
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    async saveField() {
      await this.$store.dispatch(actions.UPDATE_USER_SETTINGS, {
        fieldName: this.field.fieldName,
        value: this.value,
      });
      this.close();
    }
  }, 
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  watch: {
    field(newValue) {
      if (newValue) {
        this.value = newValue.value;
      }
    }
  }
}
</script>

<style>

</style>