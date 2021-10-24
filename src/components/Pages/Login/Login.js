import React, { useContext, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'

import FacebookLogin from 'react-facebook-login'
import { GlobalState } from '../../../GlobalState'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userAPI from '../../../api/userAPI'
import LoadingBtn from '../../../utils/LoadingBtn'
import { Helmet } from 'react-helmet-async'
const Login = () => {
	const { login, setLogin } = useContext(GlobalState)
	const [error, setError] = useState('')
	const [loader, setLoader] = useState(false)

	const history = useHistory()

	function removeMsg() {
		setError('')
	}

	// định nghĩa các rule
	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Vui lòng nhập email')
			.required('Vui lòng nhập email'),
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
		resolver: yupResolver(schema),
	})

	// init input Field value
	const inputs = [
		{
			type: 'text',
			name: 'email',
			placeholder: 'Email',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		},
		{
			type: 'password',
			name: 'password',
			placeholder: 'Mật khẩu',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
	]

	// xử lý đăng nhập bằng tài khoản được tạo
	const loginSubmit = async (user) => {
		try {
			setLoader(true)
			const res = await userAPI.login(user)
			if (res.status === 'Success') {
				setLogin(true)
				setLoader(false)
				history.push('/')
			}
		} catch (err) {
			setLoader(false)
			setError(
				<div className="w-full bg-red-100 rounded text-red-700 py-1 text-center animate-bounce text-opacity-80">
					{err.message}
				</div>
			)
		}
	}
	// xử lý đằng nhập bằng facebook
	const handleLoginFacebook = async (response) => {
		try {
			const res = await userAPI.loginWithFacebook(response)
			if (res.status === 'Success') {
				setLogin(true)
				history.push('/')
			}
		} catch (err) {
			setLogin(false)
			setError(
				<div className="w-full bg-red-100 rounded text-red-700 py-1 text-center animate-bounce text-opacity-80">
					{err.message}
				</div>
			)
		}
	}

	if (login) {
		return <Redirect to="/" />
	}

	return (
		<div className="w-full pb-32">
			<Helmet>
				<title>Đăng nhập</title>
			</Helmet>
			<div className="max-w-md bg-transparent mx-auto rounded-lg mt-20 px-5 py-7">
				<form
					onSubmit={handleSubmit(loginSubmit)}
					className="flex flex-col space-y-6 text-gray-400"
				>
					<h1 className="text-2xl text-center font-normal text-gray-700 dark:text-white mb-6">
						Chào mừng đến với l1rf Shop
					</h1>

					{error && error}
					<div className="flex flex-col space-y-4">
						{inputs.map((e, i) => (
							<div key={i}>
								<div className="flex items-center h-10 rounded-md border border-gray-200 overflow-hidden">
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
										type={e.type}
										placeholder={e.placeholder}
										id={e.name}
										name={e.name}
										onFocus={() => removeMsg()}
										className="h-full outline-none flex-1 ml-1 pl-1 font-normal dark:bg-transparent transition-all bg-white"
										{...register(e.name)}
									/>
								</div>
								<div className="text-sm mt-2 ml-4 text-red-500">
									{errors[e.name]?.message}
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-col w-full justify-center space-y-2">
						<button
							type="submit"
							className="w-full font-semibold h-10 bg-green-300 rounded-md text-white outline-none focus:outline-none focus:shadow-outline hover:bg-green-500 transition-all shadow-md"
						>
							{loader ? <LoadingBtn /> : 'Đăng nhập'}
						</button>
						<span className="text-center">hoặc</span>
						<FacebookLogin
							appId="512680796465992"
							autoLoad={false}
							callback={handleLoginFacebook}
							textButton="Đăng nhập với Facebook"
							cssClass="font-semibold text-center text-white hover:text-red-50 bg-blue-500 p-2 rounded-lg block w-full"
						/>
					</div>

					<div className="flex flex-row text-blue-300 font-medium text-sm justify-between pt-5">
						<Link to="/register">Đăng ký ngay</Link>

						<Link to="/quen-mat-khau">Quên mật khẩu ?</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
