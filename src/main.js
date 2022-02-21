import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import VeeValidate from "vee-validate";
import VueBootstrapToasts from "vue-bootstrap-toasts";
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  connection: 'https://movieatery-api.herokuapp.com',
  vuex: {
      store,
      actionPrefix: 'socket_',
  },
}))

Vue.use(VueBootstrapToasts);
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: "veeFields",
  errorBagName: "veeErrors"
});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
