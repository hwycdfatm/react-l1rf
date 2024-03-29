import React, { useContext, useEffect, useState } from 'react'
import userAPI from '../../api/userAPI'
import DetailUser from './DetailUser'
import { GlobalState } from '../../GlobalState'
import { toast } from 'react-toastify'
const AllUsers = () => {
	const [users, setUsers] = useState([])
	const [showForm, setShowForm] = useState(false)
	const [detailUser, setDetailUser] = useState('')

	const handleShowFormDetailUser = (user) => {
		setShowForm(true)
		setDetailUser(user)
	}
	const { token } = useContext(GlobalState)
	useEffect(() => {
		async function fetchAllUsers() {
			try {
				const res = await userAPI.getAllUsers({ token, sort: 'createdAt' })
				setUsers([...res.users])
			} catch (error) {
				toast(error.message, { type: 'error', position: 'top-right' })
			}
		}
		fetchAllUsers()
	}, [token, showForm])

	const handleUpdateUser = async ({ _id, role, activate }) => {
		try {
			const result = await userAPI.updateRoleAndActivate({
				token,
				_id,
				role,
				activate,
			})
			console.log(result)
			if (result.status === 'Success') {
				toast(result.message, { type: 'success', position: 'top-center' })
				setShowForm(false)
			}
		} catch (error) {
			toast(error.message, { type: 'error', position: 'top-right' })
		}
	}

	const handleDeleteUser = async (_id) => {
		try {
			const result = await userAPI.delete({
				token,
				_id,
			})
			if (result.status === 'Success') {
				toast(result.message, { type: 'success', position: 'top-center' })
				setShowForm(false)
				setUsers((pre) => [...pre.filter((user) => user._id !== _id)])
			}
		} catch (error) {
			toast(error.message, { type: 'error', position: 'top-right' })
		}
	}

	showForm
		? document.body.classList.add('overflow-hidden')
		: document.body.classList.remove('overflow-hidden')
	return (
		<>
			{showForm && (
				<DetailUser
					userDetail={detailUser}
					setShowForm={setShowForm}
					handleUpdateUser={handleUpdateUser}
				/>
			)}
			<div className="mt-10 lg:mt-0 lg:ml-56">
				<div className="py-2 overflow-auto scrollbar">
					<table className="min-w-full divide-y divide-gray-200 rounded-lg">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									STT
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Tài khoản
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Địa chỉ
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Số điện thoại
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Quyền
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Trạng thái
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									Hành động
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{users?.map((user, index) => (
								<tr key={user._id}>
									<td className="px-4 py-4 whitespace-nowrap">
										<div className="text-sm text-center text-gray-900">
											{index + 1}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div>
												<div className="text-sm font-medium text-gray-900">
													{user.name}
												</div>
												<div className="text-sm text-gray-500">
													{user.email}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{user.address ? user.address : 'Chưa cập nhật'}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{user.phone ? user.phone : 'Chưa cập nhật'}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm text-gray-900">
											{user.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{user.activate ? (
											<div className="text-sm text-green-400">Hoạt động</div>
										) : (
											<div className="text-sm text-red-400">Khóa</div>
										)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
										<div className="flex space-x-4 w-full justify-center">
											<button
												onClick={() => handleShowFormDetailUser(user)}
												className="text-indigo-600 hover:text-indigo-900"
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
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													/>
												</svg>
											</button>

											<button
												onClick={() => handleDeleteUser(user._id)}
												className="text-red-600 hover:text-red-900"
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
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default AllUsers
