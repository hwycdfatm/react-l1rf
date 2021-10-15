import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import userAPI from '../../../api/userAPI'

const ForgortPassword = () => {
	const [email, setEmail] = useState('')
	const [checkMail, setCheckMail] = useState(false)
	const [errorMail, setErrorMail] = useState('')
	const [successMail, setSuccessMail] = useState('')
	const handleCheckMail = (e) => {
		const value = e.target.value
		setEmail(value)
		setErrorMail('')
		const check = validateEmail(value)
		if (!check || value === '') return setCheckMail(true)
		return setCheckMail(false)
	}

	const handleSubmitForgortPassWord = async (e) => {
		e.preventDefault()
		try {
			if (checkMail) return
			const result = await userAPI.forgortPassword({ email })
			setSuccessMail(
				<div className="bg-blue-400 p-2 rounded-lg text-center mb-4 -mt-4 text-white animate-bounce">
					<span>{result.message}</span>
				</div>
			)
		} catch (error) {
			setErrorMail(
				<div className="bg-red-400 p-2 rounded-lg text-center mb-4 -mt-4 text-white animate-bounce">
					<span>{error.message}</span>
				</div>
			)
		}
	}
	const validateEmail = (email) => {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return regex.test(String(email).toLowerCase())
	}

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

			<form
				onSubmit={handleSubmitForgortPassWord}
				className="px-8 pt-6 pb-8 mb-4 bg-transparent rounded"
			>
				{errorMail && errorMail}
				{successMail && successMail}
				<div className="mb-6">
					<label
						className="block mb-4 text-sm font-bold text-gray-700 dark:text-white"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className={`w-full px-3 py-2 text-base leading-tight text-gray-700 border ${
							checkMail && 'border-red-500'
						} rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-500 dark:text-white`}
						id="email"
						type="text"
						onChange={(e) => handleCheckMail(e)}
						onFocus={() => {
							setCheckMail(false)
							setErrorMail('')
						}}
						placeholder="Nhập email của bạn ở đây"
					/>
					{checkMail && (
						<span className="text-sm ml-2 mt-2 block text-red-500">
							Vui lòng nhập email
						</span>
					)}
				</div>
				<div className="mb-8 text-center">
					<button
						className="w-full px-4 py-2 font-bold text-white bg-green-300 rounded-lg hover:bg-green-500 focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Đặt lại mật khẩu
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
