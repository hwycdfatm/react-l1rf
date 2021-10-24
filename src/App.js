import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import categoriesAPI from './api/categoryAPI'
import Layout from './components/Layout'
import { DataProvider } from './GlobalState'
import Loading from './utils/Loading'
import { ToastContainer } from 'react-toastify'
import ScrollToTop from './utils/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css'
import { HelmetProvider } from 'react-helmet-async'
function App() {
	const [apiReady, setApiReady] = useState(false)
	useEffect(() => {
		const fetchApi = async () => {
			try {
				const response = await categoriesAPI.get()
				response.status === 'Success' && setApiReady(true)
			} catch (error) {
				console.log(error.message)
			}
		}
		fetchApi()
	}, [])
	return (
		<DataProvider>
			<HelmetProvider>
				<Router>
					<ToastContainer
						position="bottom-left"
						autoClose={3000}
						hideProgressBar={true}
					/>
					<ScrollToTop>{!apiReady ? <Loading /> : <Layout />}</ScrollToTop>
				</Router>
			</HelmetProvider>
		</DataProvider>
	)
}

export default App
