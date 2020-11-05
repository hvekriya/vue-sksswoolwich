import "babel-polyfill";
import Vue from "vue";
import VueClipboard from 'vue-clipboard2'
import PrismicVue from "prismic-vue";
import linkResolver from "./prismic/link-resolver";
import htmlSerializer from "./prismic/html-serializer";
import moment from "moment";
import App from "./App.vue";
import router from "./router";
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import LoadScript from 'vue-plugin-load-script';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
Vue.use(VueAxios, axios);

// Loading component
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.component("loading", Loading);

const accessToken = process.env.VUE_APP_PRISMIC;

Vue.config.productionTip = false;

Vue.use(PrismicVue, {
    endpoint: window.prismic.endpoint,
    linkResolver,
    htmlSerializer,
    apiOptions: {
        accessToken
    }
});

Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_API
    }
});

Vue.filter("formatDate", function(value) {
    if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
    }
});

Vue.filter("readMore", function(text, length, suffix) {
    console.log(text)
    let newText = text
        .map(a => a.text)
        .filter(b => b)
        .join(" ");
    return newText.substring(0, length) + suffix;
});

Vue.filter("truncate", function(value) {

    var newText = ""

    if (value.length > 50) {
        newText = value.substring(0, 200) + " ...";
    } else {
        console.log(value)
        return value;
    }
    return newText;
});

Vue.filter("replace", function(currentText, text, newText) {
    return currentText.replace(text, newText);
});

Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0);

// Mount the APP

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");