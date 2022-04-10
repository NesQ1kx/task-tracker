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
        <validation-observer ref="validationObserver" v-slot="{ invalid }">
          <validation-provider
            v-if="field.fieldName !== 'password'"
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
          <div v-else>
            <validation-provider
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                :type="show ? 'text' :field.type"
                outlined
                required
                dense
                v-model="oldPassword"
                label="Текущий пароль"
                :error-messages="errors"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider
              :rules="field.rules"
              v-slot="{ errors }"
            >
              <v-text-field
                :type="show ? 'text' :field.type"
                outlined
                required
                dense
                v-model="value"
                label="Новый пароль"
                :error-messages="errors"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
              >
              </v-text-field>
            </validation-provider>
          </div>

          <v-card-actions
            class="d-flex justify-end"
          >
            <v-btn
              small
              color="primary"
              class="mr-4"
              @click="saveField"
              :disabled="invalid || (initialValue === value)"
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
        </validation-observer>
      </v-card-text>

     
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
      initialValue: null,
      oldPassword: '',
      show: false,
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
      this.$refs.validationObserver.validate();

      try {
        await this.$store.dispatch(actions.UPDATE_USER_SETTINGS, {
          fieldName: this.field.fieldName,
          value: this.field.fieldName === 'password' ? [this.oldPassword, this.value] : this.value,
        });
        this.close();
      } catch(e) {
        console.log(e);
      }
    }
  }, 
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  watch: {
    field(newValue) {
      if (newValue && newValue.field !== 'password') {
        this.value = newValue.value;
        this.initialValue = this.value;
      }
    },
  }
}
</script>

<style>

</style>