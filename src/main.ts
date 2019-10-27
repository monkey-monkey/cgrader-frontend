import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VueCookies from "vue-cookies-ts";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
}));
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
