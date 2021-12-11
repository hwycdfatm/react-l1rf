import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from '../../../GlobalState'

import paymentAPI from '../../../api/paymentAPI'

import { format } from 'date-fns'
import { toast } from 'react-toastify'
const OrderTrash = () => {
	const { token } = useContext(GlobalState)

	const [ordersDeleted, setOrderDeleted] = useState([])

	useEffect(() => {
		const fetchOrdersDeteled = async () => {
			try {
				const result = await paymentAPI.getAllPaymentsDeleted({ token })
				if (result.status === 'Success') {
					setOrderDeleted(result.order)
				}
			} catch (error) {
				toast(error.message, { type: 'error', position: 'top-right' })
			}
		}
		fetchOrdersDeteled()
	}, [token])

	const handleRestoreOrder = async (_id) => {
		try {
			const res = await paymentAPI.restorePayment({ _id, token })
			if (res.status === 'Success') {
				toast(res.message, { type: 'success', position: 'top-center' })
				setOrderDeleted([...ordersDeleted.filter((e) => e._id !== _id)])
			}
		} catch (error) {
			toast(error.message, { type: 'error', position: 'top-right' })
		}
	}

	const handleDeletedForceOrder = async (_id) => {
		try {
			if (!window.confirm('Bạn có chắc chắn muốn xóa')) return
			const res = await paymentAPI.deleteForcePayment({ _id, token })
			if (res.status === 'Success') {
				toast(res.message, { type: 'success', position: 'top-center' })
				setOrderDeleted([...ordersDeleted.filter((e) => e._id !== _id)])
			}
		} catch (error) {
			toast(error.message, { type: 'error', position: 'top-right' })
		}
	}
	return (
		<div>
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
					{ordersDeleted.length > 0 ? (
						ordersDeleted.map((order, index) => (
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
											<div className="text-sm text-gray-500">{order.email}</div>
										</div>
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">
										{format(new Date(order.createdAt), 'HH:mm:ss | dd/MM/yyyy')}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900 text-left">
										{parseInt(order.total).toLocaleString('en')} vnđ
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
											onClick={() => handleRestoreOrder(order._id)}
											className="text-blue-400 hover:text-blue-900"
										>
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
													d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
												/>
											</svg>
										</button>
										<button
											onClick={() => handleDeletedForceOrder(order._id)}
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
							<div>Trống</div>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default OrderTrash
