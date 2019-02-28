import Vue from 'vue'
import PrismicVue from 'prismic-vue'
import linkResolver from './prismic/link-resolver'
import htmlSerializer from './prismic/html-serializer'
import moment from 'moment'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

const accessToken = process.env.VUE_APP_PRISMIC

Vue.config.productionTip = false

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver,
  htmlSerializer,
  apiOptions: {
    accessToken
  }
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('readMore', function (text, length, suffix) {
  let newText = text.map(a => a.text).filter(b => b).join(' ')
  return newText.substring(0, length) + suffix;
});

Vue.filter('truncate', function (value) {
  if (value.length > 20) {
    value = value.substring(0, 17) + '...';
  }
  return value
})

Vue.prototype.$scrollToTop = () => window.scrollTo(0, 0)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
