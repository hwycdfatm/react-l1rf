import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

import UserAPI from './api/UserAPI'
export const GlobalSate = createContext()

export const DataProvider = ({ children }) => {
	const [token, setToken] = useState(false)

	useEffect(() => {
		const firstLogin = localStorage.getItem('first-login')
		if (firstLogin) {
			const refreshToken = async () => {
				const token = await axios.get('/user/refresh_token')
				setToken(token.data.accessToken)
			}
			refreshToken()
		}
	}, [])

	const state = {
		token: [token, setToken],
		userAPI: UserAPI(token),
	}
	return <GlobalSate.Provider value={state}>{children}</GlobalSate.Provider>
}
