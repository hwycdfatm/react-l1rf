import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from './image-not-found.jpg'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.images
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="w-ful flex flex-col border border-gray-100 bg-white transition-all hover:shadow-md transform hover:-translate-y-1 overflow-hidden"
		>
			<div className="h-96 flex justify-center overflow-hidden">
				<img
					src={image[0] ? image[0].url : NotFoundImage}
					alt=""
					className="h-full object-cover"
				/>
			</div>
			<div className="flex flex-col p-3 h-24">
				<h3 className="text-base font-bold">{props.sp.title}</h3>
				<h4 className="text-sm font-bold cursor-default w-max bg-purple-500 px-1 rounded text-gray-200  mt-auto">
					{price.toLocaleString('en')} vnđ
				</h4>
			</div>
		</Link>
	)
}

export default Product
