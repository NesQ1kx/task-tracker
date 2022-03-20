import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import http from "./plugins/axios";
import ws from "./plugins/ws";
import date from "./filters/date";
import dateTime from "./filters/dateTime";
import { telegramApi } from "@/mixins/telegramApi";


Vue.config.productionTip = false;

Vue.use(http);
Vue.use(ws);
Vue.mixin(telegramApi);

Vue.filter('date', date);
Vue.filter('dateTime', dateTime);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
