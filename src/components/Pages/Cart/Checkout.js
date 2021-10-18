import React, { useContext } from 'react'
// import userAPI from '../../../api/userAPI'
// import paymentAPI from '../../../api/paymentAPI'

import { GlobalState } from '../../../GlobalState'
const Checkout = ({ user, order, method, total, setCheckout }) => {
	const { token } = useContext(GlobalState)

	const { name, email, phone, address } = user

	// const emptyCart = async () => {
	// 	await userAPI.handleCart([], token)
	// }
	// const handlePayment = async () => {
	// 	if (methodPaid === '' || methodPaid === undefined)
	// 		return alert('Vui lòng chọn phương thức thanh toán')
	// 	if (cart.length === 0) return alert('Giỏ hàng bạn đang trống mà :((')
	// 	if (!user.address) {
	// 		return alert('Vui lòng cập nhật nơi ở của bạn')
	// 	}
	// 	try {
	// 		const result = await paymentAPI.create(
	// 			{ order: cart, user, total, quantity, method: methodPaid },
	// 			token
	// 		)
	// 		if (result.status === 'Success') {
	// 			setCart([])
	// 			emptyCart()
	// 			alert(result.message)
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	return (
		<div className="flex flex-col w-full max-w-5xl mx-auto pt-4 pb-8">
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
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-6 mx-6 my-4">
				<div className="rounded-lg border shadow-lg p-5 w-full bg-white">
					Các sản phẩm: (10)
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
			<div className="mx-6 my-4">
				<button className="bg-green-300 p-3 rounded-lg w-full shadow-lg border-2 border-transparent hover:border-green-300 hover:bg-white text-white hover:text-green-400 transition-all font-semibold  outline-none focus:outline-none focus:shadow-outline">
					THANH TOÁN
				</button>
			</div>
		</div>
	)
}

export default Checkout
