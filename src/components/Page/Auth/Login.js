import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login'
import { GlobalState } from '../../../GlobalState'
const Login = () => {
	const { login, setLogin } = useContext(GlobalState)
	const [error, setError] = useState('')
	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const onChangeInput = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}
	function removeMsg() {
		setError('')
	}

	const loginSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/user/login', { ...user })
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
	const handleLoginFacebook = async (response) => {
		try {
			await axios.post('/user/loginwithfacebook', { ...response })
			setLogin(true)
			window.location = '/'
		} catch (err) {
			console.log(err)
		}
	}

	if (login) return <Redirect to="/" />
	return (
		<div className="w-full mt-16 bg-white p-3">
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
					onSubmit={loginSubmit}
					className="flex flex-col space-y-4 text-gray-400"
				>
					<h4 className="text-center font-semibold">Đăng nhập</h4>
					{error ? error : ''}
					<div className="flex items-center h-10 rounded-md border border-gray-100 overflow-hidden">
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
							onFocus={() => removeMsg()}
							className="h-full outline-none flex-1 ml-1 pl-1 font-normal"
						/>
					</div>
					<div className="flex items-center h-10 rounded-md border border-gray-100 overflow-hidden">
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
							onFocus={() => removeMsg()}
							className="h-full outline-none flex-1 ml-1 pl-1 font-normal"
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
