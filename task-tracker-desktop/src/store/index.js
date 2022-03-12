import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import ERRORS_MAP from "../utils/errorsMap";
import router from "../router/index";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    snackbarState: {
      message: null,
      status: null,
    },
    user: {
      isLoggedIn: false,
      data: null,
    },
    messengers: {
      telegram: {
        authLink: null,
        authState: '',
      }
    }
  },
  mutations: {
    [mutations.SET_LOADING](state, payload) {
      state.isLoading = payload.value;
    },
    [mutations.SET_SNACKBAR](state, payload) {
      state.snackbarState = payload;
    },
    [mutations.SET_USER_DATA](state, payload) {
      state.user.data = payload.data;
      state.user.isLoggedIn = payload.isLoggedIn;
    },
    [mutations.SET_TELEGRAM_AUTH_LINK](state, payload) {
      state.messengers.telegram.authLink = payload;
    },
    [mutations.SET_TELEGRAM_AUTH_STATE](state, payload) {
      state.messengers.telegram.authState = payload;
    }
  },
  actions: {
    [actions.SET_SNACKBAR]({ commit }, payload) {
      commit(mutations.SET_SNACKBAR, {
        message: ERRORS_MAP[payload.code],
        status: payload.status,
      });
    },
    async [actions.GET_USER_DATA]({ commit }) {
      try {
        if (localStorage.getItem("authToken")) {
          commit(mutations.SET_LOADING, { value: true });
          const response = await this._vm.$http.get("auth/profile");
          commit(mutations.SET_USER_DATA, { data: response.data.userProfile, isLoggedIn: true });
          commit(mutations.SET_LOADING, { value: false });
        } else {
          router.push({ name: "Login" });
        }
      } catch (e) {
        commit(mutations.SET_LOADING, { value: false });
        localStorage.removeItem("authToken");
        router.push({ name: "Login" });
      }
    },
    [actions.LOGOUT]({ commit }) {
      localStorage.removeItem("authToken");
      commit(mutations.SET_USER_DATA, { data: null, isLoggedIn: false })
      router.push({ name: "Login" });
    }
  },
  modules: {},
});
