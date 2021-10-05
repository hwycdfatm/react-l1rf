import React from 'react'
import Skeleton from 'react-loading-skeleton'
const PaymentSkeleton = () => {
	return (
		<div className="flex flex-col space-y-2 last:mb-2">
			<div className="flex flex-col overflow-hidden font-maven bg-gray-100 bg-opacity-50 p-2">
				<div className="items-center h-6 flex justify-between">
					<span className="text-sm md:text-base">
						<Skeleton />
					</span>
					<span className="bg-red-300 text-white px-1 text-sm">
						<Skeleton />
					</span>
				</div>
				<div className="flex flex-col space-y-1">
					<div className="flex space-x-4 pb-1 border-b">
						<div className="w-16 h-16 border">
							<Skeleton />
						</div>
						<div className="flex flex-col">
							<p className="font-semibold">
								<Skeleton />
							</p>
							<span className="text-xs md:text-sm">
								<Skeleton />
							</span>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-center h-8">
					<span className="text-xs md:text-sm">
						<Skeleton />
					</span>
					<span className="text-sm md:text-base">
						<Skeleton />
					</span>
				</div>
			</div>
		</div>
	)
}

export default PaymentSkeleton
