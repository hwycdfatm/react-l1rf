import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from './image-not-found.jpg'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.images
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="flex flex-col h-96 bg-white rounded-lg shadow-md p-4 hover:shadow-lg space-y-2"
		>
			<div className="h-5/6 flex rounded-lg items-center justify-center overflow-hidden">
				<img
					src={image[0] ? image[0].url : NotFoundImage}
					alt=""
					className="h-full object-cover transform hover:scale-110 duration-300 "
				/>
			</div>
			<div className="space-y-2">
				<h1 className="text-base font-bold truncate">{props.sp.title}</h1>
				<p className="text-base font-semibold cursor-auto">
					{price.toLocaleString('en')} vnđ
				</p>
			</div>
		</Link>
	)
}

export default Product
