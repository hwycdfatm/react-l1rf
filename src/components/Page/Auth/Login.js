import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const onChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	const loginSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/user/login', { ...user })

			localStorage.setItem('first-login', true)

			window.location.href = '/'
		} catch (err) {
			alert(err.response.data.message)
		}
	}
	return (
		<div className="mt-16 bg-white p-3">
			<h1 className="py-5 text-2xl font-semibold text-center">
				Chào mừng bạn đến với shop l1rf!
			</h1>
			<div className="rounded-md shadow-md max-w-md mx-auto p-3 flex flex-col space-y-10">
				<div className="flex flex-col space-y-4 text-gray-400">
					<h4 className="text-center font-semibold">Đăng nhập với</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-semibold">
						<Link
							to="/"
							className="p-2 rounded-md border-2 border-gray-300 text-center hover:bg-indigo-400 hover:text-red-50 "
						>
							Facebook
						</Link>
						<Link
							to="/"
							className="p-2 rounded-md border-2 border-gray-300 text-center hover:bg-indigo-400 hover:text-red-50 "
						>
							Google
						</Link>
						<Link
							to="/"
							className="p-2 rounded-md border-2 border-gray-300 text-center hover:bg-indigo-400 hover:text-red-50 "
						>
							Github
						</Link>
						<Link
							to="/"
							className="p-2 rounded-md border-2 border-gray-300 text-center hover:bg-indigo-400 hover:text-red-50 "
						>
							Pornhub
						</Link>
					</div>
				</div>
				<form
					onSubmit={loginSubmit}
					className="flex flex-col space-y-4 text-gray-400"
				>
					<div className="flex items-center h-10 rounded-md border border-gray-100">
						<label htmlFor="email" className="text-gray-400 p-1 ml-1">
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
									d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
						</label>
						<input
							type="email"
							placeholder="Email"
							id="email"
							name="email"
							value={user.email}
							onChange={onChangeInput}
							className="outline-none flex-1 ml-2 font-normal"
						/>
					</div>
					<div className="flex items-center h-10 rounded-md border border-gray-100">
						<label htmlFor="password" className="p-1 ml-1">
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
									d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
								/>
							</svg>
						</label>
						<input
							type="password"
							placeholder="Mật khẩu"
							id="password"
							name="password"
							value={user.password}
							onChange={onChangeInput}
							className="outline-none flex-1 ml-2 font-normal"
						/>
					</div>
					<div>
						<input type="checkbox" id="remember" />
						<label htmlFor="remember" className="ml-2">
							Ghi nhớ
						</label>
					</div>

					<button
						type="submit"
						className="mx-auto w-32 p-2 bg-blue-300 rounded-md text-white outline-none focus:outline-none focus:shadow-outline"
					>
						Đăng nhập
					</button>
					<div className="flex flex-row text-blue-300 font-medium text-sm justify-between">
						<Link to="/register">Đăng ký ngay</Link>

						<Link to="/forget_password">Quên mật khẩu ?</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
