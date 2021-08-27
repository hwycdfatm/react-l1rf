import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem'
import { GlobalState } from '../../../GlobalState'
const Cart = () => {
	const { cart, removeProduct } = useContext(GlobalState)
	const [tempTotal, setTempTotal] = useState(0)
	const ship = 50000
	const total = tempTotal + ship
	const [length, setLength] = useState(0)
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
			setLength(total)
		}
		getLength()
		getTotal()
	}, [cart])

	return (
		<div className="w-full max-w-6xl mx-auto mt-16 p-2 xl:p-0">
			<div className=" h-full md:h-screen bg-transparent rounded-lg ">
				<div className="grid grid-cols-12 gap-2">
					<div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-8">
						{cart.length >= 1
							? cart.map((items, index) => (
									<CartItem
										key={index}
										item={items}
										removeProduct={removeProduct}
									/>
							  ))
							: 'Giỏ hàng trống'}
					</div>
					<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
						<div className="bg-white py-4 px-4 border border-gray-200 shadow-md rounded-lg my-4 mx-2">
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Tổng số lượng hàng</p>
								</div>
								<div className="text-lg py-2">
									<p>{length} </p>
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
							onClick={() => alert('Đm t chưa có làm tới cái này')}
							className="bg-white cursor-pointer py-4 border border-gray-200 shadow-md text-center font-bold  px-4 rounded-lg my-4 mx-2 lg:mx-2 dark:bg-red-500"
						>
							Thanh toán
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
