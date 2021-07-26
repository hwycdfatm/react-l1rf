import React from 'react'

const Forget = () => {
	return (
		<div className="w-full max-w-screen-2xl m-auto pt-24">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 m-auto">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Mail
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Nhập email của bạn"
					/>
				</div>
				<div className="w-full max-w-xs">
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="button"
						>
							Lấy lại mật khẩu
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Forget
