import React from 'react'
import { Link } from 'react-router-dom'

const ForgortPassword = () => {
	return (
		<div className="max-w-lg mx-auto bg-transparent py-5 md:px-5">
			<div className="px-8 mb-4 text-center pt-8">
				<h3 className="pt-4 mb-4 text-2xl dark:text-white">
					Bạn quên mật khẩu?
				</h3>
				<p className="mb-4 text-sm text-gray-700 dark:text-white">
					Không sao, chúng ta có thể lấy lại được mật khẩu thông qua email đã
					đăng ký của bạn mà. Zui lên ik...!!
				</p>
			</div>
			<form className="px-8 pt-6 pb-8 mb-4 bg-transparent rounded">
				<div className="mb-8">
					<label
						className="block mb-4 text-sm font-bold text-gray-700 dark:text-white"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="w-full px-3 py-2 text-base leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-500 dark:text-white"
						id="email"
						type="email"
						placeholder="Nhập email của bạn ở đây"
					/>
				</div>
				<div className="mb-8 text-center">
					<button
						className="w-full px-4 py-2 font-bold text-white bg-green-300 rounded-lg hover:bg-green-500 focus:outline-none focus:shadow-outline"
						type="button"
					>
						Reset Password
					</button>
				</div>
				<hr className="mb-6 border-t" />
				<div className="text-center mb-2">
					<Link
						className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
						to="/register"
					>
						Tạo tài khoản!
					</Link>
				</div>
				<div className="text-center">
					<Link
						className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
						to="/login"
					>
						Bạn đã có tài khoản? Đăng nhập ngay!
					</Link>
				</div>
			</form>
		</div>
	)
}

export default ForgortPassword
