import axiosAPI from './axiosAPI'

const sliderAPI = {
	get: () => {
		const url = '/slider'
		return axiosAPI.get(url)
	},
	create: ({ data, token }) => {
		const url = '/slider'
		return axiosAPI.post(
			url,
			{ ...data },
			{ headers: { Authorization: token } }
		)
	},
	update: (token, id, data) => {
		const url = `/slider/${id}`
		return axiosAPI.patch(
			url,
			{ activate: data },
			{ headers: { Authorization: token } }
		)
	},
	delete: (token, id) => {
		const url = `/slider/${id}`
		return axiosAPI.delete(url, { headers: { Authorization: token } })
	},
}

export default sliderAPI
