import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {store} from './helper/store/'
import router from './helper/router/'

import lang from './helper/lang'
import messages from './helper/messages'
import urls from './helper/urls.js'
import rules from './helper/rules.js'
import keys from './helper/keys.js'
import project from './helper/project-config.js'
import GlobalMixins from "./helper/mixins/global-mixin"
import VueGeolocation from 'vue-browser-geolocation';

import VueCryptojs from 'vue-cryptojs'
import VueTypedJs from 'vue-typed-js'


Vue.prototype.$lang = lang
Vue.prototype.$messages = messages
Vue.prototype.$urls = urls
Vue.prototype.$keys = keys
Vue.prototype.$rules = rules
Vue.prototype.$project = project


Vue.use(VueCryptojs)
Vue.use(VueGeolocation);
Vue.use(VueTypedJs)

Vue.config.productionTip = false


new Vue({
    vuetify,
    GlobalMixins,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
