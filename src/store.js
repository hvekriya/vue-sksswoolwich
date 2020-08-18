import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'
import FB_Albums from "./store/FB_Albums";
import FB_Photos from './store/FB_Photos'
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        FB_Albums: FB_Albums,
        FB_Photos: FB_Photos
    }
})