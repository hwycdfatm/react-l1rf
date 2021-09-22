import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from './image-not-found.jpg'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.images
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="my-1 px-1 w-1/2 overflow-hidden sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all"
		>
			<div className="flex flex-col w-full bg-white dark:bg-gray-700  transform hover:-translate-y-1 transition-all">
				<div className="h-48 sm:h-56 md:h-64">
					<img
						src={image[0] ? image[0].url : NotFoundImage}
						alt=""
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="h-auto py-2 font-maven text-sm font-medium space-y-1 text-gray-700 dark:text-white transition-all">
					<p className="uppercase font-bold">{props.sp.title}</p>
					<p>{price.toLocaleString('en')} vnđ</p>
				</div>
			</div>
		</Link>
	)
}

export default Product
