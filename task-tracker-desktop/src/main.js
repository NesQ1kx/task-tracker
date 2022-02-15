import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import http from "./plugins/axios";
import ws from "./plugins/ws";

Vue.config.productionTip = false;

Vue.use(http);
Vue.use(ws);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
