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
            </form>
        </div>
      </transition>
      <EditProfileFieldDialog ref="editFieldDialog" :field="editingField"/>
    </template>
  </PageView>
</template>

<script>
import PageView from '@/components/PageView';
import { mapState } from 'vuex';
import EditProfileFieldDialog from '@/components/EditProfileFieldDialog';

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
      password: ''
    };
  },
  computed: {
    ...mapState({
      userData: state => state.user.data,
    }),
  },
  mounted() {
    const { email, firstName, lastName } = this.userData;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
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
        // case 'password':
        //   this.editingField = {
        //     type: 'password',
        //     rules: {
        //       min: 8,
        //       required: true,
        //       regex:
        //         '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_-])',
        //     },
        //     value: this[propName],
        //     fieldName: propName,
        //   }
      }
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
  },
  watch: {
    userData(data) {
      if (data) {
        const { email, firstName, lastName } = data;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
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