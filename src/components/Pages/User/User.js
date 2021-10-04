import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'
import Skeleton from 'react-loading-skeleton'
import PaymentContainer from './PaymentContainer'
const User = () => {
	const { user, token, refreshToken } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])
	const [load, setLoad] = useState(false)
	useEffect(() => {
		const fetchPayment = async () => {
			try {
				setLoad(true)
				const result = await paymentApi.getForUser({ token })
				if (result.status === 'Success') {
					setPaymentList(result.order)
					setLoad(false)
				} else if (result.status === 'exptoken') {
					refreshToken()
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchPayment()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	return (
		<div className="w-full max-w-screen-xl mx-auto bg-transparent transition duration-500 flex flex-col p-1 xl:p-0 xl:pb-2 space-y-5">
			<div className="flex flex-wrap">
				<div className="w-full md:w-4/12 xl:w-3/12 md:pr-3">
					<div className="flex flex-col p-4 font-maven bg-white border rounded-lg">
						<div>
							<img
								src="https://vietwebgroup.vn/admin/uploads/wibu-la-gi-nguon-goc-cua-wibu.png"
								alt=""
							/>
						</div>
						<p>Thông tin cá nhân</p>
						<div className="flex flex-col font-sm space-y-2 mt-2">
							{load ? (
								<>
									<Skeleton height={20} width={200} />
									<Skeleton height={20} />
									<Skeleton height={20} width={170} />
									<Skeleton height={20} width={140} />
								</>
							) : (
								<>
									<span>Email: {user.email}</span>
									<span>Địa chỉ: {user.address}</span>
									<span>Số điện thoại: {user.phone}</span>
								</>
							)}
						</div>
					</div>
				</div>
				<div className="w-full mt-5 md:mt-0 md:w-8/12 xl:w-9/12">
					<PaymentContainer paymentList={paymentList} />
				</div>
			</div>
		</div>
	)
}

export default User
