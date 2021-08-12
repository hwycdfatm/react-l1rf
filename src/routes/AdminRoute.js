import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalState } from '../GlobalState'

const AdminRoute = ({ component: Component, ...rest }) => {
	const state = useContext(GlobalState)
	const [isAdmin] = state.isAdmin
	const [isLogin] = state.isLogin
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAdmin && isLogin) {
					return <Component {...props} />
				}
				return (
					<Redirect
						to={{
							pathname: '/',
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
export default AdminRoute
