import React from 'react'
import CartItem from './CartItem'

const Cart = () => {
	return (
		<div className="container mx-auto mt-16">
			<div className="bg-white h-full md:h-screen mt-1">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 2xl:col-span-8">
						<CartItem />
					</div>
					<div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
						<div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Classic Ads</p>
								</div>
								<div className="text-lg py-2">
									<div className="flex flex-row space-x-2 w-full items-center rounded-lg">
										<button className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M18 12H6"
												/>
											</svg>
										</button>
										<p> 0 </p>
										<button className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>

							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Standout Ads</p>
								</div>
								<div className="text-lg py-2">
									<div className="flex flex-row space-x-2 w-full items-center rounded-lg">
										<button className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M18 12H6"
												/>
											</svg>
										</button>
										<p> 0 </p>
										<button className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>

							<div className="flex justify-between border-b-2 mb-2">
								<div className="text-lg py-2">
									<p>Premium Ads</p>
								</div>
								<div className="text-lg py-2">
									<div className="flex flex-row space-x-2 w-full items-center rounded-lg">
										<button className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M18 12H6"
												/>
											</svg>
										</button>
										<p> 0 </p>
										<button className="focus:outline-none bg-pink-700 hover:bg-pink-800 text-white font-bold py-1 px-1 rounded-full inline-flex items-center ">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 6v6m0 0v6m0-6h6m-6 0H6"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>

							<div className="flex justify-center items-center text-center">
								<div className="text-xl font-semibold">
									<p>Total Item</p>
									<p className="text-5xl">0</p>
								</div>
							</div>
						</div>
						<div className="bg-white py-4 px-4 shadow-md rounded-lg my-4 mx-4">
							<div className="flex justify-center items-center text-center">
								<div className="text-xl font-semibold">
									<p>Total Price</p>
									<p className="text-5xl">0</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
