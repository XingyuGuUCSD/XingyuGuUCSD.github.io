import Vue from 'vue';

Vue.config.debug = process.env.NODE_ENV !== 'production';

import Axios from 'axios';

Axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json';
Axios.defaults.baseURL = process.env.API_LOCATION;
//Vue.prototype.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  }
});
//this.$http.get()

import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
});

import './assets/sass/app.scss';

export default {
  router,
};

import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'black',
})
