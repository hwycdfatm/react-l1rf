import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem'
import paymentAPI from '../../../api/paymentAPI'
import userAPI from '../../../api/userAPI'
import { GlobalState } from '../../../GlobalState'
const Cart = () => {
	const { cart, removeProduct, user, token, setCart } = useContext(GlobalState)
	const [tempTotal, setTempTotal] = useState(0)
	const ship = 50000
	const total = tempTotal + ship
	const [quantity, setQuantity] = useState(0)

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
	const emptyCart = async () => {
		await userAPI.handleCart([], token)
	}
	const handlePayment = async () => {
		if (!user.address) {
			return alert('Vui lòng cập nhật nơi ở của bạn')
		}
		try {
			const result = await paymentAPI.create(
				{ order: cart, user, total, quantity },
				token
			)
			if (result.status === 'Success') {
				setCart([])
				emptyCart()
				alert(result.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="w-full max-w-screen-xl mx-auto px-2 lg:px-8 xl:p-0">
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
							<div className="flex justify-center items-center h-32 py-4">
								Bạn ơi giỏ hàng đang trống, bạn hãy mua đồ nhé !! 🤔
							</div>
						)}
					</div>
					<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
						<div className="bg-white py-4 px-4 border border-gray-200 shadow-md rounded-lg md:my-4">
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

						<div
							onClick={handlePayment}
							className="bg-white cursor-pointer py-4 border border-gray-200 shadow-md text-center font-bold  px-4 rounded-lg my-4 dark:bg-red-500"
						>
							Thanh toán COD
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
