import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../api/paymentAPI'
import { GlobalState } from '../../GlobalState'
import { format } from 'date-fns'
import DetailOrder from './DetailOrder'
import { toast } from 'react-toastify'
const Orders = () => {
	const [orders, setOrders] = useState([])
	const { token } = useContext(GlobalState)
	const [showForm, setShowForm] = useState(false)
	const [detailOrder, setDetailOrder] = useState('')

	const handleShowFormDetailOrder = (order) => {
		setShowForm(true)
		setDetailOrder(order)
	}

	const handleUpdateOrder = async ({ _id, status }) => {
		try {
			const result = await paymentApi.updatePayment({ token, _id, status })
			if (result.status === 'Success') {
				toast(result.message, { type: 'success', position: 'top-center' })
				setShowForm(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteOrder = async (_id) => {
		try {
			const result = await paymentApi.deletePayment({ token, _id })
			if (result.status === 'Success') {
				toast(result.message, { type: 'success', position: 'top-center' })
				setOrders([...orders.filter((e) => e._id !== _id)])
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		async function fetchAllOrder() {
			const result = await paymentApi.getAllPayments({ token })
			setOrders(result.order)
		}
		fetchAllOrder()
	}, [token, showForm])

	showForm
		? document.body.classList.add('overflow-hidden')
		: document.body.classList.remove('overflow-hidden')

	return (
		<>
			{showForm && (
				<DetailOrder
					orderDetail={detailOrder}
					setShowForm={setShowForm}
					handleUpdateOrder={handleUpdateOrder}
				/>
			)}
			<div className="mt-10 lg:mt-0 lg:ml-56 overflow-x-scroll scrollbar min-h-screen">
				<div className="py-2">
					<table className="min-w-full divide-y divide-gray-200 rounded-lg">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									STT
								</th>
								<th
									scope="col"
									className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									ID
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Tài khoản
								</th>

								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Ngày mua
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Tổng tiền
								</th>
								<th
									scope="col"
									className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Phương thức
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Tình trạng
								</th>

								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Hành động
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{orders.length > 0 ? (
								orders.map((order, index) => (
									<tr key={order.paymentID}>
										<td className="px-4 py-4 whitespace-nowrap">
											<div className="text-sm text-center text-gray-900">
												{index + 1}
											</div>
										</td>
										<td className="px-4 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												#{order.paymentID}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div>
													<div className="text-sm font-medium text-gray-900">
														{order.name}
													</div>
													<div className="text-sm text-gray-500">
														{order.email}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{format(
													new Date(order.createdAt),
													'HH:mm:ss | dd/MM/yyyy'
												)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900 text-left">
												{parseInt(order.total).toLocaleString('en')} vnđ
											</div>
										</td>
										<td className="px-3 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900 text-center">
												{order.method}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{order.status === 1
												? 'Đang chuẩn bị hàng'
												: order.status === 2
												? 'Đang giao hàng'
												: order.status === 3 && 'Thành công'}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<div className="flex space-x-4 justify-center">
												<button
													onClick={() => handleShowFormDetailOrder(order)}
													className="text-blue-400 hover:text-blue-900"
												>
													<svg
														className="w-5 h-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
														/>
													</svg>
												</button>
												<button
													onClick={() => handleDeleteOrder(order._id)}
													className="text-red-600 hover:text-red-900"
												>
													<svg
														className="w-5 h-5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td>Trống</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Orders
