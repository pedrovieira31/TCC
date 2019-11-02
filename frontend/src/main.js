import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from'./config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IkVSMDQ4MTciLCJuYW1lIjoiUGVkcm8gVmljdG9yIFZpZWlyYSBHb250aWpvIiwiZW1haWwiOiJwdmllaXJhZ29udGlqb0BnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU3MjQ0ODEzOSwiZXhwIjoxNTcyNzA3MzM5fQ.H4h2sSRHitnyfv-iNQ1qVscoAn6r0TubU9At-sD6xPQ'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')