import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
	return (
		<div className="mt-16 bg-white p-3">
			<h1 className="py-5 text-2xl font-semibold text-center">
				Chào mừng bạn đến với shop l1rf!
			</h1>
			<div className="rounded-md shadow-md max-w-md mx-auto p-3 flex flex-col space-y-10">
				<div className="flex flex-col space-y-4 text-gray-400">
					<h4 className="text-center text-xl">Đăng ký</h4>
					<div className="flex items-center h-10 rounded-md border border-gray-100">
						<label htmlFor="username" className="text-gray-400 p-1 ml-1">
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
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</label>
						<input
							type="text"
							placeholder="Họ tên của bạn là gì ?"
							id="username"
							className="outline-none flex-1 ml-2 font-normal"
						/>
					</div>
					<div className="flex items-center h-10 rounded-md border border-gray-100">
						<label htmlFor="username" className="text-gray-400 p-1 ml-1">
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
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</label>
						<input
							type="text"
							placeholder="Địa chỉ nhà bạn ở đâu ?"
							id="address"
							className="outline-none flex-1 ml-2 font-normal"
						/>
					</div>
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
							type="text"
							placeholder="Email"
							id="email"
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
							className="outline-none flex-1 ml-2 font-normal"
						/>
					</div>
					<div className="flex items-center h-10 rounded-md border border-gray-100">
						<label htmlFor="repassword" className="p-1 ml-1">
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
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								/>
							</svg>
						</label>
						<input
							type="password"
							placeholder="Bạn vui lòng nhập lại mật khẩu"
							id="repassword"
							className="outline-none flex-1 ml-2 font-normal"
						/>
					</div>
					<div>
						<input type="checkbox" id="remember" />
						<label htmlFor="remember" className="ml-2">
							Tôi đồng ý với các điều khoản
						</label>
					</div>

					<button className="mx-auto w-32 p-2 bg-blue-300 rounded-md text-white outline-none focus:outline-none focus:shadow-outline">
						Đăng ký
					</button>
					<div className="pt-2 flex flex-row  font-medium text-sm space-x-2">
						<span>Đã có tài khoản ?</span>
						<Link to="/login" className="text-blue-300">
							Đăng nhập ngay
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
