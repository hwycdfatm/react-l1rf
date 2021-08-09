import React, { useContext } from 'react'
import CartItem from './CartItem'
import { GlobalSate } from '../../../GlobalState'
import axios from 'axios'
const Cart = () => {
	const state = useContext(GlobalSate)
	const [cart, setCart] = state.userAPI.cart
	const [token] = state.token
	console.log(cart)
	const addToCart = async (cart) => {
		await axios.patch(
			'/user/addcart',
			{ cart },
			{
				headers: { Authorization: token },
			}
		)
	}
	const removeProduct = (id) => {
		if (window.confirm('Bạn không muốn mua sản phẩm này sao bạn yêu?')) {
			cart.forEach((item, index) => {
				if (item._id === id) {
					cart.splice(index, 1)
				}
			})

			setCart([...cart])
			addToCart(cart)
		}
	}
	return (
		<div className="container mx-auto mt-16">
			<div className="bg-white h-full md:h-screen mt-1">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-8">
						{cart.length >= 1
							? cart.map((items, index) => (
									<CartItem key={index} item={items} fncRM={removeProduct} />
							  ))
							: 'Giỏ hàng trống'}
					</div>
					<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
						<div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Tạm tính</p>
								</div>
								<div className="text-lg py-2">
									<p>1,500,000 vnđ</p>
								</div>
							</div>
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Phí vận chuyển</p>
								</div>
								<div className="text-lg py-2">
									<p>50,000 vnđ</p>
								</div>
							</div>
							<div className="flex justify-between mb-2">
								<div className="text-lg py-2">
									<p>Tổng giá tiền</p>
								</div>
								<div className="text-lg py-2">
									<p>1,550,000 vnđ</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
