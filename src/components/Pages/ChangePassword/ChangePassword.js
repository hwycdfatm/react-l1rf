import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import userAPI from '../../../api/userAPI'
import Seo from '../../../utils/Seo'

import { GlobalState } from '../../../GlobalState'
const ChangePassword = () => {
	const { token } = useContext(GlobalState)

	const [errorMesage, setErrorMessage] = useState('')
	function removeMsg() {
		setErrorMessage('')
	}
	const schema = yup.object().shape({
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
		newpassword: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
		renewpassword: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự')
			.oneOf([yup.ref('newpassword'), null], 'Mật khẩu không hợp lệ'),
	})
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const inputs = [
		{
			type: 'password',
			name: 'password',
			placeholder: 'Mật khẩu hiện tại',
			icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
		},
		{
			type: 'password',
			name: 'newpassword',
			placeholder: 'Nhập lại mật khẩu mới',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
		{
			type: 'password',
			name: 'renewpassword',
			placeholder: 'Mật khẩu mới',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
	]

	const handleSumbitChangePassword = async (data) => {
		try {
			const result = await userAPI.changePassword({ token, data })
			setErrorMessage(
				<div className="w-full text-center bg-blue-300 text-white rounded-md p-2 animate-bounce">
					{result.message}
				</div>
			)
		} catch (error) {
			if (error.status === 'FailPassword') {
				setError(
					'password',
					{
						type: 'manual',
						message: error.message,
					},
					{ shouldFocus: true }
				)
			} else {
				setErrorMessage(
					<div className="w-full text-center bg-red-300 text-white rounded-md p-2 animate-bounce">
						{error.message}
					</div>
				)
			}
		}
	}

	return (
		<div className="w-full pb-32">
			<Seo title="Đổi mật khẩu" />

			<div className="max-w-md bg-transparent mx-auto rounded-lg mt-20 px-5">
				<form
					onSubmit={handleSubmit(handleSumbitChangePassword)}
					className="flex flex-col space-y-6 text-gray-400"
				>
					<h4 className="text-2xl font-normal text-gray-700 dark:text-white mb-2">
						Đổi mật khẩu
						<br />
						<span className="text-sm">
							Bạn nên đặt mật khẩu <strong>MẠNH</strong> mà bạn chưa dùng ở bất
							kì đâu
						</span>
					</h4>

					{errorMesage && errorMesage}
					<div className="flex flex-col space-y-2">
						{inputs.map((e, i) => (
							<div key={i}>
								<div className="mb-2">
									<span className="text-gray-700 dark:text-gray-200">
										{e.placeholder}
									</span>
								</div>
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
										id={e.name}
										name={e.name}
										placeholder={e.placeholder}
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
					<div>
						<Link to="/quen-mat-khau" className="text-blue-400">
							Quên mật khẩu ?
						</Link>
					</div>
					<div className="flex flex-col w-full justify-center space-y-2">
						<button
							type="submit"
							className="w-full font-semibold h-10 bg-green-300 rounded-md text-white outline-none focus:outline-none focus:shadow-outline hover:bg-green-500 transition-all shadow-md"
						>
							Cập nhật
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ChangePassword
