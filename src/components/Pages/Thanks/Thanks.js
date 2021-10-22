import React, { useEffect, useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import userAPI from '../../../api/userAPI'
import paymentAPI from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'

function useQuery() {
	return new URLSearchParams(useLocation().search)
}
const Thanks = () => {
	const { setCart, token } = useContext(GlobalState)
	let query = useQuery()
	// const token = query.get('token')
	const id = query.get('id')
	const [success, setSuccess] = useState(true)
	useEffect(() => {
		const checkOrder = async () => {
			try {
				const result = await paymentAPI.getForUser({ token })
				console.log(result.order)
				const check = result.order.every((order) => order.paymentID !== id)
				if (!check) {
					await userAPI.handleCart([], token)
					setCart([])
					setSuccess(true)
				} else {
					setSuccess(false)
				}
			} catch (error) {
				setSuccess(false)
			}
		}
		checkOrder()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	console.log(success)
	return (
		<div className="flex flex-col w-full max-w-5xl mx-auto pt-4 pb-8 h-screen">
			<div className="mx-auto text-center">
				<p className="text-center text-5xl font-maven mt-3">
					{success ? 'Cảm ơn bạn đã mua hàng' : 'Đơn hàng không tồn tại'}
				</p>

				<div className="text-green-300 my-10">
					<svg
						className="w-56 h-56 mx-auto"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<p className="mb-10 mt-5 font-maven">
					Cảm ơn bạn đã mua hàng tại L1rf Store, thật vinh hạnh khi được nhận
					đơn đặt hàng từ bạn, nó làm mình cảm thầy thật tuyệt vời sao 4 tháng
					để mình làm ra sản phẩm là trang web này để bạn mua đó ^^
				</p>
				<p className="font-maven">Chúc bạn một ngày tốt lành</p>

				<Link
					to="/"
					className="mt-10 mx-auto inline-flex items-center space-x-2 text-blue-400 underline"
				>
					<span>Trở về trang chủ</span>
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
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</Link>
			</div>
		</div>
	)
}

export default Thanks
