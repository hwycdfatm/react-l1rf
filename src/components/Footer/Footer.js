import React from 'react'

const Footer = () => {
	return (
		<div className="bg-gray-700 flex flex-col p-5 text-white">
			<div className="flex flex-col items-center justify-center p-3 mt-6">
				<strong className="text-2xl text-red-500">Miễn trừ trách nhiệm</strong>
				<p className="break-words text-xs text-center">
					Trang web dành cho <strong>BAITAPLON</strong> nên mọi chức năng trong
					trang web
					<strong> không có tính thương mại</strong>.
				</p>
			</div>
		</div>
	)
}

export default Footer
