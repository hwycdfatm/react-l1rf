import React from 'react'
const User = () => {
	return (
		<div className="flex mt-16 flex-col">
			<div className="flex items-center flex-col mx-auto space-y-2 bg-gray-100 p-2 w-full">
				<div className="h-28 w-28 rounded-full overflow-hidden border-4 border-red-300">
					<img
						src="https://likeoneringfake.github.io/profile/FB_IMG_1587557586372.jpg"
						alt="avt"
						className="object-contain "
					/>
				</div>
				<div>
					<h1 className="font-semibold font-noto">Mai Trí Toàn</h1>
				</div>
			</div>
			<div className="w-full max-w-screen-md mx-auto">
				<div className="p-2">
					<div>Thông tin giao hàng</div>
					<div className="flex">
						<p>Số điện thoại:</p>
						<input
							type="number"
							maxLength="10"
							value={`0339331767`}
							onChange=""
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default User
