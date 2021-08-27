import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { GlobalState } from '../GlobalState'
const AdminRoute = ({ component: Component, ...rest }) => {
	const { admin } = useContext(GlobalState)

	return (
		<Route
			{...rest}
			render={(props) => {
				if (admin) {
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
