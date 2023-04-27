import React from 'react'
import { Link } from 'react-router-dom'
import ImageFallBack from '../../Image'

const Product = (props) => {
	const price = parseInt(props.sp.price)
	const image = props.sp.images
	const grid = props.grid
	return (
		<Link
			to={`/product/${props.sp.slug}`}
			className={`my-1 px-1 ${
				grid ? 'w-full' : 'w-1/2'
			} sm:w-1/3 md:my-2 md:px-2 md:w-1/4 lg:w-1/5 xl:w-1/6 transition-all`}>
			<div className="flex flex-col w-full bg-transparent dark:text-white h-full overflow-hidden transition-all">
				<div className={`${grid ? '' : 'h-56'} xs:h-72`}>
					<ImageFallBack
						src={image[0].url}
						alt={props.sp.title}
						loading="lazy"
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
