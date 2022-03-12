import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cookie: null
	},
	mutations: {
		setCookie(state, cookie) {
			state.cookie = cookie
		}
	},
	actions: {}
})
export default store
