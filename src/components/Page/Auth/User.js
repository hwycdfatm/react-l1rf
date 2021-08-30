import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
const User = () => {
	const { user } = useContext(GlobalState)
	console.log(user)
	return (
		<div className="w-full flex flex-col">
			<div className="flex">
				<span>Xin chào </span> <h3>{user.name}</h3>
			</div>
			<div className="w-full max-w-screen-md mx-auto">
				<div className="p-2"></div>
			</div>
		</div>
	)
}

export default User
