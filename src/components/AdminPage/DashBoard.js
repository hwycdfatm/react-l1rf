import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../api/paymentAPI'
import productAPI from '../../api/productAPI'
import { GlobalState } from '../../GlobalState'
const DashBoard = () => {
	const { token } = useContext(GlobalState)
	const [totalProducts, setTotalProducts] = useState(0)
	const [totalPayment, setTotalPayment] = useState(0)
	const [totalIncome, setTotalIncome] = useState(0)
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

		fetchTotalPayment()
		fetchTotalProducts()
	}, [token])

	return (
		<div className="lg:ml-56 mt-10 lg:mt-0 w-full min-h-screen flex flex-col">
			<section className="flex gap-4 p-5">
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng số lượng sản phẩm</h4>
					<h1 className="text-4xl font-noto font-bold">{totalProducts}</h1>
				</div>
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng số hóa đơn</h4>
					<h1 className="text-4xl font-noto font-bold">{totalPayment}</h1>
				</div>
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng tiền kiếm được</h4>
					<h1 className="text-4xl font-noto font-bold">
						{parseInt(totalIncome).toLocaleString('en')} vnđ
					</h1>
				</div>
			</section>
			<section className="grid grid-cols-12 gap-2 lg:gap-4 xl:gap-5 p-5">
				<div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-8 bg-blue-300 rounded-lg shadow-lg overflow-hidden">
					<div>Left</div>
				</div>
				<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4 bg-red-300 rounded-lg shadow-lg overflow-hidden">
					<div>Right</div>
				</div>
			</section>
		</div>
	)
}

export default DashBoard
