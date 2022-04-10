import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import STATUS_CODES_MAP from "../utils/statusCodesMap";
import router from "../router/index";
import { ipcRenderer  } from 'electron'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fingerPrint: '',
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
        messages: [
          {
            sendDate: 1647372810000,
            content: 'Test asdasdasdlk alksd laksjd laksd lqkwd lkamsdl malskdm laksmd Test asdasdasdlk alksd laksjd laksd lqkwd lkamsdl malskdm laksmd',
            user: {
              id: 123,
              userName: 'Гоша Кузнецов',
            }
          },
          {
            sendDate: 1647372810000,
            content: 'Test asdasdasdlk alksd laksjd laksd lqkwd lkamsdl malskdm laksmd',
            user: {
              id: 123,
              userName: 'Гоша Кузнецов',
            }
          },
        ],
        cachedUsers: [],
      }
    },
    statistic: [],
    trackers: {
      jira: {
        projects: [],
      },
      trello: {
        boards: [],
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
    },
    [mutations.SET_TELEGRAM_CACHED_USERS](state, payload) {
      state.messengers.telegram.cachedUsers.push(payload);
    },
    [mutations.SET_TELEGRAM_MESSAGE](state, payload) {
      state.messengers.telegram.messages.push(payload);
    },
    [mutations.SET_FINGERPRINT](state, payload) {
      state.fingerPrint = payload;
    },
    [mutations.SET_JIRA_PROJECTS](state, payload) {
      state.trackers.jira.projects = payload;
    },
    [mutations.SET_TRELLO_BOARDS](state, payload) {
      state.trackers.trello.boards = payload;
    },
    [mutations.SET_STATISTIC](state, payload) {
      state.statistic = payload;
    }
  },
  actions: {
    [actions.SET_SNACKBAR]({ commit }, payload) {
      commit(mutations.SET_SNACKBAR, {
        message: STATUS_CODES_MAP[payload.code],
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
    },

    [actions.SET_TELEGRAM_CACHED_USERS]({ commit, state }, payload) {
      const user = {
        id: payload.id,
        userName: `${payload.first_name} ${payload.last_name}`,
      };

      if (state.messengers.telegram.cachedUsers.find(({ id }) => id === user.id)) {
        return;
      }
      commit(mutations.SET_TELEGRAM_CACHED_USERS, user);
    },
    [actions.SET_TELEGRAM_MESSAGE]({ commit, state }, payload) {
      const senderId = payload.sender_id.user_id;
      const user = state.messengers.telegram.cachedUsers.find(({ id }) => id === senderId);
      
      if (payload.chat_id > 0 && (!payload.is_outgoing || payload.chat_id === user.id)) {
        const message = {
          user,
          content: payload.content.text.text,
          sendDate: payload.date * 1000,
        };

        commit(mutations.SET_TELEGRAM_MESSAGE, message);

        ipcRenderer.send('message', { messenger: 'Telegram', message });
      }
    },
    async [actions.GET_JIRA_PROJECTS]({ state }) {
      const jira = state.user.data.connectedTrackers.find(({ id }) => id === 1);
      this._vm.$ws.emit('events', JSON.stringify({ event: 'GET_JIRA_PROJECTS', payload: jira }));
    },
    [actions.SET_JIRA_PROJECTS]({ commit }, payload) {
      const projects = payload.data.map(item => ({ name: item.name, id: item.id, link: item.self }));
      commit(mutations.SET_JIRA_PROJECTS, projects);
    },

    [actions.GET_TRELLO_BOARDS]({ state }) {
      const trello = state.user.data.connectedTrackers.find(({ id }) => id === 2);
      this._vm.$ws.emit('events', JSON.stringify({ event: 'GET_TRELLO_BOARDS', payload: trello }));
    },

    [actions.SET_TRELLO_BOARDS]({ commit }, payload) {
      const boards = payload.map(item => {
        const lists = item.lists.map(list => ({ id: list.id, name: list.name }));

        const board = { id: item.id, name: item.name, lists };

        return board;
      });

      commit(mutations.SET_TRELLO_BOARDS, boards);
    },
    async [actions.UPDATE_USER_SETTINGS]({ dispatch }, payload) {
      try {
        const response = await this._vm.$http.post("auth/settings", {
          fieldName: payload.fieldName,
          value: payload.value,
        });
        
        dispatch(actions.SET_SNACKBAR, {
          status: 'success',
          code: response.data.statusCode
        })
        dispatch(actions.GET_USER_DATA);
      } catch (e) {
        dispatch(actions.SET_SNACKBAR, {
          status: "error",
          code: e.response.data.statusCode,
        });

        throw new Error();
      }
    },
    async [actions.CONFIRM_TWO_FA]({ dispatch, commit }, payload) {
      try {
        commit(mutations.SET_LOADING, { value: true });
        const response = await this._vm.$http.post('auth/two-fa-confirm', {
          code: payload.code,
        });
        dispatch(actions.SET_SNACKBAR, {
          status: "success",
          code: response.data.statusCode,
        });
        commit(mutations.SET_LOADING, { value: false });
      } catch (e) {
        commit(mutations.SET_LOADING, { value: false });
        dispatch(actions.SET_SNACKBAR, {
          status: "error",
          code: e.response.data.statusCode,
        });

        throw new Error();
      }
    },

    async [actions.GET_STATISTIC]({ commit }) {
      try {
        const response = await this._vm.$http.get('statistic');
        commit(mutations.SET_STATISTIC, response.data);
      } catch(e) {
        throw new Error();
      }
    }
  },
  modules: {},
});
