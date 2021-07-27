import React from 'react'
import Carousel from '../../../utils/Carousel'
const Home = () => {
	const data = [
		{
			image:
				'https://opengraph.githubassets.com/7bd761933361b0b77e6176572e8cf7c338729e88b7f46a870921eb14c0493267/vercel/next.js/issues/10059',
			title: 'Hình 1',
			bgColor: 'bg-blue-300',
		},
		{
			image: 'https://i.morioh.com/210612/018ba891.webp',
			title: 'Hình 2',
			bgColor: 'bg-green-300',
		},
		{
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB-_US32vSSZLXf-XKRDOXCuiRc33bg5c1yw&usqp=CAU',
			title: 'Hình 3',
			bgColor: 'bg-gray-300',
		},
	]

	return (
		<div className="w-full flex flex-col mt-20 dark:text-white transition duration-700 space-y-4">
			<div className="w-full mx-auto">
				<Carousel carousels={data} />
			</div>
		</div>
	)
}

export default Home
