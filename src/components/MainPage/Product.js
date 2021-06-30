import React from 'react'

const Product = () => {
	return (
		<div className="w-full max-w-screen-2xl m-auto pt-24 flex flex-col">
			<div className="flex w-full max-w-screen-xl m-auto border border-gray-600 rounded-md p-4">
				<div className="w-2/4">
					<svg
						className="w-full h-full"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
				</div>
				<div className="w-2/4 flex flex-col">
					<h1>Thông tin sản phẩm</h1>
					<h3 className="font-bold text-3xl">black/Túi xách hiệu con cò</h3>
					<span className="font-semibold">1,500,000vnđ</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt magni
						pariatur placeat aspernatur assumenda quo in tenetur omnis impedit,
						perferendis quos voluptates! Amet consectetur, repudiandae ad
						maiores tempore vero quae. Lorem ipsum dolor, sit amet consectetur
						adipisicing elit. Enim reprehenderit quas ipsum est doloribus
						deserunt quibusdam suscipit et nisi perspiciatis illo recusandae a,
						nam voluptatum, totam dolores cupiditate odio error.
					</p>
					<div className="flex flex-row space-x-4 mt-3">
						<button className="px-5 py-3 text-white bg-blue-300 rounded-md">
							Mua
						</button>
						<button className="px-5 py-3 text-white bg-blue-300 rounded-md">
							Thêm vào giỏ hàng
						</button>
					</div>
				</div>
			</div>
			<div>Các sản phẩm khác</div>
		</div>
	)
}

export default Product
