import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../api/paymentAPI'
import productAPI from '../../api/productAPI'
import userAPI from '../../api/userAPI'
import { GlobalState } from '../../GlobalState'
const DashBoard = () => {
	const { token } = useContext(GlobalState)
	const [totalProducts, setTotalProducts] = useState(0)
	const [totalPayment, setTotalPayment] = useState(0)
	const [totalIncome, setTotalIncome] = useState(0)
	const [totalUsers, setTotalUsers] = useState(0)
	useEffect(() => {
		async function fetchTotalProducts() {
			const result = await productAPI.getAll()
			setTotalProducts(result.pagination._total_Product)
		}
		async function fetchTotalPayment() {
			const result = await paymentApi.getAllPayements({ token })
			setTotalPayment(result.length)
			setTotalIncome(result.total)
		}
		async function fetchTotalUsers() {
			const result = await userAPI.getAllUsers({ token })
			setTotalUsers(result.users.length)
		}
		fetchTotalUsers()
		fetchTotalPayment()
		fetchTotalProducts()
	}, [token])

	return (
		<div className="lg:ml-56 mt-10 lg:mt-0 w-full min-h-screen flex flex-col">
			<section className="flex p-3 lg:p-5">
				<div className="w-full flex flex-wrap ">
					<div className="w-full px-3 sm:w-1/2 xl:w-1/4 h-32">
						<div className="flex items-center px-5 py-6 shadow-lg border rounded-lg bg-white h-full">
							<div className="p-2 text-gray-600">
								<svg
									className="w-10 h-10"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-xl font-semibold text-gray-600">
									{totalProducts}
								</h4>
								<div className="text-gray-500">Sản phẩm</div>
							</div>
						</div>
					</div>

					<div className="w-full mt-6 px-3 sm:w-1/2 xl:w-1/4 sm:mt-0 h-32">
						<div className="flex items-center px-5 py-6 shadow-lg border rounded-lg bg-white h-full">
							<div className="p-2 text-gray-600">
								<svg
									className="w-10 h-10"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-xl font-semibold text-gray-600">
									{totalPayment}
								</h4>
								<div className="text-gray-500">Hóa đơn</div>
							</div>
						</div>
					</div>

					<div className="w-full mt-6 px-3 sm:w-1/2 xl:w-1/4 xl:mt-0 h-32">
						<div className="flex items-center px-5 py-6 shadow-lg border rounded-lg bg-white h-full">
							<div className="p-3 text-gray-600">
								<svg
									className="w-10 h-10"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-xl font-semibold text-gray-600">
									{totalUsers}
								</h4>
								<div className="text-gray-500">Thành viên</div>
							</div>
						</div>
					</div>
					<div className="w-full mt-6 px-3 sm:w-1/2 xl:w-1/4 xl:mt-0 h-32">
						<div className="flex items-center px-5 py-6 shadow-lg border rounded-lg bg-white h-full">
							<div className="p-2 text-gray-600">
								<svg
									className="w-10 h-10"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>

							<div className="mx-5">
								<h4 className="text-xl font-semibold text-gray-600">
									{parseInt(totalIncome).toLocaleString('en')}
								</h4>
								<div className="text-gray-500">Doanh thu</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default DashBoard
