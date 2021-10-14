import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
const ChangePassword = () => {
	const [error, setError] = useState('')
	function removeMsg() {
		setError('')
	}
	const schema = yup.object().shape({
		email: yup
			.string()
			.email('Vui lòng nhập mật khẩu')
			.required('Vui lòng nhập mật khẩu'),
		password: yup
			.string()
			.required('Vui lòng nhập mật khẩu')
			.min(6, 'Mật khẩu phải lớn hơn 6 ký tự'),
	})
	const {
		register,
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
			name: 'password',
			placeholder: 'Mật khẩu mới',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
		{
			type: 'password',
			name: 'password',
			placeholder: 'Nhập lại mật khẩu mới',
			icon: 'M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
		},
	]
	return (
		<div className="w-full pb-32">
			<div className="max-w-md bg-transparent mx-auto rounded-lg mt-20 px-5 py-7">
				<form className="flex flex-col space-y-6 text-gray-400">
					<h1 className="text-2xl font-normal text-gray-700 dark:text-white mb-6">
						Đổi mật khẩu
					</h1>
					{error && errors}
					<div className="flex flex-col space-y-4">
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
							Cập nhật
						</button>
						<span className="text-center">hoặc</span>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ChangePassword
