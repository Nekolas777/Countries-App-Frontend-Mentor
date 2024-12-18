import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import VueLazyLoad from 'vue3-lazyload'
import { createPinia } from 'pinia'
import './style.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueLazyLoad, {})
  .mount('#app')  
