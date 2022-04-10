<template>
  <PageView>
    <template #title>
      Профиль
    </template>
    <template #content>
      <transition name="fade">
        <div v-if="isLoaded">
            <form class="mt-10 content">
              <v-text-field
                label="Email"
                v-model="email"
                outlined
                required
                disabled
                dense
              >
              </v-text-field>
              <v-text-field
                label="Имя"
                v-model="firstName"
                outlined
                required
                readonly
                dense
                @click="startEditing('firstName')"
              >
              </v-text-field>
              <v-text-field
                label="Фамилия"
                v-model="lastName"
                outlined
                required
                readonly
                dense
                @click="startEditing('lastName')"
              >
              </v-text-field>
              <v-text-field
                label="Пароль"
                v-model="password"
                outlined
                required
                readonly
                dense
                type="password"
                @click="startEditing('password')"
              >
              </v-text-field>
              <div>
                <v-switch
                  v-model="isTwoFaEnabled"
                  label="Двухфакторная аутентификация"
                  @change="onChangeToFaSwitch"
                ></v-switch>
              </div>
            </form>
            <div class="mt-10">
              <div class="text-h5 font-weight-bold">
                Ваша статистика
              </div>
              <v-divider></v-divider>
              <Statisctics />
          </div>
        </div>
      </transition>
      
      <EditProfileFieldDialog ref="editFieldDialog" :field="editingField"/>
      <ToggleTwoFaDialog
        ref="toggleTwoFaDialog"
        @two-fa:error="onTwoFaError"
        @two-fa:success="onTwoFaSuccess"
        />
    </template>
  </PageView>
</template>

<script>
import PageView from '@/components/PageView';
import { mapState } from 'vuex';
import EditProfileFieldDialog from '@/components/profile/EditProfileFieldDialog';
import ToggleTwoFaDialog from '@/components/profile/ToggleTwoFaDialog';
import actions from '@/store/actions';
import Statisctics from '@/components/profile/Statisctics';

export default {
  name: 'Profile',
  data() {
    return {
      isLoaded: false,
      editing: null,
      email: '',
      firstName: '',
      editingField: null,
      lastName: '',
      password: '23123131231313423243234234234234',
      isTwoFaEnabled: false,
      isTwoFaEnabledTemp: false,
    };
  },
  computed: {
    ...mapState({
      userData: state => state.user.data,
    }),
  },
  mounted() {
    this.setFields(this.userData);
  },
  methods: {
    startEditing(propName) {
      switch(propName) {
        case 'firstName':
        case 'lastName':
          this.editingField = {
            type: 'text',
            rules: 'required',
            value: this[propName],
            fieldName: propName,
          }
          this.$refs.editFieldDialog.open();
          break;
        case 'password':
          this.editingField = {
            type: 'password',
            rules: {
              min: 8,
              required: true,
              regex:
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])',
            },
            fieldName: propName,
          }
          this.$refs.editFieldDialog.open();
          break;
      }
    },
    async onChangeToFaSwitch(value) {
      this.isTwoFaEnabledTemp = value;
      this.$refs.toggleTwoFaDialog.open();
      await this.$http.get('/auth/two-fa-send');
    },
    setFields(data) {
      const { email, firstName, lastName, isTwoFaEnabled } = data;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.isTwoFaEnabled = isTwoFaEnabled;
    },
    onTwoFaError() {
      this.isTwoFaEnabled = this.userData.isTwoFaEnabled;
    },
    async onTwoFaSuccess() {
      await this.$store.dispatch(actions.UPDATE_USER_SETTINGS, {
        fieldName: 'isTwoFaEnabled',
        value: this.isTwoFaEnabledTemp,
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isLoaded = true;
    });
  },
  components: {
    PageView,
    EditProfileFieldDialog,
    ToggleTwoFaDialog,
    Statisctics,
  },
  watch: {
    userData(data) {
      if (data) {
       this.setFields(data);
      }
    }
  },
}
</script>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
}
</style>