import store from '../store/index.js'
const http = uni.$u.http
let getQLConfig = () => {
	return {
		header: {
			'Authorization': `Bearer ${store.state.QLInfo.token}`
		}
	}
}
let getJDConfig = (cookie) => {
	return {
		header: {
			"user-agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
			'Cookie': cookie
		},
	}
}
let getJXConfig = (cookie) => {
	return {
		header: {
			"Referer": "https://st.jingxi.com/",
			"user-agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
			'Cookie': cookie
		},
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
		),
		config: (data) => http.post(`${store.state.QLInfo.serverUrl}/api/configs/save`, data, getQLConfig())
	},
	put: {
		two_step_login: (data) => http.put(`${store.state.QLInfo.serverUrl}/api/user/two-factor/login`, data),
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
				noloading: true,
				toast: false
			}
		})
	}
}


export const jd = {
	get: {
		info: (cookie) => http.get('https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', getJDConfig(cookie)),
	}
}
export const jx = {
	get: {
		beanCount: (cookie) => http.get('https://m.jingxi.com/activeapi/querybeanamount?sceneval=2&g_login_type=1',
			getJXConfig(cookie)),
		beanDetail : (cookie) => http.get('https://m.jingxi.com/activeapi/queryuserjingdoudetail?sceneval=2&g_login_type=1&g_ty=ls&pagesize=10&type=16')
	}
}
