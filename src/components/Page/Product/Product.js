import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props) => {
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className="flex flex-col h-96 rounded-sm shadow-md p-3 space-y-2"
		>
			<div className="h-5/6 flex items-center justify-center overflow-hidden rounded-md">
				<img
					src={props.sp.image}
					alt=""
					className="h-full object-contain transform hover:scale-110 duration-300"
				/>
			</div>
			<h1 className="text-base font-semibold truncate">{props.sp.title}</h1>
			<p className="text-sm cursor-auto">{props.sp.price} vnđ</p>
		</Link>
	)
}

export default Product
