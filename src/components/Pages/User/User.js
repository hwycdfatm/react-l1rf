import React, { useContext, useEffect, useState } from 'react'
import paymentApi from '../../../api/paymentAPI'
import { GlobalState } from '../../../GlobalState'
import Skeleton from 'react-loading-skeleton'
import PaymentContainer from './PaymentContainer'
import userAPI from '../../../api/userAPI'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import Modal from '../../../utils/Modal/Modal'
import useModal from '../../../utils/Modal/useModal'
const User = () => {
	const { user, token, refreshToken, getUser } = useContext(GlobalState)
	const [paymentList, setPaymentList] = useState([])
	const [load, setLoad] = useState(false)

	const [updateProfile, setUpdateProfile] = useState(false)

	const [userTemp, setUserTemp] = useState({
		name: user.name,
		address: user.address,
		phone: user.phone,
	})
	const [isShowing, toggle] = useModal()

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

	const [text, setText] = useState('')

	const handleUpdateProfile = async () => {
		try {
			const result = await userAPI.updateProfile({ data: userTemp, token })
			if (result.status === 'Success') {
				setText(result.message)
				toggle()
				getUser()
				setUpdateProfile(false)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="w-full max-w-screen-xl mx-auto bg-transparent transition duration-500 flex flex-col p-1 xl:p-0 xl:pb-2 space-y-5">
			<Modal isShowing={isShowing} hide={toggle} text={text} type="ok" />
			<Helmet>
				<title>Trang cá nhân của {userTemp.name}</title>
			</Helmet>
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
						{updateProfile ? (
							<div className="flex flex-col font-sm space-y-2 mt-2">
								<span>Tên:</span>
								<input
									value={userTemp.name}
									onChange={(e) => {
										setUserTemp({ ...userTemp, name: e.target.value })
									}}
									className="border text-base rounded py-1 px-2 outline-none focus:outline-none focus:shadow-outline"
									type="text"
								/>
								<span>Địa chỉ: </span>
								<input
									value={userTemp.address}
									onChange={(e) => {
										setUserTemp({ ...userTemp, address: e.target.value })
									}}
									className="border text-base rounded py-1 px-2 outline-none focus:outline-none focus:shadow-outline"
									type="text"
								/>
								<span>Số điện thoại</span>
								<input
									value={userTemp.phone}
									onChange={(e) => {
										setUserTemp({ ...userTemp, phone: e.target.value })
									}}
									className="border text-base rounded py-1 px-2 outline-none focus:outline-none focus:shadow-outline"
									type="text"
								/>
							</div>
						) : (
							<div className="flex flex-col font-sm space-y-2 mt-2">
								{load ? (
									<>
										<Skeleton height={20} width={200} />
										<Skeleton height={20} width={200} />
										<Skeleton height={20} />
										<Skeleton height={20} width={170} />
										<Skeleton height={20} width={140} />
									</>
								) : (
									<>
										<span>Tên: {user.name}</span>
										<span>Email: {user.email}</span>
										<span>
											Địa chỉ: {user.address ? user.address : 'Chưa cập nhật'}
										</span>
										<span>
											Số điện thoại: {user.phone ? user.phone : 'Chưa cập nhật'}
										</span>
									</>
								)}
							</div>
						)}
						{updateProfile ? (
							<button
								onClick={handleUpdateProfile}
								className="p-2 border mt-4 rounded-lg"
							>
								Cập nhật thông tin cá nhân
							</button>
						) : (
							<button
								onClick={() => setUpdateProfile(!updateProfile)}
								className="p-2 border mt-4 rounded-lg"
							>
								Chỉnh sửa thông tin cá nhân
							</button>
						)}
						<Link
							to="/doi-mat-khau"
							className="p-2 border mt-4 rounded-lg text-center"
						>
							Đổi mật khẩu
						</Link>
					</div>
				</div>
				<div className="w-full mt-5 md:mt-0 md:w-8/12 xl:w-9/12">
					<PaymentContainer paymentList={paymentList} load={load} />
				</div>
			</div>
		</div>
	)
}

export default User
