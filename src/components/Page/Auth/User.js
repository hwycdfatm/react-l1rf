import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'
import background from './background.jpg'
const User = () => {
	const { user, token } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])
	const [toggleUpdate, setToggleUpdate] = useState(false)
	useEffect(() => {
		const fetchPayment = async () => {
			const result = await paymentApi.getForUser({ token })
			setPaymentList(result.order)
		}
		fetchPayment()
	}, [token])

	const handleUpdateUser = async (user) => {}
	return (
		<div className="w-full max-w-6xl mx-auto bg-transparent transition duration-500 flex flex-col">
			<div className="flex relative overflow-hidden rounded-xl text-white mt-2">
				<div className="w-full p-4 flex flex-col space-y-6 z-10">
					<div className="flex items-end font-mono">
						<h5 className="text-2xl">Xin chào </h5>
						<h4 className="mt-2 text-6xl">{user.name}</h4>
					</div>
					<div className="flex flex-col space-y-4 w-full max-w-md">
						<h3>Thông tin cá nhân</h3>
						<div className="flex rounded border border-gray-100 h-8 items-center relative overflow-hidden">
							<label htmlFor="user-address" className="absolute left-1">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
									/>
								</svg>
							</label>
							<input
								id="user-address"
								type="text"
								placeholder={user.email}
								className="w-full h-full pl-10 bg-transparent placeholder-white"
								disabled={!toggleUpdate}
								autoComplete="off"
							/>
						</div>
						<div className="flex rounded border border-gray-100 h-8 items-center relative overflow-hidden">
							<label htmlFor="user-phone" className="absolute left-1">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
							</label>
							<input
								id="user-phone"
								type="text"
								placeholder={user.phone}
								className="w-full h-full pl-10 bg-transparent placeholder-white"
								disabled={!toggleUpdate}
								autoComplete="off"
							/>
						</div>

						<div className="flex rounded border border-gray-100 h-8 items-center relative overflow-hidden">
							<label htmlFor="user-address" className="absolute left-1">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
							</label>
							<input
								id="user-address"
								type="text"
								placeholder={user.address}
								className="w-full h-full pl-10 bg-transparent placeholder-white"
								disabled={!toggleUpdate}
								autoComplete="off"
							/>
						</div>
					</div>
					{toggleUpdate && (
						<div className="flex justify-end">
							<button className="p-2 text-sm bg-blue-300 rounded-lg">
								Cập nhật
							</button>
						</div>
					)}
				</div>
				<span
					onClick={() => setToggleUpdate(!toggleUpdate)}
					className="absolute text-white z-10 text-sm top-1 right-3 underline cursor-pointer"
				>
					Sửa
				</span>
				<div className="absolute">
					<img src={background} alt="" className="w-full object-cover" />
				</div>
			</div>
			<div className="p-3">
				<h3>Các đơn hàng đã mua ({paymentList.length})</h3>
				<div className="flex flex-col space-y-3 mt-3">
					{paymentList &&
						paymentList.map((payment, index) => (
							<div
								key={index}
								className="w-full h-full bg-white flex rounded-md flex-col shadow-lg p-2 space-y-1"
							>
								<div className="py-2">
									<span>#{payment.paymentID}</span>
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
