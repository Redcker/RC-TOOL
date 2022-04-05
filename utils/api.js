import store from '../store/index.js'
const http = uni.$u.http
let getQLConfig = () => {
	return {
		header: {
			'Authorization': `Bearer ${store.state.QLInfo.token}`
		}
	}
}
// 青龙相关请求
export const ql = {
	get: {

		list: (type) => http.get(`${store.state.QLInfo.serverUrl}/api/${type}`,
			getQLConfig()
		),
		cronLog: (cronId) => http.get(`${store.state.QLInfo.serverUrl}/api/crons/${cronId}/log`,
			getQLConfig()
		),
		config: () => http.get(`${store.state.QLInfo.serverUrl}/api/configs/config.sh`,
			getQLConfig()
		),
		user: () => http.get(`${store.state.QLInfo.serverUrl}/api/user`,
			getQLConfig()
		)
	},
	post: {
		login: (data) => http.post(`${store.state.QLInfo.serverUrl}/api/user/login`, data),
		item: (data, type) => http.post(`${store.state.QLInfo.serverUrl}/api/${type}`, data,
			getQLConfig()
		)
	},
	put: {
		item: (info, type) => http.put(`${store.state.QLInfo.serverUrl}/api/${type}`, {
				...info
			},
			getQLConfig()
		),
		status: (itemId, type, status) => http.put(`${store.state.QLInfo.serverUrl}/api/${type}/${status}`, [
				itemId
			],
			getQLConfig()
		)
	},
	delete: {
		item: (data, type) => http.delete(`${store.state.QLInfo.serverUrl}/api/${type}`, data,
			getQLConfig()
		)
	}
}
export const app = {
	get: {
		checkUpdate: () => http.get('https://api.github.com/repos/Redcker/RCJD/releases', {
			custom: {
				noloading: true
			}
		})
	}
}
