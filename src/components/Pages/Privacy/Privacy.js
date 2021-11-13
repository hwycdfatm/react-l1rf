import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import assectAPI from '../../../api/assectAPI'
export default function Privacy() {
	const [assect, setAssect] = useState({})
	useEffect(() => {
		const fetchAssect = async () => {
			try {
				const result = await assectAPI.get()
				setAssect(result.data[0])
			} catch (error) {
				console.log(error)
			}
		}
		fetchAssect()
	}, [])
	return (
		<div className="dark:text-white mt-1 w-full">
			<Helmet>
				<title>Điều khoản dịch vụ</title>
			</Helmet>
			<h1 className="text-center ">ĐIỀU KHOẢN DỊCH VỤ </h1>
			<p
				style={{ whiteSpace: 'pre-line' }}
				className="px-2 xs:px-5 md:px-7 lg:px-10 pb-10 mx-auto max-w-screen-lg"
			>
				{assect.privacy}{' '}
			</p>
		</div>
	)
}
