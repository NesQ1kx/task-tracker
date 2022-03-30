<template>
      <v-navigation-drawer
        permanent
        expand-on-hover
        absolute
        right
        width="280"
      >
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-avatar
                color="purple"
                size="40"
              >
                <span class="white--text text-h5">{{ userInitials }}</span>
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user.data.firstName }}
                {{ user.data.lastName }} 
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.data.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <router-link to="/connected-messengers">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-forum</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Подключенные месенджеры</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/connected-trackers">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-calendar-check-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Подключенные трекеры</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/profile">
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-details</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Профиль</v-list-item-title>
            </v-list-item>
          </router-link>
          <router-link to="/">
            <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>
          </router-link>
        </v-list>
        <template #append>
          <v-list
            nav
            dense
          >
            <v-list-item link @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/actions';

export default {
  name: "Sidebar",
  computed: {
    ...mapState({
      user: state => state.user,
    }),
    userInitials() {
      const firstNameLetter = this.user.data.firstName.slice(0, 1).toUpperCase();
      const lastNameLetter = this.user.data.lastName.slice(0, 1).toUpperCase();

      return `${firstNameLetter}${lastNameLetter}`;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch(actions.LOGOUT);
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.router-link-exact-active {
  &.router-link-active {
    .v-list-item::before {
      opacity: 0.1;
    }
  }
}
</style>