import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import ERRORS_MAP from "../utils/errorsMap";

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
  },
  mutations: {
    [mutations.SET_LOADING](state, payload) {
      state.isLoading = payload.value;
    },
    [mutations.SET_SNACKBAR](state, payload) {
      state.snackbarState = payload;
    },
    [mutations.SET_USER_DATA](state, payload) {
      state.user.data = payload;
      state.user.isLoggedIn = true;
    },
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
        const response = await this._vm.$http.get("auth/profile");
        commit(mutations.SET_USER_DATA, response.data.userProfile);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
