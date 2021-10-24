import React, { useContext, useEffect, useState } from 'react'
import paymentAPI from '../../../api/paymentAPI'
import PaypalBtn from './PaypalBtn'
import { GlobalState } from '../../../GlobalState'
import { Helmet } from 'react-helmet-async'

import axios from 'axios'
const Checkout = ({ order, method, total, setCheckout, quantity }) => {
	const { token, setCart, user } = useContext(GlobalState)

	const { name, email, phone, address } = user

	const [totalPaypal, setTotalPaypal] = useState(0)
	const [show, setShow] = useState(false)

	useEffect(() => {
		const getCurrencyConverter = async () => {
			const result = await axios.get(
				'https://free.currconv.com/api/v7/convert?q=VND_USD&compact=ultra&apiKey=ab40abe35a686c41d81c'
			)
			setTotalPaypal(Math.floor(result.data.VND_USD * total))
			setShow(true)
		}
		method === 'paypal' && getCurrencyConverter()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [total])

	const handlePayment = async () => {
		try {
			const result = await paymentAPI.create(
				{ order, total, quantity, method, user },
				token
			)
			if (result.status === 'Success') {
				setCart([])

				alert(result.message)
				setCheckout(2)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handlePaymentMomo = () => {
		alert('Hệ thống hiện đang phát triển')
	}

	const tranSuccess = async () => {
		try {
			const result = await paymentAPI.create(
				{ order, total, quantity, method, user },
				token
			)
			if (result.status === 'Success') {
				setCart([])

				alert(result.message)

				setCheckout(2)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="flex flex-col w-full max-w-5xl mx-auto pt-4 pb-8">
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<div className="mx-6 my-2 flex justify-between">
				<p className="text-xl text-left">Check Out</p>
				<button
					onClick={() => setCheckout(false)}
					className="flex items-center"
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
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span>Trở về</span>
				</button>
			</div>
			<div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-4 mx-6 my-3 lg:space-x-8">
				<div className="rounded-lg border shadow-lg p-5 w-full bg-white lg:w-7/12">
					<h1 className="text-lg font-semibold ">Thông tin khách hàng</h1>
					<div className="pl-3 mt-2 space-y-1">
						<p className="text-base text-gray-600">{name}</p>
						<p className="text-base text-gray-600">{email}</p>
						<p className="text-base text-gray-600">{phone}</p>
						<p className="text-base text-gray-600">{address}</p>
					</div>
				</div>
				<div className="rounded-lg border shadow-lg p-5 w-full bg-white lg:w-5/12">
					<div className="px-3 flex flex-col space-y-4">
						<div className="text-base text-gray-600 w-full">
							<span>Phương thức thanh toán:</span>
							<p className="text-lg ml-3">{String(method).toUpperCase()}</p>
						</div>
						<div className="text-base text-gray-600 w-full">
							<span>Tổng số tiền phải trả:</span>
							<p className="text-3xl ml-3">
								{parseInt(total).toLocaleString('en')} vnđ
							</p>
							{method === 'paypal' && (
								<p className="text-gray-500 ml-3 text-sm">
									({parseInt(totalPaypal).toLocaleString('en')} USD )
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-6 mx-6 my-4">
				<div className="rounded-lg border shadow-lg p-5 w-full bg-white">
					Các sản phẩm: ({quantity})
					{order &&
						order.map((item) => (
							<div
								key={item._id}
								className="bg-white py-2 px-2 border border-gray-200 rounded-lg my-4 flex overflow-hidden"
							>
								<div className="h-16 w-16 flex items-center justify-center mr-6 ">
									<img
										src={item.images[0].url}
										alt={token}
										className="h-full object-contain rounded"
									/>
								</div>
								<div className="flex flex-1 justify-between items-center">
									<div className="text-base font-semibold">
										<p>{item.title}</p>

										<p className="text-gray-400 text-sm">
											{parseInt(item.price).toLocaleString('en')}vnđ
											<span className="ml-2 font-light">x{item.quantity}</span>
										</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className="mx-6 my-4 ">
				{method === 'paypal' ? (
					show ? (
						<PaypalBtn total={totalPaypal} tranSuccess={tranSuccess} />
					) : (
						<div
							style={{ maxWidth: '750px', height: '50px' }}
							className="w-full bg-gray-300 rounded mx-auto"
						/>
					)
				) : (
					<button
						onClick={() => {
							method === 'cod'
								? handlePayment()
								: method === 'momo' && handlePaymentMomo()
						}}
						style={{ maxWidth: '750px' }}
						className="bg-green-300 p-3 mx-auto block rounded-lg w-full shadow-lg border-2 border-transparent hover:border-green-300 hover:bg-white text-white hover:text-green-400 transition-all font-semibold  outline-none focus:outline-none focus:shadow-outline"
					>
						THANH TOÁN
					</button>
				)}
			</div>
		</div>
	)
}

export default Checkout
