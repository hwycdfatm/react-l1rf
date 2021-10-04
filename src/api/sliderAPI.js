import axiosAPI from './axiosAPI'

const sliderAPI = {
	get: () => {
		const url = '/slider'
		return axiosAPI.get(url)
	},
	create: (data, token) => {
		const url = '/slider'
		return axiosAPI.post(url, data, { headers: { Authorization: token } })
	},
	update: (data, token, id) => {
		const url = `/slider/${id}`
		return axiosAPI.put(url, data, { headers: { Authorization: token } })
	},
	delete: (token, id) => {
		const url = `/slider/${id}`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},
}

export default sliderAPI
