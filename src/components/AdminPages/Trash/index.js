import React from 'react'
import { useParams } from 'react-router'
import ProductTrash from './ProductTrash'
import OrderTrash from './OrderTrash'
import UserTrash from './UserTrash'
const Trash = () => {
	const { option } = useParams()
	return (
		<div className="mt-10 lg:mt-0 lg:ml-56 p-3 flex flex-col space-y-4 relative">
			{option === 'user' ? (
				<UserTrash />
			) : option === 'products' ? (
				<ProductTrash />
			) : (
				option === 'orders' && <OrderTrash />
			)}
		</div>
	)
}

export default Trash
