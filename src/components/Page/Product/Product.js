import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.image || []
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="flex flex-col h-96 rounded-md shadow-lg overflow-hidden"
		>
			<div className="h-5/6 flex items-center justify-center overflow-hidden">
				<img
					src={image[0]}
					alt=""
					className="w-full object-contain transform hover:scale-110 duration-300"
				/>
			</div>
			<div className="py-3 px-2 space-y-2">
				<h1 className="text-base font-semibold truncate">{props.sp.title}</h1>
				<p className="text-sm cursor-auto">{price.toLocaleString('en')} vnđ</p>
			</div>
		</Link>
	)
}

export default Product
