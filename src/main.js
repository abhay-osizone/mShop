import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from './plugins/route';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { store } from './store/store';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

import "carbon-components/css/carbon-components.css";
import "./style.scss"
import CarbonComponentsVue from "@carbon/vue/src/index";

Vue.use(CarbonComponentsVue);
Vue.use(VueMoment, {
    moment,
})

Vue.config.productionTip = false
Vue.use( CKEditor );

new Vue({
  store: store,
  vuetify,
  render: h => h(App),
  router: VueRouter,
}).$mount('#app')
