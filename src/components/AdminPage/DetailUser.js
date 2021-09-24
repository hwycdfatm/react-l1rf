import React, { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { useDetectOutsideClick } from '../../utils/useDetectOutsideClick'
const DetailUser = ({ userDetail, setShowForm, handleUpdateUser }) => {
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
	const [userRole, setUserRole] = useState('member')
	const [userActivate, setUserActivate] = useState(false)
	const handleDropdown = () => setIsActive(!isActive)
	const { _id, name, email, address, phone, role, cart, createdAt, activate } =
		userDetail
	useEffect(() => {
		setUserActivate(activate)
		setUserRole(role)
	}, [role, activate])
	return (
		<div className="fixed z-20 mt-11 lg:mt-0 lg:pl-56 bg-white w-full h-full bg-opacity-80 font-maven overflow-y-scroll scrollbar animation-down">
			<div className="flex flex-col my-3">
				<div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-4 mx-6 my-3 lg:space-x-10">
					<div className="rounded-lg border shadow-lg p-5 w-full lg:w-7/12 bg-white">
						<h4 className="text-lg font-medium cursor-default">
							Thông tin khách hàng
						</h4>
						<div className="pl-3 mt-2 space-y-1">
							<p className="text-base text-gray-600">Tên: {name}</p>
							<p className="text-base text-gray-600">Email: {email} </p>
							<p className="text-base text-gray-600">
								Số điện thoại: {phone ? phone : 'Chưa cập nhật'}
							</p>
							<p className="text-base text-gray-600">
								Địa chỉ: {address ? address : 'Chưa cập nhật'}
							</p>
							<p className="text-base text-gray-600">
								Tham gia: {format(new Date(createdAt), 'HH:mm:ss | dd/MM/yyyy')}
							</p>
						</div>
					</div>
					<div className="w-full md:w-5/12 bg-white">
						<div className="rounded-lg border shadow-lg p-5 w-full space-y-4">
							<div className="space-y-2">
								<h4 className="font-medium cursor-default">
									Thay đổi quyền hạn
								</h4>
								<div className="flex w-full relative">
									<button
										to="#"
										ref={dropdownRef}
										onClick={handleDropdown}
										className="w-full flex items-center uppercase justify-between border h-9 px-2 text-sm rounded-md dark:text-white"
									>
										<span>
											{userRole === 'admin' ? 'Quản trị viên' : 'Thành viên'}
										</span>
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
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</button>

									{isActive && (
										<div className="absolute top-10 left-0 w-full rounded-md shadow-md bg-white dark:bg-gray-700 transform origin-top animation-down">
											<button
												onClick={() => setUserRole('member')}
												className="text-left font-medium text-sm uppercase hover:bg-gray-300 rounded-md p-2 w-full"
											>
												Thành viên
											</button>
											<button
												onClick={() => setUserRole('admin')}
												className="text-left font-medium text-sm uppercase hover:bg-gray-300 rounded-md p-2 w-full"
											>
												Quản trị viên
											</button>
										</div>
									)}
								</div>
							</div>
							<div className="space-y-2">
								<div className="flex w-full">
									<button
										onClick={() =>
											handleUpdateUser({
												_id,
												activate: userActivate,
												role: userRole,
											})
										}
										className="w-full bg-green-300 text-white uppercase h-10 px-2 font-semibold text-sm lg:text-base rounded-md dark:text-white"
									>
										Cập nhật
									</button>
								</div>
								<div className="flex w-full">
									<button
										onClick={() => setShowForm(false)}
										className="w-full bg-red-300 text-white uppercase h-10 font-semibold px-2 text-sm lg:text-base rounded-md dark:text-white"
									>
										Hủy
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col space-y-6 md:space-y-0  md:flex-row mx-6 my-6 md:space-x-4 lg:space-x-10">
					<div className="rounded-lg border flex flex-col shadow-lg p-5 w-full md:w-8/12 bg-white">
						<h4 className="font-medium cursor-default">
							Giỏ hàng hiện tại của khách hàng
						</h4>
						{cart && cart.length > 0 ? (
							cart.map((item) => (
								<div
									key={item._id}
									className="bg-white py-4 px-4 border border-gray-200 rounded-lg my-4 flex overflow-hidden"
								>
									<div className="h-16 w-14 flex items-center justify-center mr-6 ">
										<img
											src={item.images[0].url}
											alt=""
											className="h-full object-contain rounded"
										/>
									</div>
									<div className="flex flex-1 justify-between items-center">
										<div className="text-base font-semibold">
											<p>{item.title}</p>

											<p className="text-gray-400 text-sm">
												{parseInt(item.price).toLocaleString('en')}vnđ
												<span className="ml-2 font-light">
													x{item.quantity}
												</span>
											</p>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-sm text-center mt-5 cursor-default">
								Không có sản phẩm nào trong giỏ hàng
							</p>
						)}
					</div>
					<div className="rounded-lg border shadow-lg p-5 w-full md:w-4/12 bg-white">
						<h4 className="font-medium">Trạng thái tài khoản</h4>
						<div className="flex flex-col space-y-2 p-3">
							<label
								htmlFor="disable"
								className="flex items-center space-x-4 px-1"
							>
								<input
									type="radio"
									name="userActive"
									id="disable"
									onChange={() => setUserActivate(true)}
									checked={userActivate === true}
									className="appearance-none border rounded-full border-gray-700 w-3 h-3 checked:bg-green-300"
								/>
								<p className="text-green-500">Hoạt động</p>
							</label>
							<label
								htmlFor="active"
								className="flex items-center space-x-4 px-1"
							>
								<input
									type="radio"
									name="userActive"
									id="active"
									checked={userActivate !== true}
									onChange={() => setUserActivate(false)}
									className="appearance-none border rounded-full border-gray-700 w-3 h-3 checked:bg-red-300"
								/>
								<p className="text-red-500">Khóa</p>
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DetailUser
