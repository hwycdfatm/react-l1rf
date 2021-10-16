import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import MoMoIcon from '../../../images/momoicon.png'
import CodIcon from '../../../images/codicon.png'
import { Helmet } from 'react-helmet'
import Checkout from './Checkout'

const Cart = () => {
	const { cart, removeProduct, user } = useContext(GlobalState)
	const [tempTotal, setTempTotal] = useState(0)
	const ship = 50000
	const total = tempTotal + ship
	const [quantity, setQuantity] = useState(0)
	const [methodPaid, setMethodPaid] = useState('')
	const [checkout, setCheckout] = useState(false)

	useEffect(() => {
		const getTotal = () => {
			const total = cart.reduce((prev, item) => {
				return prev + item.price * item.quantity
			}, 0)
			setTempTotal(total)
		}
		const getLength = () => {
			const total = cart.reduce((prev, item) => {
				return prev + item.quantity
			}, 0)
			setQuantity(total)
		}
		getLength()
		getTotal()
	}, [cart])

	if (checkout && methodPaid !== '')
		return (
			<Checkout
				user={user}
				order={cart}
				method={methodPaid}
				setCheckout={setCheckout}
				total={total}
			/>
		)
	return (
		<div className="w-full max-w-screen-xl mx-auto px-2 lg:px-8 xl:p-0 lg:mt-2">
			<Helmet>
				<title>Giỏ hàng</title>
			</Helmet>
			<div className=" h-full md:h-screen bg-transparent rounded-lg ">
				<div className="grid grid-cols-12 gap-2 lg:gap-4 xl:gap-5">
					<div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-8">
						{cart.length >= 1 ? (
							cart.map((items, index) => (
								<CartItem
									key={index}
									item={items}
									removeProduct={removeProduct}
								/>
							))
						) : (
							<div className="flex justify-center items-center h-32 py-4 text-gray-700 dark:text-white">
								Bạn ơi giỏ hàng đang trống, bạn hãy mua đồ nhé !! 🤔
							</div>
						)}
						<Link to={'/'} className="flex text-gray-700 dark:text-white">
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
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							<h3>Tiếp tục mua hàng</h3>
						</Link>
					</div>
					<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 2xl:col-span-4">
						<div className="bg-white dark:bg-darkBgColor transition-all text-gray-700 dark:text-white py-4 px-4 border border-gray-200 shadow-md rounded-lg my-4">
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Tổng số lượng hàng</p>
								</div>
								<div className="text-lg py-2">
									<p>{quantity} </p>
								</div>
							</div>
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Tạm tính</p>
								</div>
								<div className="text-lg py-2">
									<p>{tempTotal.toLocaleString('en')} vnđ</p>
								</div>
							</div>
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Phí vận chuyển</p>
								</div>
								<div className="text-lg py-2">
									<p>{ship.toLocaleString('en')} vnđ</p>
								</div>
							</div>
							<div className="flex justify-between mb-2">
								<div className="text-lg py-2">
									<p>Tổng giá tiền</p>
								</div>
								<div className="text-lg py-2">
									<p>{total.toLocaleString('en')} vnđ</p>
								</div>
							</div>
						</div>
						<div className="space-y-4 py-2 text-gray-700 dark:text-white transition-all border rounded-lg p-3 shadow-md">
							<h2 className="text-lg pt-2">Phương thức thanh toán</h2>
							<div className="flex flex-col space-y-3 ml-4 pb-3">
								<div className="flex items-center justify-center space-x-4 w-full">
									<input
										type="radio"
										id="momo"
										checked={methodPaid === 'momo'}
										className="appearance-none w-5 h-5 rounded-full border-2 outline-none checked:bg-blue-400"
										onChange={(e) => setMethodPaid(e.target.id)}
									/>
									<label
										htmlFor="momo"
										className="flex-1 flex items-center justify-between pr-6"
									>
										<span className="text-md">Thanh toán Momo</span>
										<img
											src={MoMoIcon}
											alt=""
											className="w-10 h-10 rounded-lg shadow-lg object-cover"
										/>
									</label>
								</div>
								<div className="flex items-center justify-center space-x-4 w-full">
									<input
										type="radio"
										id="cod"
										checked={methodPaid === 'cod'}
										className="appearance-none w-5 h-5 rounded-full border-2 outline-none checked:bg-blue-400"
										onChange={(e) => setMethodPaid(e.target.id)}
									/>
									<label
										htmlFor="cod"
										className="flex-1 flex items-center justify-between pr-6"
									>
										<span className="text-md">Thanh toán khi nhận hàng</span>
										<img
											src={CodIcon}
											alt=""
											className="w-10 h-10 rounded-lg shadow-lg object-cover"
										/>
									</label>
								</div>
							</div>
						</div>

						<div
							onClick={() => setCheckout(true)}
							className="bg-green-400 cursor-pointer py-4 border-2 border-green-400 text-center text-white hover:text-green-400 font-bold  px-4 rounded-lg my-4 hover:bg-white dark:hover:bg-black"
						>
							Tiến hành thanh toán
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
