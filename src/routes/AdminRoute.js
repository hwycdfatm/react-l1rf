import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalSate } from '../GlobalState'

const AdminRoute = ({ component: Component, ...rest }) => {
	const state = useContext(GlobalSate)
	const [isAdmin] = state.userAPI.isAdmin
	const [isLogin] = state.userAPI.isLogin
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
