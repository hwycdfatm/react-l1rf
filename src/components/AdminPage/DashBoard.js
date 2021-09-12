import React from 'react'

const DashBoard = () => {
	return (
		<div className="lg:ml-56 mt-10 lg:mt-0 w-full min-h-screen flex flex-col">
			<section className="flex gap-4 p-5">
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng số lượng sản phẩm</h4>
					<h1 className="text-4xl font-noto font-bold">120</h1>
				</div>
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng sản phẩm bán được</h4>
					<h1 className="text-4xl font-noto font-bold">10000</h1>
				</div>
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng số hóa đơn</h4>
					<h1 className="text-4xl font-noto font-bold">1</h1>
				</div>
				<div className="w-full space-y-2 text-white rounded-lg overflow-hidden bg-blue-300 p-3 shadow-lg">
					<h4>Tổng tiền kiếm được</h4>
					<h1 className="text-4xl font-noto font-bold">1,000,000,000 vnđ</h1>
				</div>
			</section>
			<section className="grid grid-cols-12 gap-2 lg:gap-4 xl:gap-5 p-5">
				<div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-8 bg-blue-300 rounded-lg shadow-lg overflow-hidden">
					<div>Left</div>
				</div>
				<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4 bg-red-300 rounded-lg shadow-lg overflow-hidden">
					<div>Right</div>
				</div>
			</section>
		</div>
	)
}

export default DashBoard
