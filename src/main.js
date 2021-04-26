import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import "vue-select/dist/vue-select.css"
import './assets/css/main.scss'

import vSelect from "vue-select"
import VCalendar from 'v-calendar'
import PhoneMaskInput from "vue-phone-mask-input";

Vue.component("v-select", vSelect);

Vue.component('PhoneMaskInput', PhoneMaskInput);

Vue.use(VCalendar, {
  theme: {
    color: "yellow",
    container: "vc-text-gray-900 vc-bg-white",
    header: "",
    title: "vc-text-gray-900 vc-font-semibold hover:vc-opacity-75"
  }
});

// Отключает предупреждение о работе в режиме разработки при запуске Vue
Vue.config.productionTip = false
Vue.config.devtools = true;

// new Vue is not needed anymore, as you're initializing the app through vue-custom-element
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// (optional) 'Custom elements polyfill'
// import 'document-register-element/build/document-register-element'

// widget setup
// (optional) 'Custom elements polyfill'
// import 'document-register-element/build/document-register-element'
// vue-custom-element by karol-f
// import vueCustomElement from 'vue-custom-element'
// Vue.use(vueCustomElement)

// use vue-custom-element
// App.store = store
// App.router = router
// Vue.customElement('biggid-widget', App)