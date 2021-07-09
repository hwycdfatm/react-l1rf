import React, { useState } from 'react'

const Product = () => {
	const [count, setCount] = useState(1)
	const images = [
		{
			title: 'Quần jean cực phẩm',
			path: 'https://storage.googleapis.com/cdn.nhanh.vn/store/7136/ps/20210202/216202141650_IMG_1712.jpg',
		},
		{
			title: 'Quần jean đen',
			path: 'https://bizweb.dktcdn.net/100/394/479/products/qj09.jpg?v=1605429667157',
		},
		{
			title: 'test',
			path: 'https://ann.com.vn/wp-content/uploads/10190-clean-04dedcd06a118c4fd500.png',
		},
		{
			title: 'QUần 2',
			path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR94n7W30-g6tmZyp-NLRqt6tOc6MTt8iyyUg&usqp=CAU',
		},
	]

	const [currentImg, setCurrentImg] = useState(images[0].path)

	return (
		<div className="pt-20 flex flex-col">
			<div className="flex flex-col p-1 w-full max-w-screen-lg mx-auto overflow-hidden md:flex-row md:space-x-4">
				<div className="w-full h-96 md:w-1/2 rounded overflow-hidden flex items-center justify-center md:h-70v">
					<img
						src={currentImg}
						alt=""
						className="w-full h-full object-contain"
					/>
				</div>
				<div className="w-full flex flex-col px-5 space-y-4 text-sm md:text-base md:w-1/2">
					<h1
						title="Quần jean rách gối ultimate vjp pr0 m1"
						className="text-xl font-semibold mt-4 md:text-2xl"
					>
						Quần jean rách gối ultimate vjp pr0 m1
					</h1>
					<span>
						Đây là quả quần jean chui vào lòng đất như bọn navi và được bán liên
						tục như cách bọn U cà bán độ vậy
					</span>
					<p className="font-medium mt-8">1,200,000 vnđ</p>
					<div className="flex order-first items-center justify-center space-x-2 md:order-none md:justify-start">
						{images.map((image, index) => (
							<div
								onClick={() => setCurrentImg(image.path)}
								className="h-14 w-14 cursor-pointer"
								key={index}
							>
								<img
									src={image.path}
									alt={image.title}
									className="object-contain w-full h-full"
								/>
							</div>
						))}
					</div>
					<div className="flex items-center space-x-4">
						<span>Số lượng</span>
						<div className="flex bg-gray-100 rounded items-center overflow-hidden">
							<button
								onClick={() => setCount(count > 1 ? count - 1 : count)}
								className="p-1 px-2 hover:bg-gray-200"
							>
								<span>-</span>
							</button>
							<input
								type="number"
								id="quantity"
								className="w-12 text-center bg-transparent focus:outline-none focus:shadow-outline"
								value={count}
								onChange={(e) =>
									setCount(e.target.value > 100 ? 100 : +e.target.value)
								}
								min="1"
							/>
							<button
								onClick={() => setCount(count + 1)}
								className="p-1 px-2 hover:bg-gray-200"
							>
								<span>+</span>
							</button>
						</div>
					</div>
					<div className="flex flex-row space-x-4 text-base">
						<button className="px-4 py-2 bg-gray-900 rounded font-semibold text-white">
							Mua
						</button>
						<button className="px-4 py-2 text-gray-900 bg-gray-100 rounded font-semibold ">
							Thêm vào giỏ hàng
						</button>
					</div>
				</div>
			</div>
			<div className="flex md:border-gray-300 px-2 mt-10 relative h-40">
				<button className="absolute top-20 p-2">
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
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
				<div className="flex ml-5 overflow-y-hidden overflow-x-scroll items-center p-2 md:slider space-x-2">
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
					<div className="flex flex-col p-2 rounded-sm bg-gray-100 items-center">
						<svg
							className="w-20 h-30"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
						<p>Quần jean đẹp</p>
					</div>
				</div>
				<button className="absolute right-0 top-20 p-2">
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
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default Product
