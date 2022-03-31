import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'
import { key } from './store/models/queueModel'
import './assets/layouts/index.scss'

createApp(App).use(store, key).use(router).use(VueAxios, axios).mount('#app')
