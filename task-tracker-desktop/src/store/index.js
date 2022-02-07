import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations';
import actions from './actions';
import ERRORS_MAP from '../utils/errorsMap';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    snackbarState: {
      message: null,
      status: null,
    }
  },
  mutations: {
    [mutations.SET_LOADING](state, payload) {
      state.isLoading = payload.value;
    },
    [mutations.SET_SNACKBAR](state, payload) {
      state.snackbarState = payload;
    }
  },
  actions: {
    [actions.SET_SNACKBAR]({ commit }, payload) {
      console.log(ERRORS_MAP);
      commit(mutations.SET_SNACKBAR, {
        message: ERRORS_MAP[payload.code],
        status: payload.status,
      })
    }
  },
  modules: {},
});
