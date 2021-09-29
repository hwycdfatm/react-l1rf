import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'
import Loading from '../../../utils/Loading'
import PaymentContainer from './PaymentContainer'
const User = () => {
	const { user, token } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])
	const [load, setLoad] = useState(false)
	useEffect(() => {
		const fetchPayment = async () => {
			try {
				setLoad(true)
				const result = await paymentApi.getForUser({ token })
				setPaymentList(result.order)
				setLoad(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchPayment()
	}, [token])

	return (
		<div className="w-full max-w-screen-xl mx-auto bg-transparent transition duration-500 flex flex-col p-1 xl:p-0 xl:pb-2 space-y-5">
			<div className="flex flex-wrap border h-56 rounded-lg overflow-hidden">
				<div className="flex items-center md:w-1/2">
					<div className="w-36 h-36 rounded-full overflow-hidden ml-5 border-4 border-green-200">
						<img
							src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-images/e9fef2d083cf11ea8f996dbfbe6e50b1.jpg"
							alt=""
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="ml-5 flex flex-col">
						<span>{user.name}</span>
						<span>{user.email}</span>
						<span>{user.address}</span>
						<span>{user.phone}</span>
					</div>
				</div>
			</div>
			<PaymentContainer paymentList={paymentList} />

			{load && <Loading />}
		</div>
	)
}

export default User
