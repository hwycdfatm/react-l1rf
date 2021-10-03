import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'
import Skeleton from 'react-loading-skeleton'
import PaymentContainer from './PaymentContainer'
const User = () => {
	const { user, token, refreshToken } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])
	const [load, setLoad] = useState(false)
	useEffect(() => {
		const fetchPayment = async () => {
			try {
				setLoad(true)
				const result = await paymentApi.getForUser({ token })
				if (result.status === 'Success') {
					setPaymentList(result.order)
					setLoad(false)
				} else if (result.status === 'exptoken') {
					refreshToken()
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchPayment()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	return (
		<div className="w-full max-w-screen-xl mx-auto bg-transparent transition duration-500 flex flex-col p-1 xl:p-0 xl:pb-2 space-y-5">
			<div className="flex flex-wrap border h-56 rounded-lg overflow-hidden mt-5">
				<div className="w-full md:w-1/2">
					<div className="flex flex-col p-4 font-maven bg-white">
						<p>Thông tin cá nhân</p>
						<div className="flex flex-col font-sm space-y-2 mt-6">
							{load ? (
								<>
									<Skeleton height={20} width={200} />
									<Skeleton height={20} />
									<Skeleton height={20} width={170} />
									<Skeleton height={20} width={140} />
								</>
							) : (
								<>
									<span>Email: {user.email}</span>
									<span>Địa chỉ: {user.address}</span>
									<span>Số điện thoại: {user.phone}</span>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			<PaymentContainer paymentList={paymentList} />
		</div>
	)
}

export default User
