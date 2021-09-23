import axios from 'axios'
import queryString from 'query-string'

const axiosAPI = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
})

axiosAPI.defaults.withCredentials = true

axiosAPI.interceptors.request.use(async (config) => {
	return config
})

axiosAPI.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data
		}

		return response
	},
	(error) => {
		// Handle errors
		throw error
	}
)

export default axiosAPI
