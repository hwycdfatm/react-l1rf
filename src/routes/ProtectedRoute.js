import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalState } from '../GlobalState'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { login } = useContext(GlobalState)

	return (
		<Route
			{...rest}
			render={(props) => {
				if (login) {
					return <Component {...props} />
				}
				return (
					<Redirect
						to={{
							pathname: '/login',
							state: {
								from: props.location,
							},
						}}
					/>
				)
			}}
		/>
	)
}
export default ProtectedRoute
