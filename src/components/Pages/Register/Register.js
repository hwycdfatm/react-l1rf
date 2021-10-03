import React, { useContext, useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userAPI from '../../../api/userAPI'
import LoadingBtn from '../../../utils/LoadingBtn'
const Register = () => {
	const { login } = useContext(GlobalState)
	const [noti, setNoti] = useState('')
	const [registerSend, setRegisterSend] = useState(false)
	// check privacy
	const [privacy, setPrivacy] = useState(false)
	// định nghĩa các rule
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
	const schema = yup.object().shape({
		phone: yup
			.string()
			.matches(phoneRegExp, 'Vui lòng nhập số điện thoại')
			.length(10, 'Số điện thoại chỉ có 10 số thôiii')
			.required('Vui lòng nhập số điện thoại'),
		email: yup.string().required('Vui lòng nhập email'),
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
		repassword: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự')
			.oneOf([yup.ref('password'), null], 'Mật khẩu không hợp lệ'),
		name: yup.string().required('Vui lòng nhập tên của bạn'),
		address: yup.string().required('Vui lòng nhập địa chỉ'),
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

	// init form field
	const formInit = [
		{
			name: 'name',
			type: 'text',
			placeholder: 'Họ tên bạn là gì ?',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
		},
		{
			name: 'address',
			type: 'text',
			placeholder: 'Địa chỉ nhà bạn ở đâu ?',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
		},
		{
			name: 'phone',
			type: 'number',
			placeholder: 'Vui lòng nhập số điện thoại ?',
			icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
		},
		{
			name: 'email',
			type: 'email',
			placeholder: 'Email của bạn là gì ?',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Mật khẩu ?',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
		{
			name: 'repassword',
			type: 'password',
			placeholder: 'Vui lòng nhập lại mật khẩu',
			icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
		},
	]

	const history = useHistory()
	const handleHistory = () => {
		history.push('/login')
	}

	const handleRegister = async (data) => {
		try {
			setRegisterSend(true)
			const result = await userAPI.register(data)
			if (result.status === 'Success') {
				setNoti(
					<div className="text-center py-1 bg-blue-400 text-white animate-bounce rounded bg-opacity-70">
						{result.message}
						<br />
						Hệ thống sẽ tự chuyển đến trang đăng nhập sau 5 giây
					</div>
				)
				setRegisterSend(false)
				setTimeout(handleHistory, 5000)
			}
		} catch (err) {
			setRegisterSend(false)
			setNoti(
				<div className="text-center py-1 bg-red-400 text-white animate-bounce rounded bg-opacity-70">
					{err.response.data.message}
				</div>
			)
		}
	}

	if (login) return <Redirect to="/" />
	return (
		<div className="w-full bg-white p-3 pb-20">
			<h1 className="py-5 text-2xl font-semibold text-center">
				Chào mừng bạn đến với shop l1rf!
			</h1>
			<div className="max-w-md mx-auto p-3 flex flex-col space-y-10">
				<form
					onSubmit={handleSubmit(handleRegister)}
					className="flex flex-col space-y-4 text-gray-400"
				>
					{noti && noti}
					{formInit.map((data, index) => (
						<div key={index}>
							<div className="flex items-center h-10 rounded-md border border-gray-100">
								<label htmlFor={data.name} className="text-gray-400 p-1 ml-1">
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
											d={data.icon}
										/>
									</svg>
								</label>
								<input
									type={data.type}
									placeholder={data.placeholder}
									id={data.name}
									name={data.name}
									{...register(data.name)}
									className="outline-none flex-1 ml-2 font-normal h-full appearance-none bg-none"
								/>
							</div>
							<div className="text-sm mt-2 ml-4 text-red-500">
								{errors[data.name]?.message}
							</div>
						</div>
					))}

					<div>
						<input
							type="checkbox"
							id="remember"
							onChange={() => setPrivacy(!privacy)}
						/>
						<label htmlFor="remember" className="ml-2">
							Tôi đồng ý với các{' '}
							<Link to="/dieu-khoan" className="text-blue-300">
								điều khoản
							</Link>
						</label>
					</div>

					<button
						type="submit"
						disabled={registerSend}
						className="w-32 mx-auto font-semibold h-10 bg-green-300 rounded-md text-white outline-none focus:outline-none focus:shadow-outline hover:bg-green-500 transition-all shadow-md"
					>
						{registerSend ? <LoadingBtn /> : 'Đăng ký'}
					</button>
					<div className="pt-2 flex flex-row  font-medium text-sm space-x-2">
						<span>Đã có tài khoản ?</span>
						<Link to="/login" className="text-blue-300">
							Đăng nhập ngay
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
