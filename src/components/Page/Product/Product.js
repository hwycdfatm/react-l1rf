import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from './image-not-found.jpg'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.images
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="w-ful flex flex-col border border-gray-100 bg-white transition-all transform hover:-translate-y-1 overflow-hidden"
		>
			<div className="w-full md:h-96 lg:h-80 flex justify-center overflow-hidden">
				<img
					src={image[0] ? image[0].url : NotFoundImage}
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="flex-1 px-3 py-2 font-maven">
				<h3 className="text-base font-bold uppercase mb-3">{props.sp.title}</h3>
				<h4 className="text-sm font-medium cursor-default text-gray-700">
					{price.toLocaleString('en')} vnđ
				</h4>
			</div>
		</Link>
	)
}

export default Product
