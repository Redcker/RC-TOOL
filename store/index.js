import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		jdUsers: [],
		QLInfo: {},
		jdck: ''
	},
	mutations: {
		setCK(state, ck) {
			state.jdck = ck
		},
		setJDUser(state, info) {
			state.jdUsers.push(info)
		},
		updateQLToken(state, token) {
			state.QLInfo.token = token
			let info = JSON.parse(uni.getStorageSync('QLInfo'))
			info['token'] = token
			uni.setStorageSync('QLInfo', JSON.stringify(info))
		},
		setQLInfo(state, info) {
			state.QLInfo = info
			uni.setStorageSync('QLInfo', JSON.stringify(info))
		},
		setQLServerUrl(state, url) {
			state.QLInfo.serverUrl = url
		}
	},
	actions: {}
})
export default store
