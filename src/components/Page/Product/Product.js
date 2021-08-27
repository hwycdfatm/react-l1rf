import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from './image-not-found.jpg'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.images
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="flex flex-col h-auto bg-white p-3 rounded-2xl shadow-lg hover:shadow-xl space-y-2 overflow-hidden"
		>
			<div className="h-80 flex items-center rounded-lg justify-center overflow-hidden">
				<img
					src={image[0] ? image[0].url : NotFoundImage}
					alt=""
					className="h-full object-cover transform hover:scale-110 duration-300 "
				/>
			</div>
			<div className="space-y-2">
				<h3 className="text-base font-bold truncate">{props.sp.title}</h3>
				<h4 className="text-sm font-bold cursor-auto text-gray-800">
					{price.toLocaleString('en')} vnđ
				</h4>
			</div>
		</Link>
	)
}

export default Product
