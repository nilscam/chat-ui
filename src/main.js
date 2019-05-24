import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
