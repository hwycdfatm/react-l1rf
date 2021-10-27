import axiosAPI from './axiosAPI'

const assectAPI = {
	get: () => {
		const url = '/assect'
		return axiosAPI.get(url)
	},
	update: (id, data, token) => {
		const url = `/assect/${id}`
		return axiosAPI.put(url, data, { headers: { Authorization: token } })
	},
}

export default assectAPI
