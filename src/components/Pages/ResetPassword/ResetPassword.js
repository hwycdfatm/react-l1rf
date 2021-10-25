import React, { useEffect, useState } from 'react'
import userAPI from '../../../api/userAPI'
import { useParams, Link, useHistory } from 'react-router-dom'
const ResetPassword = () => {
	const [checkExp, setCheckExp] = useState(false)
	const [password, setPassword] = useState('')
	const [repassword, setRepassword] = useState('')
	const [errors, setErrors] = useState('')
	const { token } = useParams()
	const history = useHistory()
	useEffect(() => {
		const checkTokenExp = async () => {
			try {
				await userAPI.getUser(token)
				setCheckExp(true)
			} catch (error) {
				setCheckExp(false)
			}
		}
		checkTokenExp()
	}, [token])
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (password.length < 6 || repassword.length < 6)
				return setErrors('Mật khẩu tối thiểu 6 ký tự')
			if (password !== repassword) return setErrors('Mật khẩu phải giống nhau')
			const result = await userAPI.resetPassword({ password, token })
			alert(result.message)
			history.push('/login')
		} catch (error) {
			setErrors(error.message)
		}
	}
	return (
		<div className="max-w-lg mx-auto bg-transparent py-5 md:px-5 h-70v">
			{!checkExp ? (
				<div className="px-8 pt-6 pb-8 mb-4 text-red-400">
					<div className="flex justify-center ">
						<svg
							className="w-56 h-56"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<div className="text-center my-5">
						<p className="text-2xl font-maven font-semibold">
							Phiên đã hết hạn
						</p>
					</div>
					<div className="text-center">
						<Link to="/" className="text-blue-300 underline">
							Quay lại trang chủ
						</Link>
					</div>
				</div>
			) : (
				<form
					onSubmit={handleSubmit}
					className="px-8 pt-6 pb-8 mb-4 bg-transparent rounded"
				>
					{errors && (
						<div className="rounded-lg p-5 bg-red-400 mb-6 text-center animate-bounce mt-3">
							<span className="text-white font-maven text-lg font-semibold">
								{errors}
							</span>
						</div>
					)}
					<div className="mb-6">
						<label
							className="block mb-4 text-sm font-bold text-gray-700 dark:text-white"
							htmlFor="password"
						>
							Mật khẩu
						</label>
						<input
							className={`w-full px-3 py-2 text-base leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-500 dark:text-white`}
							id="password"
							type="password"
							placeholder="Nhập mật khẩu mới"
							onFocus={() => setErrors('')}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="mb-6">
						<label
							className="block mb-4 text-sm font-bold text-gray-700 dark:text-white"
							htmlFor="repassword"
						>
							Nhập lại mật khẩu
						</label>
						<input
							className={`w-full px-3 py-2 text-base leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-500 dark:text-white`}
							id="repassword"
							type="password"
							onFocus={() => setErrors('')}
							placeholder="Nhập lại mật khẩu nào"
							onChange={(e) => setRepassword(e.target.value)}
						/>
					</div>
					<div className="mb-8 text-center">
						<button
							className="w-full px-4 py-2 font-bold text-white bg-green-300 rounded-lg hover:bg-green-500 focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Đặt lại mật khẩu
						</button>
					</div>
				</form>
			)}
		</div>
	)
}

export default ResetPassword
