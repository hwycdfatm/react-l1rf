import React, { useState, useEffect } from 'react'
import assectAPI from '../../../api/assectAPI'
import Skeleton from 'react-loading-skeleton'
import Seo from '../../../utils/Seo'

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
			<Seo title="Điều khoản & dịch vụ" />

			<h1 className="text-center ">ĐIỀU KHOẢN DỊCH VỤ </h1>
			<p
				style={{ whiteSpace: 'pre-line' }}
				className="px-2 xs:px-5 md:px-7 lg:px-10 pb-10 mx-auto max-w-screen-lg"
			>
				{assect.privacy ? (
					assect.privacy
				) : (
					<>
						<Skeleton count={1} />
						<Skeleton count={2} width="95%" />
						<Skeleton count={2} />
						<Skeleton count={2} width="82%" />
						<Skeleton count={2} />
						<Skeleton count={8} width="95%" />
						<Skeleton count={12} width="99%" />
						<Skeleton count={50} />
					</>
				)}
			</p>
		</div>
	)
}
