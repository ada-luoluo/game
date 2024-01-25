import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import VueLazyLoad from 'vue3-lazyload'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import i18n from './lang'

const app = createApp(App)

app.use(router).use(VueViewer).use(i18n).component('Datepicker', Datepicker)
    .use(VueLazyLoad, {
        loading: require('@/assets/img/loading.gif'), // 图片加载时默认图片
        error: require('@/assets/img/error.png')// 图片加载失败时默认图片
 })


app.mount('#app')


// createApp(App).use(router).mount('#app')
