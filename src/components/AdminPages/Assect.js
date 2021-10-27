import React, { useContext, useEffect, useState } from 'react'
import assectAPI from '../../api/assectAPI'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
const Asstect = () => {
	const { token } = useContext(GlobalState)
	const [assect, setAssectt] = useState({
		_id: '',
		fb: '',
		rateVNtoUSD: '',
		instagram: '',
		twitter: '',
		ship: '',
		phone: '',
		email: '',
		privacy: '',
		address: '',
	})
	const onChangeInput = (e) => {
		const { name, value } = e.target
		setAssectt({ ...assect, [name]: value })
	}

	const data = [
		{ name: 'address', title: 'Địa chỉ' },
		{ name: 'phone', title: 'Sđt' },
		{ name: 'email', title: 'Email' },
		{ name: 'fb', title: 'Facebook' },
		{ name: 'instagram', title: 'Instagram' },
		{ name: 'twitter', title: 'Twitter' },
		{ name: 'ship', title: 'Ship' },
	]

	useEffect(() => {
		const fetchAssect = async () => {
			try {
				const result = await assectAPI.get()
				setAssectt({
					_id: result.data[0]._id,
					fb: result.data[0].fb,
					rateVNtoUSD: result.data[0].rateVNtoUSD,
					instagram: result.data[0].instagram,
					twitter: result.data[0].twitter,
					ship: result.data[0].ship,
					phone: result.data[0].phone,
					email: result.data[0].email,
					privacy: result.data[0].privacy,
					address: result.data[0].address,
				})
			} catch (error) {
				console.log(error)
			}
		}
		fetchAssect()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const { message } = await assectAPI.update(assect._id, assect, token)
			alert(message)
		} catch (error) {
			console.log(error)
		}
	}

	const handleUpdateRate = async () => {
		try {
			const result = await axios.get(
				'https://free.currconv.com/api/v7/convert?q=VND_USD&compact=ultra&apiKey=ab40abe35a686c41d81c'
			)
			setAssectt((prev) => ({
				...prev,
				rateVNtoUSD: result.data.VND_USD,
			}))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="mt-10 lg:mt-0 lg:ml-56 min-h-screen">
			<form onSubmit={handleSubmit}>
				<p className="p-3 font-maven text-lg">Thông tin của cửa hàng nè</p>
				<div className="flex flex-col p-1 lg:py-3 lg:px-10 space-y-5">
					{data.map((item) => (
						<div
							key={item.name}
							className="border flex items-center overflow-hidden rounded-lg h-12"
						>
							<span className="p-3 w-24 bg-gray-100 font-maven">
								{item.title}
							</span>
							<input
								type="text"
								name={item.name}
								value={assect[item.name]}
								onChange={onChangeInput}
								className="flex-auto outline-none p-3 font-base h-full"
							/>
						</div>
					))}

					<div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2">
						<div
							title="Tỉ giá của USD so với VND"
							className="border flex items-center overflow-hidden rounded-lg h-12 "
						>
							<span className="p-3 w-24 bg-gray-100 font-maven">Tỉ giá</span>
							<input
								type="text"
								value={assect?.rateVNtoUSD}
								className="w-max outline-none p-3 font-base"
								placeholder="USD to VND"
								readOnly
							/>
						</div>
						<button
							onClick={() => handleUpdateRate()}
							className="p-3 bg-blue-400 h-full rounded-lg text-white outline-none"
						>
							Cập nhật tỉ giá
						</button>
					</div>
					<div className="border flex flex-col overflow-hidden rounded-lg p-3">
						<p className="text-gray-500 font-maven">Điều khoản và dịch vụ</p>
						<textarea
							name="privacy"
							onChange={onChangeInput}
							value={assect?.privacy}
							cols="30"
							rows="40"
							className="outline-none font-base scrollbar"
						></textarea>
					</div>
					<button className="p-3 bg-blue-400 h-full rounded-lg text-white outline-none">
						Cập nhật
					</button>
				</div>
			</form>
		</div>
	)
}

export default Asstect
