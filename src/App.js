import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import { DataProvider } from './GlobalState'

import ScrollToTop from './utils/ScrollToTop'

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
