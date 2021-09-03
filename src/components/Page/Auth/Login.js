import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import FacebookLogin from 'react-facebook-login'
import { GlobalState } from '../../../GlobalState'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userAPI from '../../../api/userAPI'

const Login = () => {
	const { login, setLogin } = useContext(GlobalState)
	const [error, setError] = useState('')

	function removeMsg() {
		setError('')
	}

	// định nghĩa các rule
	const schema = yup.object().shape({
		email: yup.string().required('Vui lòng nhập email'),
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
	})
	// lấy react hook form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'all',
		resolver: yupResolver(schema),
	})
	// init input Field value
	const inputs = [
		{
			name: 'email',
			placeholder: 'Email',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		},
		{
			name: 'password',
			placeholder: 'Mật khẩu',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
	]
	// xử lý đăng nhập bằng tài khoản được tạo
	const loginSubmit = async (user) => {
		try {
			await userAPI.login(user)
			setLogin(true)
			window.location = '/'
		} catch (err) {
			setError(
				<div className="w-full bg-red-100 rounded text-red-700 py-1 text-center animate-bounce text-opacity-80">
					{err.response.data.message}
				</div>
			)
		}
	}
	// xử lý đằng nhập bằng facebook
	const handleLoginFacebook = async (response) => {
		try {
			await userAPI.loginWithFacebook(response)
			setLogin(true)
			window.location = '/'
		} catch (err) {
			console.log({ err })
		}
	}

	if (login) return <Redirect to="/" />
	return (
		<div className="w-full bg-white p-3">
			<h1 className="pt-10 pb-5 text-2xl font-semibold text-center">
				Chào mừng bạn đến với shop l1rf!
			</h1>
			<div className="rounded-md shadow-md max-w-md mx-auto p-3 flex flex-col space-y-5">
				<div className="flex flex-col space-y-4 text-gray-400">
					<h4 className="text-center font-semibold">Đăng nhập với</h4>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-semibold">
						<FacebookLogin
							appId="512680796465992"
							autoLoad={false}
							callback={handleLoginFacebook}
							textButton="Facebook"
							cssClass="w-full p-2 rounded-md border-2 font-semibold border-gray-300 text-center hover:bg-indigo-400 hover:text-red-50"
						/>
						<button
							onClick={() => alert('Chưa làm')}
							className="p-2 rounded-md border-2 border-gray-300 font-semibold text-center hover:bg-indigo-400 hover:text-red-50 "
						>
							Google
						</button>
					</div>
				</div>

				<form
					onSubmit={handleSubmit(loginSubmit)}
					className="flex flex-col space-y-4 text-gray-400"
				>
					<h4 className="text-center font-semibold">Đăng nhập</h4>
					{error ? error : ''}
					{inputs.map((e, i) => (
						<div key={i}>
							<div className="flex items-center h-10 rounded-md border border-gray-100 overflow-hidden">
								<label htmlFor={e.name} className="p-1 ml-1">
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
											d={e.icon}
										/>
									</svg>
								</label>
								<input
									type={e.name}
									placeholder={e.placeholder}
									id={e.name}
									name={e.name}
									onFocus={() => removeMsg()}
									className="h-full outline-none flex-1 ml-1 pl-1 font-normal"
									{...register(e.name)}
								/>
							</div>
							<div className="text-sm mt-2 ml-4 text-red-500">
								{errors[e.name]?.message}
							</div>
						</div>
					))}

					<button
						type="submit"
						className="mx-auto font-semibold w-32 p-2 bg-blue-300 rounded-md text-white outline-none focus:outline-none focus:shadow-outline hover:bg-blue-500 transition-all"
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
