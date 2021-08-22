import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'

import ScrollToTop from './utils/ScrollToTop'

import Layout from './components/Layout'
function App() {
	return (
		<DataProvider>
			<Router>
				<ScrollToTop>
					<Layout />
				</ScrollToTop>
			</Router>
		</DataProvider>
	)
}

export default App
