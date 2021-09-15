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
			const result = await paymentApi.getForUser({ token })
			setPaymentList(result.order)
			setLoad(true)
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
			<div className="py-3 grid grid-cols-12 gap-2 lg:gap-4 xl:gap-5">
				{load ? (
					<div className="col-span-12">
						<h3>Các đơn hàng đã mua ({paymentList.length})</h3>
						<div className="flex flex-col space-y-3 mt-3">
							{paymentList &&
								paymentList.map((payment, index) => (
									<div
										key={index}
										className="w-full h-full bg-white flex rounded-lg flex-col shadow p-2 space-y-1"
									>
										<div className="py-2">
											<span>#{payment.paymentID}</span>{' '}
										</div>
										<div className="flex border-t-2 py-2 flex-col px-2 ">
											{payment.order?.map((order) => (
												<div
													key={order._id}
													className="flex items-center space-x-2 w-full justify-between"
												>
													<div className="flex h-14 items-center space-x-2">
														<div>
															<img
																src={order.images[0]?.url}
																alt=""
																className="w-10 h-10 object-cover"
															/>
														</div>
														<div className="flex flex-col">
															<h4 className="text-sm">{order.title}</h4>
															<span className="text-xs font-semibold">
																x{order.quantity}
															</span>
														</div>
													</div>
													<div>
														{parseInt(order.price)?.toLocaleString('en')}₫
													</div>
												</div>
											))}
										</div>
										<div className="py-2 flex flex-col md:flex-row justify-between border-t-2">
											<span>Tổng số lượng: {payment.quantity}</span>
											<span>
												Tổng tiền:{' '}
												{parseInt(payment.total)?.toLocaleString('en')} vnđ
											</span>
										</div>
									</div>
								))}
						</div>
					</div>
				) : (
					<Loading />
				)}
			</div>
		</div>
	)
}

export default User
