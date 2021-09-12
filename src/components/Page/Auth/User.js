import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'

const User = () => {
	const { user, token } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])

	useEffect(() => {
		const fetchPayment = async () => {
			const result = await paymentApi.getForUser({ token })
			setPaymentList(result.order)
		}
		fetchPayment()
	}, [token])

	return (
		<div className="w-full max-w-screen-xl mx-auto bg-transparent transition duration-500 flex flex-col p-1 xl:p-0">
			<div className="rounded-xl bg-white mt-2 p-5 shadow-lg">
				<div className="flex flex-col space-y-4 max-w-md">
					<div className="flex items-end font-mono">
						<span className="xl:text-2xl">Xin chào {user.name}</span>
					</div>
				</div>
			</div>
			<div className="pt-3 ">
				<h3>Các đơn hàng đã mua ({paymentList.length})</h3>
				<div className="flex flex-col space-y-3 mt-3">
					{paymentList &&
						paymentList.map((payment, index) => (
							<div
								key={index}
								className="w-full h-full bg-white flex rounded-lg flex-col shadow-lg p-2 space-y-1"
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
											<div>{parseInt(order.price)?.toLocaleString('en')}₫</div>
										</div>
									))}
								</div>
								<div className="py-2 flex justify-between border-t-2">
									<span>Số lượng sản phẩm: {payment.quantity}</span>
									<span>
										Tổng tiền: {parseInt(payment.total)?.toLocaleString('en')}{' '}
										vnđ
									</span>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default User
