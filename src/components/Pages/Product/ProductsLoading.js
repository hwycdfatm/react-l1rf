import React from 'react'
import Skeleton from 'react-loading-skeleton'
const ProductLoading = (props) => {
	const { grid } = props
	return (
		<>
			<div
				className={`my-1 px-1 ${
					grid ? 'w-full' : 'w-1/2'
				} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}
			>
				<div className="flex flex-col w-full bg-transparent h-full overflow-hidden transition-all space-y-2">
					<div className="h-56 xs:h-64 sm:h-56 md:h-64">
						<Skeleton height="100%" />
					</div>
					<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
						<p className="uppercase font-bold">
							<Skeleton />
						</p>
						<p>
							<Skeleton width={100} />
						</p>
					</div>
				</div>
			</div>
			<div
				className={`my-1 px-1 ${
					grid ? 'w-full' : 'w-1/2'
				} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}
			>
				<div className="flex flex-col w-full bg-transparent h-full overflow-hidden transition-all space-y-2">
					<div className="h-56 xs:h-64 sm:h-56 md:h-64">
						<Skeleton height="100%" />
					</div>
					<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
						<p className="uppercase font-bold">
							<Skeleton />
						</p>
						<p>
							<Skeleton width={100} />
						</p>
					</div>
				</div>
			</div>
			<div
				className={`my-1 px-1 ${
					grid ? 'w-full' : 'w-1/2'
				} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}
			>
				<div className="flex flex-col w-full bg-transparent h-full overflow-hidden transition-all space-y-2">
					<div className="h-56 xs:h-64 sm:h-56 md:h-64">
						<Skeleton height="100%" />
					</div>
					<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
						<p className="uppercase font-bold">
							<Skeleton />
						</p>
						<p>
							<Skeleton width={100} />
						</p>
					</div>
				</div>
			</div>
			<div
				className={`my-1 px-1 ${
					grid ? 'w-full' : 'w-1/2'
				} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}
			>
				<div className="flex flex-col w-full bg-transparent h-full overflow-hidden transition-all space-y-2">
					<div className="h-56 xs:h-64 sm:h-56 md:h-64">
						<Skeleton height="100%" />
					</div>
					<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
						<p className="uppercase font-bold">
							<Skeleton />
						</p>
						<p>
							<Skeleton width={100} />
						</p>
					</div>
				</div>
			</div>
			<div
				className={`my-1 px-1 ${
					grid ? 'w-full' : 'w-1/2'
				} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}
			>
				<div className="flex flex-col w-full bg-transparent h-full overflow-hidden transition-all space-y-2">
					<div className="h-56 xs:h-64 sm:h-56 md:h-64">
						<Skeleton height="100%" />
					</div>
					<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
						<p className="uppercase font-bold">
							<Skeleton />
						</p>
						<p>
							<Skeleton width={100} />
						</p>
					</div>
				</div>
			</div>
			<div
				className={`my-1 px-1 ${
					grid ? 'w-full' : 'w-1/2'
				} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}
			>
				<div className="flex flex-col w-full bg-transparent h-full overflow-hidden transition-all space-y-2">
					<div className="h-56 xs:h-64 sm:h-56 md:h-64">
						<Skeleton height="100%" />
					</div>
					<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
						<p className="uppercase font-bold">
							<Skeleton />
						</p>
						<p>
							<Skeleton width={100} />
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProductLoading
