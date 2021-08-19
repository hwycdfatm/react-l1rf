import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
const AdminRoute = ({ component: Component, ...rest }) => {
	const state = useContext(GlobalState)
	const [admin] = state.isAdmin
	const isAdmin = localStorage.getItem('admin')
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAdmin || admin) {
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
