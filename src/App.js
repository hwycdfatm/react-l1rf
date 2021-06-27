import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DataProvider } from './GlobalState'

import Header from './components/Header/Header'

function App() {
	return (
		<DataProvider>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/" />
				</Switch>
			</Router>
		</DataProvider>
	)
}

export default App
