import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {})
import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)
import money from 'v-money'
// register directive v-money and component <money>
Vue.use(money, {precision: 2})
Vue.config.productionTip = false;
import moment from 'moment'
Vue.prototype.moment = moment

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
