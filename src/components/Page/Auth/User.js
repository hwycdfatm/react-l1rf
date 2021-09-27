import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'
import Loading from '../../../utils/Loading'
const User = () => {
	const { user, token } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])
	const [load, setLoad] = useState(false)
	useEffect(() => {
		const fetchPayment = async () => {
			try {
				const result = await paymentApi.getForUser({ token })
				setPaymentList(result.order)
				setLoad(true)
			} catch (error) {
				console.log(error)
			}
		}
		fetchPayment()
	}, [token])

	return (
		<div className="w-full max-w-screen-xl mx-auto bg-transparent transition duration-500 flex flex-col p-1 xl:p-0">
			<div className="rounded-xl bg-blue-300 mt-2 p-5 shadow-lg">
				<div className="whitespace-nowrap">
					<div className="flex items-center">
						<div>
							<div className="text-lg font-medium text-gray-900">
								{user.name}
							</div>
							<div className="text-md text-gray-500">{user.email}</div>
							<div className="text-md text-gray-500">{user.address}</div>
							<div className="text-md text-gray-500">{user.phone}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="py-3 flex flex-col">
				<div className="flex">
					<button className="h-10 py-2 px-5 bg-red-200">Tất cả</button>
					<button className="h-10 py-2 px-5 bg-red-200">Đang giao</button>
					<button className="h-10 py-2 px-5 bg-red-200">Đã giao</button>
					<button className="h-10 py-2 px-5 bg-red-200">Đã hủy</button>
				</div>
				<div>
					{load ? (
						<Loading />
					) : (
						paymentList.map((payment) => (
							<div key={payment.paymentID}>{payment.total}</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}

export default User
