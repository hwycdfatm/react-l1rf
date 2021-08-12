import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalSate } from '../GlobalState'

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const state = useContext(GlobalSate)
	const [isLogin] = state.isLogin
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isLogin) {
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
