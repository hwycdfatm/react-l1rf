import React, { useEffect, useState } from 'react'
import ViewPayment from './ViewPayment'
const Tabs = ({ paymentList }) => {
	const [openTab, setOpenTab] = useState(0)
	const [readyPayment, setReadyPayment] = useState([])
	const [transportPay, setTransportPay] = useState([])
	const [successPayment, setSuccessPayment] = useState([])

	useEffect(() => {
		setReadyPayment(paymentList?.filter((payment) => payment.status === 1))
		setTransportPay(paymentList?.filter((payment) => payment.status === 2))
		setSuccessPayment(paymentList?.filter((payment) => payment.status === 3))
	}, [paymentList])
	const dataButton = [
		{
			text: 'Tất cả',
			icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
		},
		{
			text: 'Chuẩn bị',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
		},
		{
			text: 'Đang giao',
			icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0',
		},
		{
			text: 'Thành công',
			icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
		},
	]

	return (
		<div>
			<div className="w-full border rounded-lg flex flex-col overflow-hidden space-y-2 md:pt-2">
				{/* Tabs */}
				<div className="flex">
					{dataButton.map((button, index) => (
						<button
							key={index}
							onClick={() => setOpenTab(index)}
							className={`flex w-1/4 flex-col-reverse p-1 items-center justify-center rounded-lg bg-white md:border ${
								index === openTab
									? 'text-green-400 xs:text-white xs:bg-green-500'
									: ''
							} xs:flex-row xs:space-x-2  xs:mx-2 xs:h-10 xs:space-x-4 xs:bg-opacity-40 outline-none focus:outline-none focus:shadow-outline`}
						>
							<span className="text-xs mt-2 xs:text-base xs:mt-0">
								{button.text}
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d={button.icon}
								/>
							</svg>
						</button>
					))}
				</div>
				{/* Shows */}
				<div className="bg-white mx-2">
					{openTab === 0 ? (
						<ViewPayment list={paymentList} />
					) : openTab === 1 ? (
						<ViewPayment list={readyPayment} />
					) : openTab === 2 ? (
						<ViewPayment list={transportPay} />
					) : (
						openTab === 3 && <ViewPayment list={successPayment} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Tabs
