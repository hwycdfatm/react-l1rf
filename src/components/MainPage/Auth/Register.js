import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
	return (
		<div className="w-full max-w-screen-2xl m-auto pt-24">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 m-auto">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Tên đăng nhập
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="mail"
					>
						Mail
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="mail"
						type="text"
						placeholder="Mail"
					/>
				</div>
				<div className="w-full max-w-xs">
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Mật khẩu
						</label>
						<input
							className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="******************"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="repassword"
						>
							Nhập lại mật khẩu
						</label>
						<input
							className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="repassword"
							type="password"
							placeholder="******************"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
						>
							Đăng ký
						</button>
						<Link
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							to="/login"
						>
							Đã có tài khoản ?
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Register
