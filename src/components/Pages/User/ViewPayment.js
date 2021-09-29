import React from 'react'

const ViewPayment = ({ list }) => {
	return (
		<div className="flex flex-col space-y-2 last:mb-2">
			{/* paid items */}
			{list?.map((payment) => (
				<div
					key={payment.paymentID}
					className="flex flex-col overflow-hidden font-maven bg-gray-100 bg-opacity-50 p-2"
				>
					<div className="items-center h-6 flex justify-between">
						<span className="text-sm md:text-base">#{payment.paymentID}</span>
						<span className="bg-red-300 text-white px-1 text-sm">
							{payment.status === 1
								? 'Đang chuẩn bị'
								: payment.status === 2
								? 'Đang vận chuyển'
								: payment.status === 3 && 'Thành công'}
						</span>
					</div>
					<div className="flex flex-col space-y-1">
						{payment.order?.map((order) => (
							<div key={order._id} className="flex space-x-4 pb-1 border-b">
								<div className="w-16 h-16 border">
									<img
										src={order.images[0].url}
										alt={order.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex flex-col">
									<p className="font-semibold">{order.title} </p>
									<span className="text-xs md:text-sm">
										{parseInt(order.price).toLocaleString('en')} vnđ
										<span className="ml-2 text-xs">x{order.quantity}</span>
									</span>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-between items-center h-8">
						<span className="text-xs md:text-sm">
							{payment.quantity} sản phẩm
						</span>
						<span className="text-sm md:text-base">
							Thành tiền: {parseInt(payment.total).toLocaleString('en')}
							vnđ
						</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default ViewPayment
